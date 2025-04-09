export class ConfigService {
  private static readonly envKeys = {
    baseUrl: 'VITE_API_BASE_URL',
    secretKey: 'VITE_TOKEN_SECRET',
  } as const;

  public static get(
    key: keyof typeof this.envKeys
  ): string {
    const envVar = this.envKeys[key];
    const value = import.meta.env?.[envVar] as
      | string
      | undefined;

    if (!value) {
      throw new Error(
        `Missing environment variable: ${envVar} for key '${key}'`
      );
    }

    return value;
  }
}
