import Link from "next/link";
import { useRouter } from "next/router";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import { QueryClient } from "@tanstack/react-query";

export async function getServerSideProps(context) {
  const pageNum = Number(context.params.pageNum);
  const todos = await getAllTransactions(pageNum);
    
  return {
    props: { todos },
  };
}

export default function TodosPage({ todos }) {
  const queryClient = new QueryClient();
  const queryLength = queryClient.getQueriesData(["transactions"]);
  console.log("TodosPage  queryLength:", queryLength);
  
  const router = useRouter();
  const pageNum = Number(router.query.pageNum) || 1;

  const handleNextClick = () => {
    const currentPageNum = Number(pageNum);
    const nextPageNum = currentPageNum + 1;
    router.push(`/transactions/new/${nextPageNum}`);
  };

  const handlePrevClick = () => {
    const currentPageNum = Number(pageNum);
    const nextPageNum = currentPageNum - 1;
    router.push(`/transactions/new/${nextPageNum}`);
  };

  return (
    <>
      <Link href="/">HOME</Link>
      <button type="button" onClick={handleNextClick}>Next Page</button>
      <button type="button" disabled={pageNum <= 1} onClick={handlePrevClick}>Prev Page</button>

    <h1>Server Prop no Query</h1>
      <ul>
        {todos?.map((item) => {
          return (
          <div style={{display: 'flex', justifyContent: 'space-between', width: '200px'}} key={item._id}>
            <li>{item.category}</li>
          </div>)
        })}
      </ul>
    </>
  );
}