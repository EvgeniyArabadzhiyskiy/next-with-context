import { getUser } from "@/helpers/getUser";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { setCookie } from "nookies";
import { useState } from "react";

const LoginPage = () => {
  const [credentials, setCredentials] = useState(null);

  const { data } = useQuery({
    queryKey: ["user", credentials],
    queryFn: () => getUser(credentials),
    enabled: !!credentials,
    cacheTime: Infinity,

    onSuccess: (data) => {
      setCookie(null, "authToken", `${data?.token}`, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    },
  });

  const onLogin = async () => {
    const userData = {
      email: "user100@mail.com",
      password: "a123456",
    };
    setCredentials(userData);
  };
  return (
    <>
      <Link href="/">HOME</Link>
      <h1>Login Page</h1>;
      <button type="button" onClick={onLogin}>
        Login
      </button>
    </>
  );
};

export default LoginPage;
