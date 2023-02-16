import React, { useContext, useEffect, useState } from "react";
import Layout from "@/components/base/Layout/MainLayout/MainLayout";
import supabase from "@/utils/supabase";
import { useRouter } from "next/router";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Typography } from "@/components/ui/Typography";
import { UserContext } from "@/context/user/UserContext";
import DateRangePicker from "@/components/base/DateRange/DateRange";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  let router = useRouter();
  console.log("user in dashboard", user);
  const [type, setType] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [days, setDays] = useState<number>(1);
  const [duration, setDuration] = useState<string>("one");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };
  const handleDate = (value: string) => {
    console.log(`Dashboard value changed: ${value}`);
  };

  return (
    <>
      <Layout>
        <Typography as="h1" className="text-[28px] font-bold">
          Apply for Leave.
        </Typography>
        <div className="my-9 p-3 border shadow-sm md:w-[50%] rounded-3 ">
          <FormControl>
            <Stack spacing={5}>
              <div>
                <FormLabel>Select Leave Type</FormLabel>
                <Select placeholder="Select Type" size="lg">
                  <option value="casual">Causal Leave</option>
                  <option value="sick">Sick Leave</option>
                </Select>
              </div>
              <div>
                <FormLabel>Duration</FormLabel>
                <Select
                  placeholder="Select Type"
                  size="lg"
                  onChange={(e) => setDuration(e.target.value)}
                  value={duration}>
                  <option value="one">One day</option>
                  <option value="range">Range</option>
                </Select>
              </div>
              <div>
                <FormControl className="mb-3">
                  <FormLabel>Enter total days</FormLabel>
                  <Input
                    type="number"
                    value={days}
                    placeholder="Enter Days"
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                {duration == "one" ? (
                  <>
                    <FormLabel>Select Leave Date</FormLabel>
                    <Input
                      placeholder="Select Date and Time"
                      size="lg"
                      type="date"
                    />
                  </>
                ) : (
                  <>
                    <DateRangePicker
                      onChange={handleDateChange}
                      handleDate={handleDate}
                    />
                  </>
                )}
              </div>
              <div>
                <FormLabel>Add a note</FormLabel>
                <Textarea placeholder="note" />
              </div>
              <Button
                colorScheme="teal"
                // variant=""
                size="lg"
                //   onClick={handleLogin}
              >
                Apply
              </Button>
            </Stack>
          </FormControl>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
