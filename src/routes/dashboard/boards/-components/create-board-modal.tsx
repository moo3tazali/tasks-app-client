import { useState } from 'react';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalTrigger,
  ResponsiveModalTitle,
  ResponsiveModalHeader,
  ResponsiveModalDescription,
} from '@/components/ui';
import { useCreateBoard } from '../-hooks/use-create-board';

export const CreatBoardModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const { form } = useCreateBoard({
    closeModal: () => setOpen(false),
  });

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }

        setOpen(open);
      }}
    >
      <ResponsiveModalTrigger asChild>
        {children}
      </ResponsiveModalTrigger>

      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            Create a new Board
          </ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Start a new board and invite your team.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Form {...form}>
          <form
            onSubmit={form.onSubmit}
            className='space-y-5 max-w-3xl mt-5'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='My Board'
                      type='text'
                      disabled={form.isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='This is a description of my board'
                      className='resize-none'
                      disabled={form.isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full flex max-w-sm mx-auto font-bold'
              disabled={form.isPending}
            >
              Create
            </Button>
          </form>
        </Form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
