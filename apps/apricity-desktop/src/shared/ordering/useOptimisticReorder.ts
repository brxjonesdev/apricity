import {
  useMutation,
  useQueryClient,
  QueryKey,
} from "@tanstack/react-query";

import {
  computeOrderKey,
  Orderable,
} from "./computeOrder";

interface ReorderArgs {
  itemId: string;
  insertBeforeId?: string;
}

interface UseOptimisticReorderConfig<
  TItem extends Orderable,
  TArgs extends ReorderArgs
> {
  queryKey: (args: TArgs) => QueryKey;

  mutationFn: (
    args: TArgs & { order: string }
  ) => Promise<unknown>;

  getId: (item: TItem) => string;
}

export function useOptimisticReorder<
  TItem extends Orderable,
  TArgs extends ReorderArgs
>({
  queryKey,
  mutationFn,
  getId,
}: UseOptimisticReorderConfig<TItem, TArgs>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: TArgs) => {
      const key = queryKey(args);

      const items =
        queryClient.getQueryData<TItem[]>(key) ?? [];

      const target = args.insertBeforeId
        ? { insertBeforeId: args.insertBeforeId }
        : "end";

      const order = computeOrderKey(
        items,
        target,
        getId
      );

      return mutationFn({
        ...args,
        order,
      });
    },

    onMutate: async (args) => {
      const key = queryKey(args);

      await queryClient.cancelQueries({
        queryKey: key,
      });

      const previous =
        queryClient.getQueryData<TItem[]>(key);

      if (previous) {
        const target = args.insertBeforeId
          ? { insertBeforeId: args.insertBeforeId }
          : "end";

        const order = computeOrderKey(
          previous,
          target,
          getId
        );

        const optimistic = previous.map((item) =>
          getId(item) === args.itemId
            ? { ...item, order }
            : item
        );

        queryClient.setQueryData(
          key,
          optimistic
        );
      }

      return {
        previous,
        key,
      };
    },

    onError: (_err, _args, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          context.key,
          context.previous
        );
      }
    },

    onSettled: (_data, _err, args) => {
      queryClient.invalidateQueries({
        queryKey: queryKey(args),
      });
    },
  });
}