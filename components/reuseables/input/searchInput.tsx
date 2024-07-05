"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib";

export default function SearchInput({
  setIsMenuOpen,
  className,
}: {
  setIsMenuOpen?: (value: boolean) => void;
  className?: string;
}) {
  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  function handleSearch(e?: any) {
    e.preventDefault();

    if (search.length < 1) return;
    setIsMenuOpen && setIsMenuOpen(false);

    router.push(`/dashboard/newsletter?search=${search}`);
  }

  return (
    <form
      className={cn("w-fit h-fit", className, "border-1 rounded-sm")}
      onSubmit={handleSearch}
    >
      <div className="sm:flex hidden">
        <Input
          aria-label="search"
          className="sm:max-w-[275px] md:min-w-[260px]"
          classNames={{
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",

            inputWrapper:
              "h-full font-normal text-default-500 bg-input text-input-foreground rounded-l-none rounded-r-none",
          }}
          placeholder="Type to search..."
          size="sm"
          type="search"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        <button
          className="search bg-primary px-[12px] text-primary-foreground dark:bg-dark-1 dark:text-white rounded-r-sm"
          type="submit"
        >
          <SearchIcon size={20} />
        </button>
      </div>
    </form>
  );
}
