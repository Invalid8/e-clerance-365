"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  SectionTitle,
  SectionWrap,
  SectionSubTitle,
} from "@/components/layout";
import StudentsTable from "./table";
import { StudentType } from "@/types";
import { getStudents } from "@/app/actions/endpoints";

export default function Students({ mini }: { mini?: boolean }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<StudentType[]>([]);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const { success, message, data } = await getStudents();

      if (success) setData(data);

      setLoading(false);
    }

    getData();
  }, []);

  return (
    <SectionWrap>
      {!mini && <SectionTitle>All Students</SectionTitle>}
      {mini && (
        <div className="flex gap-4 justify-between items-end">
          <SectionSubTitle>Students</SectionSubTitle>
          <Link
            className="underline underline-offset-1"
            href={"/dashboard/students"}
          >
            See more
          </Link>
        </div>
      )}
      <div className="main-content flex flex-col gap-2">
        <StudentsTable data={data} loading={loading} mini={mini} />
      </div>
    </SectionWrap>
  );
}
