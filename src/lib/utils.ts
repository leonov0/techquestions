import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCapitalizedFirstLetter(value: string) {
  return value.charAt(0).toUpperCase();
}

export function parseToStringArray(
  value: string | string[] | undefined,
  fallback?: string[],
) {
  return Array.isArray(value) ? value : value ? [value] : fallback;
}

export function parseToString(
  value: string | string[] | undefined,
  fallback?: string,
) {
  return Array.isArray(value) ? value[0] : value || fallback;
}
