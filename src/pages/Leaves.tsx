import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Session, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import supabase from "@/utils/supabase";
import Cookies from "js-cookie";
import Layout from "@/components/base/Layout/MainLayout/MainLayout";

const Leaves = ({ session }: { session: Session }) => {
  let router = useRouter();
  const user = useUser();
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [leaveType, setLeaveType] = useState<string>("");
  const [totalLeaves, setTotalLeaves] = useState<string>("");
  const [users, setUsers] = useState<string[]>([""]);
  const [userId, setUserId] = useState<string>(users[0]);
  const [organization, setOrganization] = useState<string[]>([""]);
  const [organizationId, setOrganizationId] = useState<string>();
  const [leaves, setLeaves] = useState<string[]>([""]);
  const [settings, setSettings] = useState<string[]>([""]);
  const [TeamMembers, setTeamMembers] = useState<string[]>([""]);

  // console.log("organizationId", organizationId);

  // Get all leave requests
  async function getLeaves() {
    let { data, error } = await supabase.from("Leaves").select("*");
    if (error) {
      throw error;
    }
    setLeaves(data as any);
  }

  // Get team members requests
  async function getTeamMembers() {
    let { data, error } = await supabase.from("TeamMembers").select("*");
    if (error) {
      throw error;
    }
    setTeamMembers(data as any);
  }

  // Get all organizations
  async function getOrganization() {
    let { data, error, status } = await supabase
      .from("Organization")
      .select("*");

    if (error && status !== 406) {
      throw error;
    }
    setOrganization(data as any);
  }

  // Get organization by id
  async function getOrganizationById() {
    let { data, error, status } = await supabase
      .from("Organization")
      .select("*")
      .eq("owner_id", user?.id);

    if (error && status !== 406) {
      throw error;
    }
    setOrganization(data as any);
  }

  // Get all users
  async function getUsers() {
    let { data, error, status } = await supabase.from("Profiles").select("*");

    if (error && status !== 406) {
      throw error;
    }
    setUsers(data as any);
  }

  // Get organization settings
  async function getSettings() {
    let { data, error } = await supabase.from("Settings").select("*");

    if (error) {
      throw error;
    }
    setSettings(data as any);
  }

  // async function getRequests() {
  //   let {data, error} = await supabase.from("TeamMembers").select("*").JOIN organization .ON TeamMembers.user_id
  // }

  useEffect(() => {
    getLeaves();
    getTeamMembers();
    getOrganization();
    // getOrganizationById();
    getUsers();
    getSettings();
  }, []);

  async function createOrganization(e: any) {
    const { data, error } = await supabase
      .from("Organization")
      .insert([{ name, owner_id: user?.id }]);

    if (error) throw error;
  }

  async function addProfile() {
    const { data, error } = await supabase
      .from("Profiles")
      .insert([{ name: fullName, id: user?.id }]);

    if (error) throw error;

    addTeamMember();
    async function addTeamMember() {
      const { error } = await supabase
        .from("TeamMembers")
        .insert([{ user_id: user?.id, organization_id: organizationId }]);

      if (error) throw error;
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    Cookies.remove("supabase-auth-token");
    // window.location.reload();
    router.push("http://localhost:3000/");
  }

  async function applyLeave() {
    const { error } = await supabase
      .from("Leaves")
      .insert([{ type, note, date, user_id: user?.id }]);

    if (error) throw error;
  }

  async function applySettings() {
    const { error } = await supabase
      .from("Settings")
      .insert([
        { type: leaveType, total_leaves: totalLeaves, organization_id: 1 },
      ]);
    if (error) throw error;
  }

  async function changeMemberStatus(data: any) {
    const { error } = await supabase
      .from("TeamMembers")
      .update({ status: "approved" })
      .eq("id", data?.id);
    if (error) {
      throw error;
    }
  }
  async function changeStatus(data: any) {
    const { error } = await supabase
      .from("Leaves")
      .update({ status: "approved" })
      .eq("id", data?.id);
    if (error) {
      throw error;
    }
  }
  return (
    <>
      <Head>
        <title>PRACTICE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className="px-[0px]">
          <div className="my-9">
            <h1 className="my-3">Complete Profile</h1>
            <form method="post" onSubmit={(e) => e.preventDefault()}>
              <label
                htmlFor="name"
                className="block text-lg font-bold  text-gray-700">
                Enter Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                placeholder="Name"
                // value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-[30%] rounded-md border border-gray-300 py-2 px-3  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
              <label
                htmlFor="name"
                className="block text-lg font-bold my-2 text-gray-700">
                Enter Organization
              </label>
              <select
                name="organizationId"
                id="organizationId"
                placeholder="Enter Organization"
                className="mt-1 block w-[50%] rounded-md border border-gray-300 py-2 px-3  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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
              </select>
              <button className="mt-4 border px-4 py-2" onClick={addProfile}>
                Submit{" "}
              </button>
            </form>
          </div>
          <div className="p-3 border shadow-sm w-[20%] rounded-3 ">
            {users?.map((data: any) => {
              return (
                <div key={data?.id}>
                  <h4 className="text-italic text-[16px] mb-1">{data?.name}</h4>
                </div>
              );
            })}
          </div>
          <div className="p-4 my-3 border shadow-lg w-[50%] ">
            {TeamMembers?.map((data: any) => {
              return (
                <div
                  key={data?.id}
                  className="flex justify-between w-full mb-2 items-center">
                  <p>{data?.user_id}</p>

                  <p
                    className="cursor-pointer flex
                ">
                    {data?.status}
                  </p>
                  {data.status == "pending" ? (
                    <>
                      <button
                        onClick={() => changeMemberStatus(data)}
                        className="border ml-2 w-[100px] rounded py-2 bg-black text-white">
                        Accept
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="border ml-2 w-[100px] rounded py-2 bg-[#1d884a] text-white">
                        Approved
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="my-9">
            <h1 className="my-3">Add Organization</h1>
            <form method="post" onSubmit={(e) => e.preventDefault()}>
              <label
                htmlFor="organization"
                className="block text-lg font-bold  text-gray-700">
                organization
              </label>
              <input
                type="text"
                name="organization"
                id="organization"
                autoComplete="organization"
                placeholder="organization"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-[30%] rounded-md border border-gray-300 py-2 px-3  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
              <button
                className="mt-4 border px-4 py-2"
                onClick={createOrganization}>
                Submit{" "}
              </button>
            </form>
          </div>
          <div className="p-3 border shadow-sm w-[20%] rounded-3 ">
            {organization?.map((data: any) => {
              return (
                <div key={data?.id}>
                  <h4 className="text-italic text-[16px] mb-1">{data?.name}</h4>
                </div>
              );
            })}
          </div>
          <div className="my-9 p-3 border shadow-sm w-[40%] rounded-3 ">
            <h1 className="my-3">Add Team Member</h1>
            <select
              name="userId"
              id="userId"
              className="mt-1 block w-[50%] rounded-md border border-gray-300 py-2 px-3  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              onChange={(e) => setUserId(e.target.value)}>
              {users?.map((data: any) => {
                return (
                  <>
                    <option key={data?.id} value={data?.id}>
                      {data.name}
                    </option>
                    ;
                  </>
                );
              })}
            </select>
          </div>
          <div className="my-9">
            <h1 className="my-3">Apply For Leave</h1>
            <form method="post" onSubmit={(e) => e.preventDefault()}>
              <label
                htmlFor="type"
                className="block text-lg font-bold  text-gray-700">
                Type
              </label>
              <select
                name="type"
                id="type"
                className="mt-1 block w-[30%] rounded-md border border-gray-300 py-2 px-3  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                onChange={(e) => setType(e.target.value)}>
                <option value="casual">Select Type</option>
                <option value="casual">Casual</option>
                <option value="sick">Sick</option>
              </select>
              <label
                htmlFor="note"
                className="block text-lg font-bold  text-gray-700 mt-3">
                Note
              </label>
              <input
                type="text"
                name="note"
                id="note"
                autoComplete="note"
                placeholder="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1 block w-[30%] rounded-md border border-gray-300 py-2 px-3  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
              <label
                htmlFor="date"
                className="block text-lg font-bold  text-gray-700 mt-3">
                Leave Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                autoComplete="note"
                placeholder="note"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-[30%] rounded-md border border-gray-300 py-2 px-3  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
              <button className="mt-8 border px-4 py-2" onClick={applyLeave}>
                Submit{" "}
              </button>
            </form>
          </div>
          <div className="p-4 border shadow-lg w-[50%] ">
            {leaves?.map((data: any) => {
              return (
                <div
                  key={data?.id}
                  className="flex justify-between w-full mb-2 items-center">
                  <p>{data?.type}</p>
                  <p>{data?.note}</p>
                  {/* <p>{data?.date}</p> */}
                  <p
                    className="cursor-pointer flex
                ">
                    {data?.status}
                  </p>
                  {data.status == "pending" ? (
                    <>
                      <button
                        onClick={() => changeStatus(data)}
                        className="border ml-2 w-[100px] rounded py-2 bg-black text-white">
                        Accept
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="border ml-2 w-[100px] rounded py-2 bg-[#1d884a] text-white">
                        Approved
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="my-9">
            <h1 className="my-3">Leave Settings</h1>
            <form method="post" onSubmit={(e) => e.preventDefault()}>
              <label
                htmlFor="type"
                className="block text-lg font-bold  text-gray-700">
                Leave Type
              </label>
              <select
                name="leaveType"
                id="leaveType"
                className="mt-1 block w-[30%] rounded-md border border-gray-300 py-2 px-3  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                onChange={(e) => setLeaveType(e.target.value)}>
                <option value="casual">Select Type</option>
                <option value="casual">Casual</option>
                <option value="sick">Sick</option>
              </select>
              <label
                htmlFor="totalLeaves"
                className="block text-lg font-bold  text-gray-700 mt-3">
                Total Leaves
              </label>
              <input
                type="text"
                name="totalLeaves"
                id="totalLeaves"
                autoComplete="totalLeaves"
                placeholder="Add total leaves"
                value={totalLeaves}
                onChange={(e) => setTotalLeaves(e.target.value)}
                className="mt-1 block w-[30%] rounded-md border border-gary-300 py-2 px-3  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm-text-sm"
              />

              <button className="mt-8 border px-4 py-2" onClick={applySettings}>
                Submit{" "}
              </button>
            </form>
          </div>
          <div className="p-4 border shadow-lg w-[30%] ">
            {settings?.map((data: any) => {
              return (
                <div
                  key={data.id}
                  className="flex justify-between w-full mb-2 items-center">
                  <p>{data?.type}</p>
                  <p>{data?.total_leaves}</p>
                </div>
              );
            })}
          </div>
        </section>
      </Layout>
      {/* <div className="flex px-[100px] py-[20px] justify-between items-center">
        <h1>LEAVES</h1>
        <h5 onClick={handleLogout} className="cursor-pointer text-[#FF0000]">
          LOGOUT
        </h5>
      </div> */}
    </>
  );
};
export default Leaves;
