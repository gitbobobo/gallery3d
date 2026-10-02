// The shared AGENTS.md constraint text shown in the 约束 <details> block.
// The canonical template is authored by the CLI in scripts/src/templates/.
// Imported via vite ?raw glob so a missing file degrades gracefully instead
// of failing the build.

const mods = import.meta.glob('../../scripts/src/templates/agents-md.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const FALLBACK = `各答卷在构建时共享同一份 AGENTS.md 约束模板：产出可静态部署的页面、默认不请求外部资源、自包含运行。
（约束模板 scripts/src/templates/agents-md.md 尚未生成，此处为占位说明。）`;

export const AGENTS_MD: string =
  (Object.values(mods)[0] as string | undefined)?.trim() || FALLBACK;
