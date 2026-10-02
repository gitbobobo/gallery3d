# Gallery3D

用不同的编码 agent / 模型跑同一个网页制作任务，把成品收进画廊网站对比展示。

## 目录结构

```
themes/<themeId>/
  theme.json            {"id","title","category":"web"|"3d","tags":[],"lang":"zh","allowExternalAssets":false,"promptSha256","createdAt"}
  prompt.md             任务提示词（原文）
  runs/<runId>/         runId = "<harnessId>__<modelId>__<effort>"（清洗到 [a-z0-9._-]）
    run.json            运行元数据 + 统计 + 状态（schema 见 scripts/src/lib/schemas.ts）
    dist/               AI 交付物（原样复制，入口 dist/index.html）
    src/                AI 源码快照（排除 node_modules/.git/产物/密钥等）
    NOTES.md            agent 写的说明（有才有）
    thumb.webp          桌面截图 1440×900；thumb-mobile.webp 390×844
data/harnesses.json     harness 注册表（id、displayName、adapter、bin）
data/models.json        模型注册表 {"models":[{"id","display","perHarness":{"<harnessId>":"<modelArg>"}}]}
scripts/                @gallery3d/cli，Node 直接跑 TS（type stripping）
site/                   Astro 画廊站（另一个包）
```

## 命令

```bash
pnpm install
pnpm g theme new <slug> [--title T --category web|3d --tags a,b]   # 建主题
pnpm g run <theme> [--harness H --model M --effort E] [--manual] [--yes] [--print-argv]
pnpm g import <theme> [runId] [--workspace <路径>] [--no-probe]
pnpm g status            # 看板：进行中工作区 + 各主题运行状态
pnpm g clean [--all]     # 清理工作区（默认只清已导入的）
```

- `run` 缺参数时交互选择；`--manual` 只建工作区并把 prompt 复制到剪贴板，自己在里面跑 agent 后 `pnpm g import`。
- 默认 headless：启动 adapter argv（cwd=工作区），stdout 实时渲染同时原始流写 `<ws>/run.log`，结束后自动走导入流水线。
- `--print-argv` 只打印将执行的命令不运行（免花钱调试）。

## 工作区

`~/gallery3d-workspaces/ws-<8hex>/`，每个都 `git init` 过，含 `.gallery3d-workspace.json` marker
（theme/runId/combo/promptSha256/时间戳/exitCode/imported）+ 渲染后的 `AGENTS.md`
（claude-code-* 另写 `CLAUDE.md` = `@AGENTS.md`）。

## 导入流水线（import / run 结束后自动执行）

1. 校验 marker 的 promptSha256 与当前 prompt.md 一致（不一致拒绝）
2. `dist/` 原样复制 → `src/` 快照（排除 node_modules、.git、构建产物、run.log、AGENTS.md、NOTES.md、.env/*.pem/*.key/credentials*/*.auth 等密钥文件）
3. 扫 dist 文本文件的绝对路径引用（`src="/…"` 等）→ 记录「绝对路径」reason（信息性）
4. 内置静态服务器 + playwright-core Chromium 探测（console 错误、pageerror、外部域名），截 thumb.webp + thumb-mobile.webp（sips 转码，不行则用 Chromium canvas，再不行存 thumb.png）
5. 写 run.json：`ok` = 有 dist/index.html 且页面无 pageerror 且进程正常退出；否则 `incomplete` + reasons（没有产物/页面打不开/启动失败/提前停止）

## 交付契约（给 agent 的约定，见 scripts/src/templates/agents-md.md）

- 产物在 `dist/`，入口 `dist/index.html`，普通静态服务器可访问
- 资源一律相对路径（Vite base 设 `./`），无后端依赖，hash 路由或多 html
- dist ≤ 50MB；页面加载即显示主体（3 秒后自动截图）；适配 iframe 三种尺寸含手机触摸

## 加 harness / 模型

- harness：`data/harnesses.json` 加 `{id, displayName, adapter, bin}`，`adapter` 对应 `scripts/src/adapters/index.ts` 里的注册 key；新 adapter 实现 `scripts/src/adapters/types.ts` 的 `Adapter` 接口（plan/argv、stream 渲染、统计解析、重试策略）。
- 模型：`data/models.json` 的 `perHarness` 里加 `"<harnessId>": "<modelArg>"`；modelArg 为 null 表示该 harness 不传模型参数（如 claude-code-glm 走 settings.json）。也可以在 `run` 的模型选择里选「其他…」现场登记。

## 注意

- 不要把 ~/.claude/settings*.json（含 API key）复制进工作区或仓库。
- opencode 的模型覆盖配置由 CLI 生成在工作区之外（`~/gallery3d-workspaces/.opencode-config-<runId>.json`），经 `OPENCODE_CONFIG` 传入，不含密钥。
