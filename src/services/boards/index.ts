import { queryOptions } from '@tanstack/react-query';

import type { TBoard } from '@/interfaces/board';
import type { TFilter } from '@/interfaces/filter';
import type { PaginationRes } from '@/interfaces/api-res';
import { AxiosService, ApiService } from '@/services';

export class BoardService {
  public static readonly queryKey = 'boards';

  public static async create(data: {
    title: string;
    description: string;
  }): Promise<TBoard> {
    const url = ApiService.getUrl('createBoard');
    return AxiosService.authPost(url, data);
  }

  public static async list(
    filters?: TFilter
  ): Promise<PaginationRes<TBoard>> {
    const url = ApiService.getUrl('boardList', {
      query: filters,
    });
    return AxiosService.authGet(url);
  }

  public static async get(
    boardId: string
  ): Promise<TBoard> {
    const url = ApiService.getUrl('board', {
      params: { boardId },
    });
    return AxiosService.authGet(url);
  }

  public static async update(
    boardId: string,
    data: {
      title?: string;
      description?: string;
    }
  ): Promise<TBoard> {
    const url = ApiService.getUrl('updateBoard', {
      params: { boardId },
    });
    return AxiosService.authPatch(url, data);
  }

  public static async delete(
    boardId: string
  ): Promise<void> {
    const url = ApiService.getUrl('deleteBoard', {
      params: { boardId },
    });

    await AxiosService.authDelete(url);
  }

  public static listQueryOptions(filters?: TFilter) {
    return queryOptions({
      queryKey: [this.queryKey, filters ?? {}],
      queryFn: () => this.list(filters),
    });
  }

  public static queryOptions(boardId: string) {
    return queryOptions({
      queryKey: [this.queryKey, { boardId }],
      queryFn: () => this.get(boardId),
    });
  }
}
