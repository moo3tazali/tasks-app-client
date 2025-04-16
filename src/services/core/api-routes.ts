export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  BOARDS: {
    LIST: '/boards/list',
    ONE: '/boards/:boardId',
    CREATE: '/boards',
    UPDATE: '/boards/:boardId',
    DELETE: '/boards/:boardId',
  },
} as const;

type ApiRoutesValues = FlattenRoutes<typeof API_ROUTES>;

export interface BuildUrlOptions {
  url: ApiRoutesValues;
  params?: Record<string, string>;
  query?: Record<string, QueryValue>;
}

export class ApiRoutes {
  private static _instance: ApiRoutes;

  private constructor() {}

  // singleton pattern
  public static getInstance(): ApiRoutes {
    if (!ApiRoutes._instance) {
      ApiRoutes._instance = new ApiRoutes();
    }
    return ApiRoutes._instance;
  }

  public build(
    url: ApiRoutesValues,
    options?: Omit<BuildUrlOptions, 'url'>
  ): string {
    if (!options) return url;

    if (!options?.params && !options?.query) return url;

    return this._buildUrl({ ...options, url });
  }

  private _buildUrl({
    url,
    params = {},
    query = {},
  }: BuildUrlOptions): string {
    let updatedUrl = url as string;

    for (const [key, value] of Object.entries(params)) {
      updatedUrl = updatedUrl.replace(
        new RegExp(`:${key}\\b`, 'g'),
        encodeURIComponent(value)
      );
    }

    const queryString = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (Array.isArray(value)) {
        value.forEach((v) => queryString.append(key, String(v)));
      } else if (value !== undefined && value !== null) {
        queryString.set(key, String(value));
      }
    }

    return queryString.toString()
      ? `${updatedUrl}?${queryString}`
      : updatedUrl;
  }
}

type QueryValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[];

type FlattenRoutes<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends string
        ? T[K]
        : FlattenRoutes<T[K]>;
    }[keyof T]
  : never;
