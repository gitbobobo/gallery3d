# 评测 CLI（scripts/）

`@gallery3d/cli`，命令入口 `pnpm g`。为每道题（`themes/<themeId>/`）准备评测工作区（`~/gallery3d-workspaces/`）、启动编码 agent、把产物导入 `themes/<themeId>/runs/<runId>/` 供 site/ 展示。

## harness 契约（data/harnesses.json）

每条 harness 是 `{ id, displayName, adapter, bin, notes? }`。**`id` 和 `adapter` 是两个独立字段，允许不同名**：

- `id` 是用户可见标识。它会被写进工作区 marker 的 `combo.harness`、`runId`（`<harnessId>__<modelId>__<effort>`）、`run.json` 的 `harness` 字段，以及 `data/models.json` 里 `perHarness` 的键。
- `adapter` 是 `scripts/src/adapters/index.ts` registry 的键，决定用哪套 argv 构造/日志解析/统计提取逻辑。多个 harness 可以共用一个 adapter（如换账号的同一 CLI）。

解析一律两跳：`adapterForHarness(id)`（`lib/registry.ts`）= `getAdapter(getHarness(id).adapter)`。`run`（启动前）和 `import`（按 marker 回放）都走这一个函数，不要绕过它拿 `marker.combo.harness` 直接当 adapter 键。

## 工作区与 marker

`prepareWorkspace` 在 `~/gallery3d-workspaces/<随机 id>/` 建工作区：git init、写 AGENTS.md（`templates/agents-md.md` 渲染，禁外部素材条款按 `allowExternalAssets` 裁剪）、复制 `reference/`、写 adapter 的 `extraFiles`，最后落 `.gallery3d-workspace.json` marker（schema 见 `lib/schemas.ts`）。marker 记录 theme/runId/combo/promptSha256/时间戳/exitCode/imported，是 `import` 回放的事实来源。

`import` 会校验 marker.promptSha256 等于当前 `prompt.md` 的 sha，不一致拒绝导入（换题防混淆）。runId 相同则覆盖整个 run 目录后重写。

回放数据以 marker 为准，但 adapter 解析用的是**当前** `harnesses.json`：marker 里的 harness 已从配置删除时导入报「未知 harness」；改某条的 `adapter` 字段也会改变之后导入使用的 adapter。解析发生在覆盖旧 run 目录之前，配置错误不会毁掉已有结果。

## adapter 接口（adapters/types.ts）

`plan(ctx)` 给出按序尝试的 argv（`shouldRetry`/`retryMarkerPatch` 控制降级重试），**每次运行只调一次**——plan 可能有工作区外副作用（如 opencode 写 OPENCODE_CONFIG），`run` 命令生成 attempts 后传给 `runAdapter(ctx, adapter, attempts)` 执行，`--print-argv` 干跑也只调这一次。`recordModel(model, modelArg)` 决定写进 run.json 的 model；`renderLine` 把 stdout 流渲染到终端；`deriveEffort`/`effortOptions`/`defaultEffort` 驱动交互选择；`extraFiles` 往工作区写补充说明文件。

统计收集收口在 `collectRunStats(adapter, ws, logFile)`（`lib/runner.ts`）：日志存在且非空才调 `extractStats`（读取/解析失败降级 `{}`），再把 `postRunStats?.(ws)` 的结果展开覆盖同名键。一次运行只收集一次：`runAdapter` 收尾时调用，自动导入经 `runImport` 的 `collectedStats` 选项复用该结果（显式 `{}` 也原样采用，不再重收集）；手动 `pnpm g import` 不传 `collectedStats`，导入时按需用同一函数收集。`run` 在 agent 启动失败的兜底分支也走 `collectRunStats`，能捞到失败 attempt 留下的部分统计。

run.json 现在同时记录 `modelId`：直接取自 `marker.combo.model`（models.json 的模型 id，未登记时是原始 modelArg），不经过 adapter 换算，也不被 runId 清洗改变（runId 目录名里的同名字段是 `sanitizeRunId` 清洗后的不可逆形式）。

## 各 harness 的外部约定

- `claude-code-minimax`：argv 追加 `--settings ~/.claude/settings.minimax.json`（按当前用户主目录解析，需在每台机器上自备该文件）；`claude-code-glm` 走默认 `~/.claude/settings.json`，不传 `--model`。
- `codex`：沙箱 writable_roots 放行 `~/Library/pnpm/store/v10` 与 `~/.npm`。
- `opencode`：往工作区外生成配置，用 `OPENCODE_CONFIG` 指过去。
- `devin`：不带沙箱（autonomous 模式会拒写文件工具）。
