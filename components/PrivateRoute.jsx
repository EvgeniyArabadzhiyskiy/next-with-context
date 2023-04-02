import { refreshUser } from "@/helpers/refreshUser";
import { useQuery } from "@tanstack/react-query";

const { useRouter } = require("next/router");
const { useEffect } = require("react");

const PrivateRoute = ({ protectedRoutes, children }) => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: refreshUser,
  });
  // console.log("App  user:", user);

  const router = useRouter();
  // const { isLoggedIn, token } = useSelector((s) => s.auth);

  // const isProtected = protectedRoutes.indexOf(router.pathname) !== -1;
  // const isProtected = protectedRoutes?.some((path) => router.pathname === path);

  // const { isError, isLoading } = useUserRefreshQuery(undefined, { skip: !token });

  // useEffect(() => {
  //   if (!isLoggedIn && isProtected) {
  //     router.push("/login");
  //   }

  //   if (isLoggedIn && router.pathname === "/login") {
  //     router.push("/");
  //   }
  // }, [isLoggedIn, isProtected, router]);

  // if (isLoggedIn && router.pathname === "/login") {
  //   return <h1>Loading...</h1>;
  // }

  // if (!isLoggedIn && isProtected) {
  //   return <h1>Loading...</h1>;
  // }

  return children;
};

export default PrivateRoute;
