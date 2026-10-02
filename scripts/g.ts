#!/usr/bin/env node
import { cmdClean } from './src/commands/clean.ts';
import { cmdImport } from './src/commands/import.ts';
import { cmdRun } from './src/commands/run.ts';
import { cmdStatus } from './src/commands/status.ts';
import { cmdThemeNew } from './src/commands/theme.ts';

const HELP = `gallery3d 测试台 CLI

用法：pnpm g <命令> [参数]

命令：
  theme new <slug>        新建主题（写 theme.json + prompt.md 骨架）
  run <theme>             跑一次：选 harness/模型/effort → 建工作区 → 启动 agent → 自动导入
  import <theme> [runId]  把工作区产物导入 themes/<theme>/runs/<runId>/
  clean [--all]           清理工作区（默认只清已导入的）
  status                  查看进行中的工作区和各主题运行状态

run 的常用参数：
  --harness H --model M --effort E --manual --yes --print-argv
`;

async function main(): Promise<void> {
  const [cmd, sub, ...rest] = process.argv.slice(2);
  try {
    if (cmd === 'theme' && sub === 'new') return await cmdThemeNew(rest);
    if (cmd === 'theme') return console.log('用法：pnpm g theme new <slug>');
    if (cmd === 'run') return await cmdRun([sub, ...rest].filter((x): x is string => x != null));
    if (cmd === 'import') return await cmdImport([sub, ...rest].filter((x): x is string => x != null));
    if (cmd === 'clean') return await cmdClean([sub, ...rest].filter((x): x is string => x != null));
    if (cmd === 'status') return await cmdStatus();
    console.log(HELP);
  } catch (e) {
    console.error(`\n\x1b[31m错误：${e instanceof Error ? e.message : String(e)}\x1b[0m`);
    process.exitCode = 1;
  }
}

await main();
