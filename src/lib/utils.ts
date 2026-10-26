import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatIDR(amountInMillions: number): string {
  return `Rp ${amountInMillions.toLocaleString("id-ID")} Jt`;
}

export function formatNumberID(num: number): string {
  return num.toLocaleString("id-ID");
}
