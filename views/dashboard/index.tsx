"use client";

import { RoleType } from "@/types";
import useLocalStorage from "use-local-storage";
import StudentIndex from "./studentIndex";
import Students from "./students";

export default function Dashboard() {
  const [role] = useLocalStorage<RoleType | undefined>("role", undefined);

  return (
    <>
      {role === "student" && <StudentIndex />}
      {role !== "institution" && <Students />}
      {!role && <div className="divider">Pending...</div>}
    </>
  );
}
