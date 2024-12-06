import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const unsupportedFlags = { NED: 'NL' };

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
