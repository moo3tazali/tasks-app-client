type BuildUrlOptions = {
  url: string;
  params?: Record<string, string>;
  query?: Record<string, unknown>;
};

export class ApiService {
  private static readonly auth = {
    login: '/auth/login',
    register: '/auth/register',
  } as const;

  private static readonly boards = {
    boardList: '/boards/list',
    board: '/boards/:boardId',
    createBoard: '/boards',
    updateBoard: '/boards/:boardId',
    deleteBoard: '/boards/:boardId',
  } as const;

  public static readonly routes = {
    ...this.auth,
    ...this.boards,
  } as const;

  public static getUrl<K extends keyof typeof this.routes>(
    key: K,
    options?: Omit<BuildUrlOptions, 'url'>
  ): string {
    const url = this.routes[key];
    if (!options) return url;
    return this.buildUrl({ url, ...options });
  }

  private static buildUrl({
    url,
    params = {},
    query = {},
  }: BuildUrlOptions): string {
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(
        new RegExp(`:${key}\\b`, 'g'),
        encodeURIComponent(value)
      );
    }

    const queryString = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (Array.isArray(value)) {
        value.forEach((v) =>
          queryString.append(key, String(v))
        );
      } else if (value !== undefined && value !== null) {
        queryString.set(key, String(value));
      }
    }

    return queryString.toString()
      ? `${url}?${queryString}`
      : url;
  }
}
