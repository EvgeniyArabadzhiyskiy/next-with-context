import { createTransaction } from "@/helpers/createTransaction";
import { updCacheInfinityTrans } from "@/helpers/updCacheInfinityTrans";
import { useMutation } from "@tanstack/react-query";

export const useCreateTransactionInfinity = (setTransactions) => {

  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
        return updCacheInfinityTrans(data, setTransactions)
    },
  });

  return mutation;
}