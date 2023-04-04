import "@/styles/globals.css";
import { useState } from "react";
import ContextProvider from "@/components/Context";
// import { ReactQueryDevtools } from "react-query/devtools";

import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import PrivateRoute from "@/components/PrivateRoute";

const userData = {
  email: "user100@mail.com",
  password: "a123456",
};

const App = ({ Component, pageProps }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            // staleTime: 0.1 * (60 * 1000),
          },
        },
      })
  );

  const state = queryClient.getQueryState()
  // console.log(state)

  // const cacheTransactions = queryClient.getQueryCache().find(["user", userData])
  //   ?.state.data;
  const cacheTransactions = queryClient.getQueryCache().findAll()
    // ?.state.data;
  // console.log("App  cacheTransactions:", cacheTransactions);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <PrivateRoute>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </PrivateRoute>
        </ContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;

//<ReactQueryDevtools />
