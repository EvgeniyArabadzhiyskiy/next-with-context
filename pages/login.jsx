import { HomeContext } from "@/components/Context";
import { getUser } from "@/helpers/getUser";
import { refreshUser } from "@/helpers/refreshUser";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { parseCookies, setCookie } from "nookies";
import { useContext, useState } from "react";

const LoginPage = () => {
  const [credentials, setCredentials] = useState(null);

  const { isLoggedIn, setIsLoggedIn } = useContext(HomeContext);
  // console.log("LoginPage  isLoggedIn:", isLoggedIn);

  // const { data } = useQuery({
  //   queryKey: ["user", credentials],
  //   queryFn: () => getUser(credentials),
  //   enabled: !!credentials,
  //   cacheTime: Infinity,

  //   onSuccess: (data) => {
  //     // setCookie(null, "authToken", `${data?.token}`, {
  //     //   maxAge: 30 * 24 * 60 * 60,
  //     //   path: "/",
  //     // });
  //     setIsLoggedIn(true)
  //   },
  // });


  const { authToken } = parseCookies();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn:  refreshUser,
    enabled: !!authToken,
  });

  const onLogin = async (e) => {
    e.preventDefault();
    const el = e.target.elements;

    const userData = {
      email: el.email.value,
      password: el.password.value,
    };

    setCredentials(userData);
  };
  return (
    <>
      <Link href="/">HOME</Link>
      <h1>Login Page</h1>;
      <form onSubmit={onLogin}>
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;
