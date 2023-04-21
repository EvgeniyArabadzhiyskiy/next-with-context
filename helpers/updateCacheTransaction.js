export const updateCacheTransaction = (data, queryClient) => {
    
  const dataCacheTrans = queryClient
    .getQueriesData(["transactions"])
    .map(([key, data]) => data)
    .filter((data) => data !== undefined)
    .flat();
  //==================== One Page Pagination =====================================

  let page = null;
  const PAGE_LIMIT = 5;

  dataCacheTrans.reduce((acc, item) => {
    const isOlder = Date.parse(item.date) > Date.parse(data.date);

    if (isOlder) {
      acc += 1;
    }

    if (!isOlder) {
      page = Math.ceil(acc / PAGE_LIMIT);
    }
    return acc;
  }, 1);

  const dataLength = queryClient.getQueriesData(["transactions"]).length;
  let newData = data;

  if (page) {
    for (let i = page; i <= dataLength; i += 1) {
      // console.log("hello", i);
      queryClient.setQueryData(["transactions", i], (prev) => {
        const newCache = prev
          .concat(newData)
          .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
          .slice(0, -1);

        newData = prev.pop();

        return newCache;
      });
    }
  }

  //======================Infinity Scroll with Context==========================================
  // setTransactions(prev => {
  //   const newCache = prev
  //   .concat(data)
  //   .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  //   .slice(0, -1)
  //   return newCache
  // });

  //========================Infinity Scroll with Cache========================================
  // for (let i = 1; i < pageNum; i += 1) {
  //   console.log("hello", i);
  //   queryClient.setQueryData(['transactions', i], [])
  // }

  // queryClient.setQueryData(['transactions', pageNum], () => {
  //   const newCache = dataCacheTrans
  //   .concat(data)
  //   .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  //   .slice(0, -1)
  //   return newCache
  // })
};
