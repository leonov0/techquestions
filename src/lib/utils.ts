import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCapitalizedFirstLetter(value: string) {
  return value.charAt(0).toUpperCase();
}

export async function getCallbackUrl(
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
) {
  const { callbackUrl } = await searchParams;

  return Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;
}
