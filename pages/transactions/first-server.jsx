import { getAllTransactions } from "@/helpers/getAllTransactions";
import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

//=======Только первая страница загружается на сервере ==========

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["transactions", 1], () =>
    getAllTransactions(1)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

export default function TodosPage() {
  const queryClient = useQueryClient();
  const [pageNum, setPageNum] = useState(1);

  const { data } = useQuery({
    queryKey: ["transactions", pageNum],
    queryFn: () => getAllTransactions(pageNum),

    keepPreviousData: true,
    staleTime: Infinity,
  });

  const queryLength = queryClient.getQueriesData(["transactions"]);
  console.log("TodosPage  queryLength:", queryLength);

  const handleNextClick = () => {
    setPageNum((p) => p + 1);
  };

  const handlePrevClick = () => {
    setPageNum((p) => p - 1);
  };

  return (
    <>
      <Link href="/">HOME</Link>
      <button type="button" onClick={handleNextClick}>Next Page</button>
      <button type="button" disabled={pageNum <= 1} onClick={handlePrevClick}>Prev Page</button>

      <h1>First Page Server Render</h1>
      <ul>
        {data?.map((item) => {
          return (
          <div style={{display: 'flex', justifyContent: 'space-between', width: '200px'}} key={item._id}>
            <li>{item.category}</li>
          </div>)
        })}
      </ul>
    </>
  );
}
