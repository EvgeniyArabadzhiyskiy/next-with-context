import "@/styles/globals.css";
import HomeProvider from "@/components/Context";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  return (
    <>
      <HomeProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </HomeProvider>
    </>
  );
};

export default App;
