import axios, { AxiosError } from 'axios';

import { ErrorRes } from '@/interfaces/api-res';

const baseURL =
  (import.meta.env.VITE_API_BASE_URL as string) ?? '';

const publicApi = axios.create({
  baseURL,
});

const handle = async <T>(
  fn: () => Promise<{ data: T }>
): Promise<T> => {
  try {
    return (await fn()).data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw error.response.data as ErrorRes;
      }

      if (error.request) {
        throw {
          status: {
            code: 0,
            message:
              'Network Error: Unable to connect to the server.',
            error: true,
            validationsErrors: null,
          },
          data: null,
        } as ErrorRes;
      }

      throw {
        status: {
          code: 0,
          message: `Request Error: ${error.message}`,
          error: true,
          validationsErrors: null,
        },
        data: null,
      } as ErrorRes;
    }

    throw {
      status: {
        code: 0,
        message: `Unexpected Error: ${
          error instanceof Error
            ? error.message
            : 'Unknown error occurred'
        }`,
        error: true,
        validationsErrors: null,
      },
      data: null,
    } as ErrorRes;
  }
};

export { publicApi, handle };
