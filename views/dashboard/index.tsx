"use client";

import { RoleType, StudentType } from "@/types";
import useLocalStorage from "use-local-storage";
import StudentIndex from "./studentIndex";
import { Chip, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getStudents } from "@/app/actions/endpoints";

export default function Dashboard() {
  const [role] = useLocalStorage<RoleType | undefined>("role", undefined);

  return (
    <>
      {role === "student" && <StudentIndex />}
      {role !== "student" && <StudentSearch />}
      {!role && <div className="divider">Pending...</div>}
    </>
  );
}

function StudentSearch() {
  const [search, setSearch] = useState<string>("");
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function searchStudent() {
      if (!search) return;

      setLoading(true);

      const { success, data } = await getStudents();

      if (success) setStudents(data);

      setLoading(false);
    }

    searchStudent();
  }, [search]);

  return (
    <div className="flex flex-col w-full h-svh min-w-full">
      <div className="flex flex-col justify-center gap-2 max-w-[940px] w-full min-w-full">
        <h3 className="font-bold">Search Student</h3>
        <Input
          type="text"
          radius="sm"
          className="max-w-full w-full min-w-full"
          variant="bordered"
          value={search}
          placeholder="Name | email | Tag Id"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        <div className="options w-full flex flex-col dark:bg-dark-0 bg-[#f8f5f8] rounded-md p-2 min-w-full">
          {loading && (
            <div className="loading w-full flex justify-center items-center p-6">
              <div className="animate-spin w-[80px] h-[80px] min-w-[80px] min-h-[80px] border-5 border-white border-r-primary rounded-full"></div>
            </div>
          )}
          {!loading &&
            students.map((e, index) => {
              return (
                <Link
                  key={index}
                  href={`/dashboard/students/${e.id}`}
                  className="option flex justify-between gap-4 items-center shadow-sm border-b w-full p-2"
                >
                  <div className="flex flex-col w-full">
                    <span className="font-semibold capitalize">
                      {e.firstname} {e.lastname}
                    </span>
                    <span>{e.email}</span>
                  </div>
                  <Chip
                    variant="bordered"
                    color={e.nysc_cleared ? "success" : "warning"}
                  >
                    {e.nysc_cleared ? "Verified" : "Pending"}
                  </Chip>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
