export const updCacheInfinityTrans = (data, setTransactions) => {
  setTransactions((prev) => {
    const newCache = prev
      .concat(data)
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .slice(0, -1);

    return newCache;
  });
};
