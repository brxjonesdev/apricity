export type Result<T> = { ok: true; data: T } | { ok: false; error: string };
export function success<T>(data: T): Result<T> {
  return {
    ok: true,
    data,
  };
}

export function failure<T>(error: string): Result<T> {
  return {
    ok: false,
    error,
  };
}
