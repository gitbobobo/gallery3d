import { createHash, randomBytes } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export function readJson<T = unknown>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

export function writeJson(path: string, value: unknown): void {
  mkdirSync(join(path, '..'), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

export function sha256File(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

export function newWorkspaceId(): string {
  return `ws-${randomBytes(4).toString('hex')}`;
}

/** runId = "<harnessId>__<modelId>__<effort>"，清洗到 [a-z0-9._-] */
export function sanitizeRunId(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '');
}

export function isSecretish(name: string): boolean {
  return (
    name === '.env' ||
    name.startsWith('.env.') ||
    name.endsWith('.pem') ||
    name.endsWith('.key') ||
    name.startsWith('credentials') ||
    name.endsWith('.auth')
  );
}

const SRC_EXCLUDE_DIRS = new Set([
  'node_modules', '.git', 'dist', 'dist-ssr', 'build', 'out', 'coverage',
  '.next', '.nuxt', '.turbo', '.cache', '.parcel-cache', '.vite', '.pnpm-store',
  '.playwright-mcp', 'playwright-report', 'test-results',
]);
const SRC_EXCLUDE_FILES = new Set([
  'run.log', 'transcript.json', '.last-message.txt',
  '.gallery3d-workspace.json', '.gallery3d-harness-version', 'NOTES.md', 'AGENTS.md', 'CLAUDE.md', '.DS_Store',
]);
// 工作区根目录下的媒体/日志文件视为运行中间产物（验证截图、录屏、dump），
// 不进源码快照。子目录（public/、src/assets/ 等）里的同名类型照常保留。
const ROOT_ARTIFACT_RE = /\.(png|jpe?g|gif|webp|avif|bmp|tiff?|mp4|mov|webm|m4v|mp3|wav|ogg|flac|pdf|zip|tgz|tar|gz|7z|log)$/i;

/** 复制工作区源码快照；返回被跳过的疑似密钥文件相对路径 */
export function copySourceSnapshot(srcRoot: string, destRoot: string): string[] {
  const skippedSecrets: string[] = [];
  mkdirSync(destRoot, { recursive: true });
  cpSync(srcRoot, destRoot, {
    recursive: true,
    verbatimSymlinks: true,
    filter: (src) => {
      const rel = src === srcRoot ? '' : src.slice(srcRoot.length + 1);
      if (!rel) return true;
      const name = rel.split('/').pop()!;
      const parts = rel.split('/');
      // 任何层级命中的排除目录都跳过
      if (parts.some((p) => SRC_EXCLUDE_DIRS.has(p))) return false;
      if (SRC_EXCLUDE_FILES.has(name)) return false;
      if (parts.length === 1 && ROOT_ARTIFACT_RE.test(name)) return false;
      if (isSecretish(name)) {
        skippedSecrets.push(rel);
        return false;
      }
      return true;
    },
  });
  return skippedSecrets;
}

export function copyDir(src: string, dest: string): void {
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true, verbatimSymlinks: true });
}

export function dirSizeBytes(dir: string): number {
  if (!existsSync(dir)) return 0;
  let total = 0;
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop()!;
    for (const e of readdirSync(cur, { withFileTypes: true })) {
      const p = join(cur, e.name);
      try {
        if (e.isDirectory()) stack.push(p);
        else if (e.isFile()) total += statSync(p).size;
      } catch { /* 忽略坏符号链接 */ }
    }
  }
  return total;
}

const TEXT_EXT = new Set([
  '.html', '.htm', '.js', '.mjs', '.cjs', '.css', '.json', '.svg', '.xml',
  '.txt', '.md', '.map', '.webmanifest', '.ts', '.tsx', '.jsx',
]);

export function* walkFiles(dir: string): Generator<string> {
  if (!existsSync(dir)) return;
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop()!;
    for (const e of readdirSync(cur, { withFileTypes: true })) {
      const p = join(cur, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile()) yield p;
    }
  }
}

export function isTextFile(path: string): boolean {
  const ext = path.slice(path.lastIndexOf('.')).toLowerCase();
  return TEXT_EXT.has(ext);
}

export function fmtBytes(n: number): string {
  if (n >= 1 << 20) return `${(n / (1 << 20)).toFixed(1)}MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${n}B`;
}
