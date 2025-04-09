import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { ColumnDef, DataTable } from '@/components';
import { TBoard } from '@/interfaces/board';
import { CreatBoardModal } from './-components/create-board-modal';
import { Button } from '@/components/ui';
import { useServices } from '@/hooks';

export const Route = createFileRoute('/dashboard/boards/')({
  component: Boards,
});

function Boards() {
  return (
    <div className='space-y-5'>
      <CreatBoardModal>
        <Button
          className='flex ms-auto font-bold'
          size='lg'
        >
          Create Board
        </Button>
      </CreatBoardModal>

      <BoardList />
    </div>
  );
}

const columns: ColumnDef<TBoard>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const value = row.getValue('createdAt') as string;
      return new Date(value).toLocaleString();
    },
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
];

const BoardList = () => {
  const { boardService } = useServices();

  const { data, isPending, error } = useQuery(
    boardService.listQueryOptions()
  );

  return (
    <DataTable
      data={data?.items || []}
      columns={columns}
      isPending={isPending}
      error={error}
    />
  );
};
