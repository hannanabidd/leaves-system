import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import supabase from "@/utils/supabase";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "@/context/user/UserContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  let router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => setShow(!show);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email as string,
      password: password as string,
    });
    console.log(data);
    const mail = data?.user?.email;
    const id = data?.user?.id;

    setUser?.({
      email: mail as string,
      id: id as string,
    });
    console.log("user in login", user);

    if (data?.session?.access_token) {
      let { data, error } = await supabase
        .from("Profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      console.log("profiles", data);
      const name = data?.name;
      if (data?.name == name) {
        router.push("http://localhost:3000/employee/dashboard");
      } else {
        router.push("http://localhost:3000/profile");
      }
    }
    if (error) {
      console.log(error);
    }
  };

  const isError = email === "";
  const isPassword = password === "";

  return (
    <>
      <section>
        <div className="flex justify-center items-center h-[100vh]">
          <div className="w-[30%]">
            <div className="p-7 border border-[#b3e8dc] shadow-lg ">
              <h1 className="text-[32px] font-bold text-center mb-5">Login</h1>
              <Stack spacing={8}>
                <FormControl isInvalid={isError}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!isError ? (
                    <FormHelperText>
                      We'll never share your email
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={isPassword}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {!isPassword ? (
                    <FormHelperText>
                      We'll never share your password.
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>Password is required</FormErrorMessage>
                  )}
                </FormControl>
                <Button
                  // isLoading
                  // loadingText="Submitting"
                  colorScheme="teal"
                  variant="outline"
                  size="lg"
                  onClick={handleLogin}>
                  Login
                </Button>
              </Stack>
              <h1 className="text-center mt-3">
                Are you a new user?
                <Link href="http://localhost:3000/signup">
                  <span className="text-[#008080] ml-2">Sign Up</span>
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
