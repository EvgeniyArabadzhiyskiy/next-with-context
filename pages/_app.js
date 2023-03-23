import "@/styles/globals.css";
import { useState } from "react";
import ContextProvider from "@/components/Context";
// import { ReactQueryDevtools } from "react-query/devtools";
// import { QueryClient, QueryClientProvider } from "react-query";

import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";

// const queryClient = new QueryClient()

const App = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ContextProvider> */}
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        {/* </ContextProvider> */}
      </QueryClientProvider>
    </>
  );
};

export default App;

//<ReactQueryDevtools />
