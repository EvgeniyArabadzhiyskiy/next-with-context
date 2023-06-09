import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <Link href="/login">LOGIN</Link>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div>
            <Link href="/transactions">Transactions</Link>
            <Link href="/transactions/second">SECOND</Link>
            <Link href="/transactions/infinite">INFINITY</Link>
            
            <Link href="/transactions/no-query/1">SERVER NO QUERY</Link>
            <Link href="/transactions/new/1">SERVER WITH DEGYDRATE</Link>
            <Link href="/transactions/first-server">FIRST SERVER</Link>

            <Link href="/transactions/1">STATIC PROPS</Link>
            <Link href="/transactions/server">STATIC ONE PAGE</Link>
          </div>
        </div>
      </main>
    </>
  );
}
