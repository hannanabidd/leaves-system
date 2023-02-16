import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
  Select,
} from "@chakra-ui/react";
import supabase from "@/utils/supabase";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "@/context/user/UserContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  let router = useRouter();
  const [name, setName] = useState<string>();
  const [organization, setOrganization] = useState<string[]>([""]);
  const [organizationId, setOrganizationId] = useState<string>();
  console.log("user in profile", user);

  const addProfile = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Profiles")
      .insert([{ name: name, id: user?.id }]);

    console.log("data in profile", data);

    setUser?.({
      email: user.email as string,
      id: user.id as string,
      name: name as string,
      organizationId: organizationId as string,
    });
    console.log("user in login", user);
    if (error) {
      throw error;
    } else {
      router.push("http://localhost:3000/employee/dashboard");
    }

    addTeamMember();
    async function addTeamMember() {
      const { error } = await supabase
        .from("TeamMembers")
        .insert([{ user_id: user?.id, organization_id: organizationId }]);

      if (error) throw error;
    }
  };

  async function getOrganization() {
    let { data, error, status } = await supabase
      .from("Organization")
      .select("*");

    if (error && status !== 406) {
      throw error;
    }
    setOrganization(data as any);
  }
  useEffect(() => {
    getOrganization();
  }, []);

  const isError = name === "";
  const isOrganization = organizationId === "";

  return (
    <>
      <section>
        <div className="flex justify-center items-center h-[100vh]">
          <div className="w-[30%]">
            <div className="p-7 border border-[#b3e8dc] shadow-lg ">
              <h1 className="text-[32px] font-bold text-center mb-5">
                Complete Profile
              </h1>
              <Stack spacing={6}>
                <FormControl isInvalid={isError}>
                  <FormLabel>Enter name</FormLabel>
                  <Input
                    type="email"
                    value={name}
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  {!isError ? (
                    <></>
                  ) : (
                    <FormErrorMessage>Name is required.</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={isOrganization}>
                  <FormLabel>Enter Organization</FormLabel>
                  <Select
                    placeholder="Select Type"
                    size="lg"
                    onChange={(e) => setOrganizationId(e.target.value)}>
                    {organization?.map((data: any) => {
                      return (
                        <>
                          <option key={data?.id} value={data?.id}>
                            {data.name}
                          </option>
                          ;
                        </>
                      );
                    })}
                  </Select>
                  {!isError ? (
                    <></>
                  ) : (
                    <FormErrorMessage>Password is required</FormErrorMessage>
                  )}
                </FormControl>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  size="lg"
                  onClick={addProfile}>
                  Proceed
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
