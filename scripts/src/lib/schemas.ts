import { z } from 'zod';

export const themeSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(['web', '3d']),
  tags: z.array(z.string()),
  lang: z.string().default('zh'),
  allowExternalAssets: z.boolean().default(false),
  promptSha256: z.string(),
  createdAt: z.string(),
});
export type Theme = z.infer<typeof themeSchema>;

export const harnessSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  adapter: z.string(),
  bin: z.string(),
  notes: z.string().optional(),
});
export type Harness = z.infer<typeof harnessSchema>;

export const modelsFileSchema = z.object({
  models: z.array(
    z.object({
      id: z.string(),
      display: z.string(),
      perHarness: z.record(z.string(), z.string().nullable()),
    }),
  ),
});
export type ModelEntry = z.infer<typeof modelsFileSchema>['models'][number];

export const comboSchema = z.object({
  harness: z.string(),
  model: z.string(),
  effort: z.string(),
  modelArg: z.string().nullable(),
});
export type Combo = z.infer<typeof comboSchema>;

export const markerSchema = z.object({
  theme: z.string(),
  runId: z.string(),
  combo: comboSchema,
  promptSha256: z.string(),
  preparedAt: z.string(),
  mode: z.enum(['manual', 'headless']),
  logFile: z.string().nullable().default(null),
  launchedAt: z.string().nullable().default(null),
  finishedAt: z.string().nullable().default(null),
  exitCode: z.number().nullable().default(null),
  imported: z.boolean().default(false),
  sandboxUsed: z.boolean().optional(),
});
export type Marker = z.infer<typeof markerSchema>;

export const runSchema = z.object({
  runId: z.string(),
  theme: z.string(),
  harness: z.string(),
  model: z.string(),
  effort: z.string(),
  modelArg: z.string().nullable(),
  harnessVersion: z.string().nullable(),
  manual: z.boolean(),
  promptSha256: z.string(),
  preparedAt: z.string().nullable(),
  launchedAt: z.string().nullable(),
  finishedAt: z.string().nullable(),
  importedAt: z.string(),
  status: z.enum(['ok', 'incomplete']),
  reasons: z.array(z.string()),
  stats: z.object({
    durationMs: z.number().nullable(),
    costUsd: z.number().nullable(),
    tokensIn: z.number().nullable(),
    tokensOut: z.number().nullable(),
    consoleErrors: z.number(),
    externalDomains: z.array(z.string()),
    distBytes: z.number(),
  }),
  notes: z.boolean(),
});
export type RunJson = z.infer<typeof runSchema>;
