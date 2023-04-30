import { getAllTransactions } from "@/helpers/getAllTransactions";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


// export async function getServerSideProps(context) {
//   const queryClient = new QueryClient();
//   // const pageNum = Number(context.params.pageNum);

//   await queryClient.prefetchQuery(["transactions", 1], () => getAllTransactions(1));

//   return {
//     props: { dehydratedState: dehydrate(queryClient) },
//   };
// }

// export async function getServerSideProps(context) {
//   const pageNum = context.params.pageNum;
//   const todos = await getAllTransactions(pageNum);
  
//   return {
//     props: { todos },
//   };
// }


// export default function TodosPage({ todos }) {

//   const queryClient = useQueryClient()
//   // const [isSkip, setIsSkip] = useState(false);
 
  
//   // const [pageNum, setPageNum] = useState(1);
//   // console.log("TodosPage  pageNum:", pageNum);

//   // const [page, setPage] = useState(todos);
  

//   const router = useRouter();
//   const pageNum = router.query.pageNum || 1;

//   const { data } = useQuery({
//     queryKey: ["transactions", pageNum],
//     queryFn: () => getAllTransactions(pageNum),
//     initialData: todos,
//     // enabled: isSkip,

//     // onSuccess:(data) => setPage(data),

//     keepPreviousData: true,
//     staleTime: Infinity,
//   });

//   // const queryLength = queryClient.getQueriesData(["transactions"]);
//   // console.log("TodosPage  queryLength:", queryLength);

//   const handleNextClick = () => {
//     // setPageNum(p => p + 1)

//     const currentPageNum = Number(pageNum);
//     const nextPageNum = currentPageNum + 1;
//     router.push(`/transactions/${nextPageNum}`);
//   };

//   const handlePrevClick = () => {
//     // setPageNum(p => p - 1);
//     // setIsSkip(true)
    
//     const currentPageNum = Number(pageNum);
//     const nextPageNum = currentPageNum - 1;
//     router.push(`/transactions/${nextPageNum}`);
//   };

//   return (
//     <>
//       <Link href="/">HOME</Link>
//       <button type="button" onClick={handleNextClick}>Next Page</button>
//       <button type="button" disabled={pageNum <= 1} onClick={handlePrevClick}>Prev Page</button>

//       <ul>
//         {data?.map((item) => {
//           return (
//           <div style={{display: 'flex', justifyContent: 'space-between', width: '200px'}} key={item._id}>
//             <li>{item.category}</li>
//           </div>)
//         })}
//       </ul>
//     </>
//   );
// }





//=======Только первая страница загружается на сервере ==========

// export async function getServerSideProps(context) {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(["transactions", 1], () => getAllTransactions(1));

//   return {
//     props: { dehydratedState: dehydrate(queryClient) },
//   };
// }

// export default function TodosPage({ todos }) {
//   const [pageNum, setPageNum] = useState(1);
  
//   const { data } = useQuery({
//     queryKey: ["transactions", pageNum],
//     queryFn: () => getAllTransactions(pageNum),
  
//     keepPreviousData: true,
//     staleTime: Infinity,
//   });

//   const handleNextClick = () => {
//     setPageNum(p => p + 1)
//   };

//   const handlePrevClick = () => {
//     setPageNum(p => p - 1);

//   };

//   return (
//     <>
//       <Link href="/">HOME</Link>
//       <button type="button" onClick={handleNextClick}>Next Page</button>
//       <button type="button" disabled={pageNum <= 1} onClick={handlePrevClick}>Prev Page</button>

//       <ul>
//         {data?.map((item) => {
//           return (
//           <div style={{display: 'flex', justifyContent: 'space-between', width: '200px'}} key={item._id}>
//             <li>{item.category}</li>
//           </div>)
//         })}
//       </ul>
//     </>
//   );
// }

//====== Работает с initialData каждая страница загружается на сервере ===
//============== динамический маршрут [pageNum] ======================

// export async function getServerSideProps(context) {
//   const pageNum = context.params.pageNum;
//   const todos = await getAllTransactions(pageNum);
  
//   return {
//     props: { todos },
//   };
// }


// export default function TodosPage({ todos }) {
//   const router = useRouter();
//   const pageNum = router.query.pageNum || 1;

//   const { data } = useQuery({
//     queryKey: ["transactions", pageNum],
//     queryFn: () => getAllTransactions(pageNum),
//     initialData: todos,
 
//     keepPreviousData: true,
//     staleTime: Infinity,
//   });


//   const handleNextClick = () => {
//     const currentPageNum = Number(pageNum);
//     const nextPageNum = currentPageNum + 1;
//     router.push(`/transactions/${nextPageNum}`);
//   };

//   const handlePrevClick = () => {
//     const currentPageNum = Number(pageNum);
//     const nextPageNum = currentPageNum - 1;
//     router.push(`/transactions/${nextPageNum}`);
//   };

//   return (
//     <>
//       <Link href="/">HOME</Link>
//       <button type="button" onClick={handleNextClick}>Next Page</button>
//       <button type="button" disabled={pageNum <= 1} onClick={handlePrevClick}>Prev Page</button>

//       <ul>
//         {data?.map((item) => {
//           return (
//           <div style={{display: 'flex', justifyContent: 'space-between', width: '200px'}} key={item._id}>
//             <li>{item.category}</li>
//           </div>)
//         })}
//       </ul>
//     </>
//   );
// }


//=========== getStaticPaths with getStaticProps ====================

// export async function getStaticPaths ()  {
//   console.log("HELLO get Static Paths");
//   const allPagesNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
//   return {
//     paths: allPagesNum.map((p) => `/transactions/${p}`),
//     fallback: false,
//   }
// }

export async function getStaticProps(context) {
  console.log("Static Props");
  // const pageNum = context.params.pageNum;
  const todos = await getAllTransactions(1);
  
  return {
    props: { todos },
  };
}


export default function TodosPage({ todos }) {
  // const router = useRouter();
  // const pageNum = router.query.pageNum || 1;

  // const handleNextClick = () => {
  //   const currentPageNum = Number(pageNum);
  //   const nextPageNum = currentPageNum + 1;
  //   router.push(`/transactions/${nextPageNum}`);
  // };

  // const handlePrevClick = () => {
  //   const currentPageNum = Number(pageNum);
  //   const nextPageNum = currentPageNum - 1;
  //   router.push(`/transactions/${nextPageNum}`);
  // };

  return (
    <>
      <Link href="/">HOME</Link>
      {/* <button type="button" onClick={handleNextClick}>Next Page</button>
      <button type="button" disabled={pageNum <= 1} onClick={handlePrevClick}>Prev Page</button> */}

      <h1>Static Props</h1>
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