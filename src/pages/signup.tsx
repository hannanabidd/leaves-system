import React, { useState } from "react";
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
import { string } from "prop-types";

const Signup = () => {
  let router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => setShow(!show);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email as string,
      password: password as string,
    });

    if (data?.user?.id) {
      router.push("http://localhost:3000/");
    }
    if (error) {
      console.log(error);
    }
  };
  const isError = email === "";

  return (
    <>
      <section>
        <div className="flex justify-center items-center h-[100vh]">
          <div className="w-[30%]">
            <div className="p-7 border border-[#b3e8dc] shadow-lg ">
              <h1 className="text-[32px] font-bold text-center mb-5">
                Sign Up
              </h1>
              <Stack spacing={8}>
                <FormControl isInvalid={isError}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    placeholder="Enter email"
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
                <FormControl>
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
                  {!isError ? (
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
                  Sign up
                </Button>
              </Stack>
              <h1 className="text-center mt-3">
                Already have a account?
                <Link href="http://localhost:3000/">
                  <span className="text-[#008080] ml-2">login</span>
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
