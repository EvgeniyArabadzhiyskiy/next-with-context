import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "@/helpers/createTransaction";
import { updateCacheTransaction } from "@/helpers/updateCacheTransaction";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
        return updateCacheTransaction(data, queryClient)
    },
  });

  return mutation;
};
