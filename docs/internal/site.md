# 主站点（site/）

Astro 静态站（`output: 'static'`），把 `themes/` 下每道题的答卷收进统一界面浏览、对比、评级。部署支持子路径（`BASE_URL` 环境变量，默认 `/`）。

## 页面（IA）

- `/` 题目列表：wordmark、聚合统计、分类 seg（≥2 个分类时才渲染）、每题一个编辑块（标题/prompt/统计 + 封面 mosaic + 名口角标）。
- `/[themeId]/` 画廊页：prompt 卡（含「每份答卷都拿到同一份约束」details）、筛选行（agent/模型/强度 + 桌面|手机封面切换）、按等级分组的答卷墙、底部「数据对照」全量表。
- `/[themeId]/view/[runId]/` 单份答卷：sandbox iframe 嵌产物、桌面/手机尺寸切换（≤720px 隐藏切换钮，视口本身已是窄屏）、信息抽屉（元数据 + NOTES.md）、上/下一份导航。
- `/[themeId]/compare/` 双栏对比：两个独立 select（按等级分组），选择状态在 `?a=&b=` query 里可分享；窄屏只显示一栏 + 左/右切换，尺寸切换同样 ≤720px 隐藏。
- `/[themeId]/rank/` 仅 dev：SortableJS 拖拽评级，松手 POST `__api/rate` 写回 `ratings.json`。生产构建 `getStaticPaths` 返回 `[]`，不出页面。

## 数据契约（输入只读，改动只发生在 rank API 写 ratings.json）

```
themes/<themeId>/
  theme.json     { id?, title, category, tags, lang?, allowExternalAssets?, promptSha256?, createdAt? }
  prompt.md      原文（去掉首尾空白后展示）
  ratings.json   { tiers: [{id,label,color}], rows: { tierId: [runId, ...] } }
                 rows 数组顺序即同等级内名次；缺文件时用 DEFAULT_TIERS
  runs/<runId>/
    run.json     { harness, model, effort, status: ok|incomplete, reasons?, stats{...}, ... }
    dist/index.html   产物入口；资源必须相对路径（答卷侧契约，见 scripts 的 agents-md 模板）
    thumb.webp / thumb-mobile.webp   1440x900 / 390x844 封面（png 也容忍）
    NOTES.md     可选，展示在 view 页抽屉里
data/harnesses.json、data/models.json   id → 显示名映射（可选，缺失回退原始 id）
```

## 关键派生（site/src/data.ts）

- `modelKey`：目录名按 `__` 切三段取中段（`harness__model__effort`），否则用 `model`。筛选的"模型"维度按 modelKey 去重。
- `modelName`/`harnessName`：走 data/ 显示名映射，缺省回退原始值。
- `place`：已评级 run 的全局名次（等级序 → 行内序），1 起。
- `tierGroups`：按 tiers 顺序分组 + 尾部未评级组（tier=null）；ratings 里未知 tier id 的 run 视为未评级（防止丢卡）。
- 排序：已评级在前（tier 序 + rank），未评级按完成时间；指向不存在 run 的脏数据被剔除。
- 坏数据原则：畸形的 run/theme 静默跳过，绝不让 build 失败。

## 视觉系统（site/src/styles/global.css）

- 调色板：审卷台灰 `--bg` + 纸面 `--sheet` + 近黑 `--ink`。**颜色只出现在作品封面和等级色块**，UI 不引入第三个色相。
- 字体：`--font-display` Smiley Sans（标题/wordmark/等级字）、`--font-body` PingFang/Noto（正文）、`--font-mono` IBM Plex Mono（数据/标签）。@font-face 在 Base.astro 里写，保证走 BASE_URL。
- 签名结构 `.trow`：左栏 sticky 等级色块（`.tm`）+ 右栏内容。≤720px 时 `.trow-side` 变 `display:contents`，`.tm` 折叠成 36px 横条（等级左、计数右）。
- 组尺寸规则：`tier-sec[data-size]` —— 已评级第 1 组 `lead`（feature 卡：封面 + 元数据面板）、第 2 组 `l`、其后 `s`；未评级组有已评级时 `s`，全部未评级时 `l`（整页中等卡，无 feature）。
- 首页 `.mosaic`：lead 格跨两行 + 至多 4 小格；单封面用 `mosaic--single`；`+N` 覆盖层压住整格时不再渲染 `.mplace` 名口角标。
- 无产物/无封面：斜线底纹占位块，文案区分「没有交卷」（无 dist）和「没有封面」（有 dist 无图）。

## 行为与约束

- 筛选纯前端：卡片带 `data-harness/model/effort`，select change 即隐藏不匹配卡；组头 `.tm-count` 跟随可见卡数，无可见卡的组整行隐藏；`显示 N / M` 计数 + `aria-live`。
- 封面切换：`#gallery[data-cover]` + `img[data-desktop]/[data-mobile]` src 互换；手机封面缺失回退桌面图。
- iframe 一律 `sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"`。
- 所有站内 URL 必须走 `baseUrl()`/`workUrl()`，不要手写 `/` 开头的路径——子路径部署会断。
- works/ 目录由 `predev`/`prebuild` 跑 `site/scripts/sync-works.mjs` 从 themes/ 全量重建，不要手改 `site/public/works/`。
- rank API（`__api/rate`）是 astro.config.mjs 里的 vite middleware，只在 dev server 存在；只接受真实存在的 runId，未知 tier id 的 rows 会被清理。
- 降级与无障碍：警示用文字+粗体（`▲`、`· 未完成`）而非纯颜色；focus 可见；`prefers-reduced-motion` 关动效。
