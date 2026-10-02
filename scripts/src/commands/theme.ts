import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { themeDir } from '../lib/paths.ts';
import { ask, pick } from '../lib/ui.ts';
import { sha256File, writeJson } from '../lib/util.ts';
import { mkdirSync } from 'node:fs';
import type { Theme } from '../lib/schemas.ts';

const SLUG = /^[a-z0-9][a-z0-9._-]*$/;

export async function cmdThemeNew(args: string[]): Promise<void> {
  const { positionals, values } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      title: { type: 'string' },
      category: { type: 'string' },
      tags: { type: 'string' },
      help: { type: 'boolean', short: 'h' },
    },
  });
  if (values.help) {
    console.log('用法：pnpm g theme new <slug> [--title 标题] [--category web|3d] [--tags a,b,c]');
    return;
  }
  const slug = positionals[0];
  if (!slug || !SLUG.test(slug)) {
    throw new Error(`slug 缺失或非法（只允许小写字母数字和 . _ -）：${slug ?? '(空)'}`);
  }
  const dir = themeDir(slug);
  if (existsSync(dir)) throw new Error(`主题已存在：${dir}`);

  const title = values.title ?? (await ask('主题标题'));
  const category =
    (values.category as 'web' | '3d' | undefined) ??
    (await pick<'web' | '3d'>('分类', [
      { value: 'web', label: 'web（普通网页）' },
      { value: '3d', label: '3d（3D 场景）' },
    ]));
  if (category !== 'web' && category !== '3d') throw new Error(`category 只能是 web 或 3d：${category}`);

  const tagsRaw =
    values.tags ??
    (await ask('标签（逗号分隔，可空）', { placeholder: '机械,动画,交互' }));
  const tags = tagsRaw.split(/[,，]/).map((t) => t.trim()).filter(Boolean);

  mkdirSync(dir, { recursive: true });
  const promptPath = join(dir, 'prompt.md');
  writeFileSync(promptPath, '在这里写任务提示词。\n');
  const theme: Theme = {
    id: slug,
    title,
    category,
    tags,
    lang: 'zh',
    allowExternalAssets: false,
    promptSha256: sha256File(promptPath),
    createdAt: new Date().toISOString(),
  };
  writeJson(join(dir, 'theme.json'), theme);
  console.log(`已创建主题 ${slug}：`);
  console.log(`  ${join(dir, 'theme.json')}`);
  console.log(`  ${promptPath}  ← 编辑这个文件写任务提示词`);
}
