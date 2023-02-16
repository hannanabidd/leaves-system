
import "src/styles/globals.css";
import "src/styles/common.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react';
import UserProvider from "@/context/user/UserContext";


function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <UserProvider>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}>
          <ChakraProvider>
              <Component {...pageProps} />
          </ChakraProvider>
      </SessionContextProvider>
    </UserProvider>
    
  );
}
export default MyApp;
