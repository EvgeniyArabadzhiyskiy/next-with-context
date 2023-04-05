import { HomeContext } from "@/components/Context";
import { getUser } from "@/helpers/getUser";
import { refreshUser } from "@/helpers/refreshUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { parseCookies, setCookie } from "nookies";
import { useContext, useState } from "react";

const LoginPage = () => {
  const [credentials, setCredentials] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn, setIsLoggedIn } = useContext(HomeContext);
  // console.log("LoginPage  isLoggedIn:", isLoggedIn);

  const queryClient = useQueryClient();
  const getData = queryClient.getQueriesData()
  console.log("LoginPage  getData:", getData);

  const { data } = useQuery({
    queryKey: ["user", credentials],
    queryFn: () => getUser(credentials),
    enabled: !!credentials,
    cacheTime: Infinity,
    

    onSuccess: (data) => {
      // setCookie(null, "authToken", `${data?.token}`, {
      //   maxAge: 30 * 24 * 60 * 60,
      //   path: "/",
      // });
      setIsLoggedIn(true)
    },
  });

  const { authToken } = parseCookies();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: refreshUser,
    enabled: !!authToken,

    staleTime: Infinity,
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();

    // queryClient.invalidateQueries({
    //   queryKey: ['user'],
    //   refetchType: 'active',
    // })

    const userData = {
      email,
      password,
    };

    if (email && password) {
      setCredentials(userData);
    }
  };
  return (
    <>
      <Link href="/">HOME</Link>
      <h1>Login Page</h1>;
      <form onSubmit={onLogin}>
        <input type="text" name="email" onChange={onInputChange} />
        <input type="text" name="password" onChange={onInputChange} />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;
