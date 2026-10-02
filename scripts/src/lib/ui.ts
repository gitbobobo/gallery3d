import { cancel, confirm, isCancel, select, text } from '@clack/prompts';
import type { Option } from '@clack/prompts';

export function ensureTty(what: string): void {
  if (!process.stdin.isTTY) {
    throw new Error(`缺少参数且当前不是交互终端，无法选择${what}；请用命令行参数指定`);
  }
}

function bail(): never {
  cancel('已取消');
  process.exit(1);
}

export async function pick<T extends string>(message: string, options: { value: T; label: string; hint?: string }[]): Promise<T> {
  ensureTty(message);
  const r = await select({ message, options: options as Option<T>[] });
  if (isCancel(r)) bail();
  return r as T;
}

export async function ask(message: string, opts: { placeholder?: string; validate?: (v: string) => string | undefined } = {}): Promise<string> {
  ensureTty(message);
  const r = await text({
    message,
    placeholder: opts.placeholder,
    validate: opts.validate ? (v) => opts.validate!(String(v ?? '')) : undefined,
  });
  if (isCancel(r)) bail();
  return String(r);
}

export async function yesNo(message: string, initialValue = false): Promise<boolean> {
  ensureTty(message);
  const r = await confirm({ message, initialValue });
  if (isCancel(r)) bail();
  return Boolean(r);
}
