export const getCurrentTransactions = (page, transactions) => {
  const PAGE_LIMIT = 5;
  const endIdx = PAGE_LIMIT * page;
  const startIdx = endIdx - PAGE_LIMIT;

  return transactions.slice(startIdx, endIdx);
};
