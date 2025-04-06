import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type BuildUrlOptions = {
  url: string;
  params?: Record<string, string>;
  query?: Record<string, unknown>;
};

export function buildUrl({
  url,
  params = {},
  query = {},
}: BuildUrlOptions): string {
  // Replace path params like :id
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(
      new RegExp(`:${key}\\b`, 'g'),
      encodeURIComponent(value)
    );
  }

  // Handle query string
  const queryString = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      value.forEach((v) => queryString.append(key, String(v)));
    } else {
      queryString.set(key, String(value));
    }
  }

  return queryString.toString() ? `${url}?${queryString}` : url;
}
