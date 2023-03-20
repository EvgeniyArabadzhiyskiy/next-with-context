import "@/styles/globals.css";
import  { useState } from "react";
import HomeProvider from "@/components/Context";
// import { ReactQueryDevtools } from "react-query/devtools";
// import { QueryClient, QueryClientProvider } from "react-query";

import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";

const App = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <HomeProvider>

        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
        
      </HomeProvider>
    </>
  );
};

export default App;

//<ReactQueryDevtools />
