// ratings.ts — ratings.json 的统一清洗规则，读路径（data.ts）与写路径
// （astro.config.mjs 的 rate API）共用。纯函数模块：不能 import node 内置
// 模块或依赖 vite/import.meta 专有 API（astro.config.mjs 由 esbuild 打包）。

export interface Tier {
  id: string;
  label: string;
  color: string;
}

/** themes/<id>/ratings.json — rows 的数组顺序就是同等级内的名次 */
export interface Ratings {
  tiers: Tier[];
  rows: Record<string, string[]>;
}

/** 默认等级表（ratings.json 无有效等级声明时使用），meme 式自上而下 */
export const DEFAULT_TIERS: Tier[] = [
  { id: 'agi', label: 'AGI', color: '#e4554f' },
  { id: 's-plus', label: 'S+', color: '#f0a03c' },
  { id: 's', label: 'S', color: '#efe04b' },
  { id: 'a', label: 'A', color: '#f3ead3' },
  { id: 'b', label: 'B', color: '#e4e0d4' },
  { id: 'c', label: 'C', color: '#d9dde3' },
];

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null;

const str = (v: unknown): string | undefined =>
  typeof v === 'string' && v.length > 0 ? v : undefined;

/**
 * 规范化 {tiers, rows}：
 * - tiers：只留 id/label 非空 string 的条目，保持声明顺序，id 重复以首次
 *   出现为准，color 缺省回退 '#d9dde3'；没有任何有效等级回退 DEFAULT_TIERS。
 * - rows：key 恰好是已声明等级（按声明序）；行内只留 validRunIds 里的
 *   string。同一 runId 全局只保留首次有效出现——按等级声明序遍历、行内
 *   按数组序。未知等级 key 被丢弃，其中的 runId 不占用答卷（回到未评级池）。
 * 幂等（normalize(normalize(x)) 深等于 normalize(x)），不修改入参。
 */
export const normalizeRatings = (
  raw: unknown,
  validRunIds: ReadonlySet<string>,
): Ratings => {
  const tiers: Tier[] = [];
  const seen = new Set<string>();
  if (isObj(raw) && Array.isArray(raw.tiers)) {
    for (const t of raw.tiers) {
      if (!isObj(t)) continue;
      const id = str(t.id);
      const label = str(t.label);
      if (!id || !label || seen.has(id)) continue;
      seen.add(id);
      tiers.push({ id, label, color: str(t.color) ?? '#d9dde3' });
    }
  }
  // 回退时逐条复制：返回值不共享 DEFAULT_TIERS 的可变引用
  const declared = tiers.length ? tiers : DEFAULT_TIERS.map((t) => ({ ...t }));

  const src = isObj(raw) && isObj(raw.rows) ? raw.rows : {};
  const claimed = new Set<string>();
  // 无原型字典：tier id 允许任意非空字符串（含 '__proto__'），
  // 普通对象在 '__proto__' 上赋值会改原型，行会丢且读回时重复计票
  const rows: Record<string, string[]> = Object.create(null);
  for (const t of declared) {
    const v = src[t.id];
    const clean: string[] = [];
    if (Array.isArray(v)) {
      for (const id of v) {
        if (typeof id !== 'string' || !validRunIds.has(id) || claimed.has(id))
          continue;
        claimed.add(id);
        clean.push(id);
      }
    }
    rows[t.id] = clean;
  }
  return { tiers: declared, rows };
};
