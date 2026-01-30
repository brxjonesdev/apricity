import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { redirect } from 'next/navigation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type Result<T, E> = { ok: true; data: T } | { ok: false; error: E };
export function ok<T>(data: T): Result<T, never> {
  return { ok: true, data };
}

export function err<E>(error: E) {
  return { ok: false, error } as const;
}
