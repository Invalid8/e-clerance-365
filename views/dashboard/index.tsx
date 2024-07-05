"use client";

import { RoleType } from "@/types";
import useLocalStorage from "use-local-storage";
import StudentIndex from "./studentIndex";
import SchoolIndex from "./schoolIndex";
import NYSCIndex from "./nyscIndex";

export default function Dashboard() {
  const [role] = useLocalStorage<RoleType>("role", "student");

  return (
    <>
      {role === "student" && <StudentIndex />}
      {role === "institution" && <SchoolIndex />}
      {role === "nysc" && <NYSCIndex />}
    </>
  );
}
