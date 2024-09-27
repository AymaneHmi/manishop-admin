import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ApiToken: any = process.env.NEXT_PUBLIC_API_TOKEN;
export const API_BASE = process.env.NEXT_PUBLIC_API;