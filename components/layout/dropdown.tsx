"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactElement, useState } from "react";

type ProProps = {
  children: ReactElement;
  title: string;
};

const DropDown = ({ children, title }: ProProps) => {
  const [select, setSelect] = useState<any>(undefined);

  return (
    <div className="dropdown shadow-sm rounded-md border-1 min-w-[210px] bg-white dark:bg-[#18181B] w-full relative overflow-hidden">
      <button
        className={`w-full top-e flex justify-between items-center gap-1 px-3 py-3 ${
          select ? "border-b-1" : "border-b-0"
        }`}
        type="button"
        onClick={() => {
          setSelect(!select);
        }}
      >
        <h5 className="title text-[16px] font-normal">{title}</h5>
        <span>{select ? <ChevronUp /> : <ChevronDown />}</span>
      </button>
      <div
        className={`bottom-e w-full flex flex-col gap-2 ${
          select
            ? "h-full p-3 overflow-auto accordion-up"
            : "h-0 overflow-hidden accordion-down"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
