import Head from "next/head";
import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Leaves from "./Leaves";
import Login from "./login";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  // console.log("session", session);

  return (
    <>
      <Head>
        <title>Megaverse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  );
};
export default Home;
