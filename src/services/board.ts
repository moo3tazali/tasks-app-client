import { queryOptions } from '@tanstack/react-query';

import type {
  TBoard,
  TFilter,
  PaginationRes,
} from '@/interfaces';
import { Sync } from './core/sync';
import { API_ROUTES } from './core/api-routes';

interface BoardData {
  title: string;
  description: string;
}

const syncService = Sync.getInstance();

export class Board {
  private static _instance: Board;
  public readonly queryKey = 'boards';

  private constructor() {}

  public static getInstance(): Board {
    if (!this._instance) {
      this._instance = new Board();
    }

    return this._instance;
  }

  public async create(data: BoardData): Promise<TBoard> {
    return syncService.save(API_ROUTES.BOARDS.CREATE, data);
  }

  public async list(
    filters?: TFilter
  ): Promise<PaginationRes<TBoard>> {
    return syncService.fetch(API_ROUTES.BOARDS.LIST, {
      query: filters,
    });
  }

  public async get(boardId: string): Promise<TBoard> {
    return syncService.fetch(API_ROUTES.BOARDS.ONE, {
      params: { boardId },
    });
  }

  public async update(
    boardId: string,
    data: Partial<BoardData>
  ): Promise<TBoard> {
    return syncService.save(API_ROUTES.BOARDS.UPDATE, data, {
      params: { boardId },
      saveMethod: 'patch',
    });
  }

  public async delete(boardId: string): Promise<void> {
    return syncService.del(API_ROUTES.BOARDS.UPDATE, {
      params: { boardId },
    });
  }

  public listQueryOptions(filters?: TFilter) {
    return queryOptions({
      queryKey: [this.queryKey, filters ?? {}],
      queryFn: () => this.list(filters),
    });
  }

  public oneQueryOptions(boardId: string) {
    return queryOptions({
      queryKey: [this.queryKey, { boardId }],
      queryFn: () => this.get(boardId),
    });
  }
}
