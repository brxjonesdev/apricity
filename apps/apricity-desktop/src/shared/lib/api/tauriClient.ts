import { invoke } from '@tauri-apps/api/core';
import { Result } from '../../types';

export async function call<T>(
  command: string,
  args?: Record<string, unknown>,
): Promise<Result<T>> {
  try {
    const data = await invoke<T>(command, args);
    return { ok: true, data };
  } catch (e: any) {
    return {
      ok: false,
      error: e?.message ?? 'Unknown error',
    };
  }
}
