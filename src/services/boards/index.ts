import { buildUrl } from '@/lib/utils';
import { authApi, handle } from '@/lib/axios';
import type { TBoard } from '@/interfaces/board';
import type { TFilter } from '@/interfaces/filter';
import type {
  PaginationRes,
  SuccessRes,
} from '@/interfaces/api-res';
import { queryOptions } from '@tanstack/react-query';

export class Board {
  private static readonly id = ':boardId';
  public static readonly queryKey = 'boards';
  public static readonly listUrl = '/boards/list';
  public static readonly boardUrl = `/boards/${Board.id}`;
  public static readonly createUrl = '/boards';
  public static readonly updateUrl = `/boards/${Board.id}`;
  public static readonly deleteUrl = `/boards/${Board.id}`;

  public static async create(data: {
    title: string;
    description: string;
  }): Promise<SuccessRes<TBoard>> {
    return handle(() =>
      authApi.post(Board.createUrl, data)
    );
  }

  public static async list(
    filters?: TFilter
  ): Promise<PaginationRes<TBoard>> {
    const url = buildUrl({
      url: Board.listUrl,
      query: filters,
    });

    return handle(() => authApi.get(url));
  }

  public static async get(
    boardId: string
  ): Promise<SuccessRes<TBoard>> {
    const url = buildUrl({
      url: Board.boardUrl,
      params: { boardId },
    });

    return handle(() => authApi.get(url));
  }

  public static async update(
    boardId: string,
    data: {
      title?: string;
      description?: string;
    }
  ): Promise<SuccessRes<TBoard>> {
    const url = buildUrl({
      url: Board.updateUrl,
      params: { boardId },
    });

    return handle(() => authApi.patch(url, data));
  }

  public static async delete(
    boardId: string
  ): Promise<SuccessRes<TBoard>> {
    const url = buildUrl({
      url: Board.deleteUrl,
      params: { boardId },
    });

    return handle(() => authApi.delete(url));
  }

  public static listQueryOptions(filters?: TFilter) {
    return queryOptions({
      queryKey: [Board.queryKey, filters ?? {}],
      queryFn: () => Board.list(filters),
    });
  }

  public static queryOptions(boardId: string) {
    return queryOptions({
      queryKey: [Board.queryKey, { boardId }],
      queryFn: () => Board.get(boardId),
    });
  }
}
