import React from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <Input
      className=" rounded-full bg-slate-200 w-72"
      endContent={
        <button
          className=" rounded-full bg-primary text-primary-foreground px-5 py-5"
          type="button"
        >
          <SearchIcon />
        </button>
      }
      placeholder="Search now"
    />
  );
}
