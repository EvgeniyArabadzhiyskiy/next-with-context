import { getAllTransactions } from "@/helpers/getAllTransactions";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

//=========== getStaticPaths with getStaticProps ====================

export async function getStaticPaths ()  {
  console.log("HELLO get Static Paths");
  const allPagesNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return {
    paths: allPagesNum.map((p) => `/transactions/${p}`),
    fallback: false,
  }
}

export async function getStaticProps(context) {
    console.log("Static Props");
    const pageNum = context.params.pageNum;
    const todos = await getAllTransactions(pageNum);
    
    return {
      props: { todos },
    };
  }
  
  
  export default function TodosPage({ todos }) {
    const router = useRouter();
    const pageNum = router.query.pageNum || 1;
  
    const handleNextClick = () => {
      const currentPageNum = Number(pageNum);
      const nextPageNum = currentPageNum + 1;
      router.push(`/transactions/${nextPageNum}`);
    };
  
    const handlePrevClick = () => {
      const currentPageNum = Number(pageNum);
      const nextPageNum = currentPageNum - 1;
      router.push(`/transactions/${nextPageNum}`);
    };
  
    return (
      <>
        <Link href="/">HOME</Link>
        <button type="button" onClick={handleNextClick}>Next Page</button>
        <button type="button" disabled={pageNum <= 1} onClick={handlePrevClick}>Prev Page</button>
  
        <h1>StaticPaths with StaticProps</h1>
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