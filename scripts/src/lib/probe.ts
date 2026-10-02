import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright-core';
import type { Browser } from 'playwright-core';
import { serveDir } from './staticServer.ts';

export interface ProbeResult {
  /** 页面是否成功加载（无 pageerror、goto 成功） */
  loaded: boolean;
  pageErrors: string[];
  consoleErrors: number;
  externalDomains: string[];
  shots: { desktop?: string; mobile?: string };
  /** 截图是否退化成了 png（sips webp 不可用时） */
  thumbFormat: 'webp' | 'png';
  errors: string[];
}

function isLocalHost(host: string): boolean {
  return host === 'localhost' || host === '127.0.0.1' || host === '::1' || host.endsWith('.localhost');
}

/** png buffer 写临时文件后用 sips 转 webp；失败返回 false */
function pngToWebpSips(png: Buffer, outPath: string): boolean {
  const tmp = join(tmpdir(), `gallery3d-shot-${process.pid}-${Math.random().toString(36).slice(2)}.png`);
  try {
    writeFileSync(tmp, png);
    execFileSync('sips', ['-s', 'format', 'webp', tmp, '--out', outPath], { stdio: 'pipe' });
    return existsSync(outPath);
  } catch {
    return false;
  } finally {
    try { execFileSync('rm', ['-f', tmp]); } catch { /* ignore */ }
  }
}

/** sips 不认 webp 时，用 Chromium 的 canvas.toDataURL('image/webp') 转码 */
async function pngToWebpBrowser(browser: Browser, png: Buffer, outPath: string): Promise<boolean> {
  const page = await browser.newPage();
  try {
    const dataUrl = await page.evaluate(async (b64) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d')!.drawImage(img, 0, 0);
      return canvas.toDataURL('image/webp', 0.85);
    }, png.toString('base64'));
    if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/webp')) return false;
    writeFileSync(outPath, Buffer.from(dataUrl.slice('data:image/webp;base64,'.length), 'base64'));
    return true;
  } catch {
    return false;
  } finally {
    await page.close().catch(() => {});
  }
}

/** 依次尝试 sips → chromium canvas；都失败返回 false 让调用方存 png */
async function pngToWebp(browser: Browser, png: Buffer, outPath: string): Promise<boolean> {
  if (pngToWebpSips(png, outPath)) return true;
  return pngToWebpBrowser(browser, png, outPath);
}

async function shotAt(browser: Browser, url: string, width: number, height: number) {
  const page = await browser.newPage({ viewport: { width, height } });
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const externalHosts = new Set<string>();
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => { pageErrors.push(String(err)); });
  page.on('request', (req) => {
    try {
      const host = new URL(req.url()).hostname;
      if (host && !isLocalHost(host)) externalHosts.add(host);
    } catch { /* ignore */ }
  });
  let loaded = true;
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 30_000 });
  } catch (e) {
    loaded = false;
    pageErrors.push(`goto 失败: ${String(e).slice(0, 300)}`);
  }
  await page.waitForTimeout(3000);
  let png: Buffer | null = null;
  try {
    png = await page.screenshot({ type: 'png' });
  } catch {
    // 首截失败：再等 5s 重试一次
    await page.waitForTimeout(5000);
    try {
      png = await page.screenshot({ type: 'png' });
    } catch (e2) {
      pageErrors.push(`截图失败: ${String(e2).slice(0, 200)}`);
    }
  }
  await page.close();
  return { loaded, consoleErrors, pageErrors, externalHosts, png };
}

/** 起静态服务 + chromium 探测 + 双尺寸截图；dist/index.html 不存在时调用方自己跳过 */
export async function probeDist(distDir: string, outDir: string): Promise<ProbeResult> {
  const server = await serveDir(distDir);
  const result: ProbeResult = {
    loaded: true, pageErrors: [], consoleErrors: 0, externalDomains: [],
    shots: {}, thumbFormat: 'webp', errors: [],
  };
  let browser: Browser | null = null;
  try {
    browser = await chromium.launch({ headless: true });
    const desktop = await shotAt(browser, server.url, 1440, 900);
    const mobile = await shotAt(browser, server.url, 390, 844);

    result.loaded = desktop.loaded && desktop.pageErrors.length === 0;
    result.pageErrors = [...desktop.pageErrors, ...mobile.pageErrors];
    result.consoleErrors = desktop.consoleErrors.length + mobile.consoleErrors.length;
    result.externalDomains = [...new Set([...desktop.externalHosts, ...mobile.externalHosts])].sort();

    mkdirSync(outDir, { recursive: true });
    if (desktop.png) {
      const webp = join(outDir, 'thumb.webp');
      if (await pngToWebp(browser, desktop.png, webp)) {
        result.shots.desktop = webp;
      } else {
        const pngPath = join(outDir, 'thumb.png');
        writeFileSync(pngPath, desktop.png);
        result.shots.desktop = pngPath;
        result.thumbFormat = 'png';
        result.errors.push('sips webp 转换失败，桌面截图保存为 thumb.png');
      }
    }
    if (mobile.png) {
      const webp = join(outDir, 'thumb-mobile.webp');
      if (await pngToWebp(browser, mobile.png, webp)) {
        result.shots.mobile = webp;
      } else {
        const pngPath = join(outDir, 'thumb-mobile.png');
        writeFileSync(pngPath, mobile.png);
        result.shots.mobile = pngPath;
        result.thumbFormat = 'png';
        result.errors.push('sips webp 转换失败，手机截图保存为 thumb-mobile.png');
      }
    }
  } finally {
    await browser?.close().catch(() => {});
    await server.close();
  }
  return result;
}
