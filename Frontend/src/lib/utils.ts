import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toLocalDateOnly = (date?: Date | string): string => {
  if (!(date instanceof Date)){
     date = new Date(date!)
  }
  if (!(date instanceof Date) || isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN');
};