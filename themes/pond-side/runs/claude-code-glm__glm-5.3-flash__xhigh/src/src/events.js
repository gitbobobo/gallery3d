// 极简事件总线
const listeners = new Map();

export function on(type, fn) {
  if (!listeners.has(type)) listeners.set(type, new Set());
  listeners.get(type).add(fn);
  return () => listeners.get(type)?.delete(fn);
}

export function emit(type, data) {
  const s = listeners.get(type);
  if (s) for (const fn of s) fn(data);
}

export const events = { on, emit };
