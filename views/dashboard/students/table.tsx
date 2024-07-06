"use client";

import {
  Button,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Dropdown,
  Switch,
  Chip,
} from "@nextui-org/react";
import { MoreVertical, Trash, User } from "lucide-react";
import {
  getFilteredRowModel,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import useLocalStorage from "use-local-storage";
import { RoleType, StudentType } from "@/types";
import { toggleClear } from "@/app/actions/endpoints";
import { showNotification } from "@/lib";

export default function StudentTable({
  data,
  loading,
  mini,
}: {
  data: StudentType[];
  loading?: boolean;
  mini?: boolean;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {!mini && (
        <div className="flex items-center">
          <Input
            className="max-w-sm dark:bg-secondary"
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("email")?.setFilterValue(e.target.value)
            }
          />
        </div>
      )}
      <div className="flex w-full flex-col border bg-secondary rounded-sm">
        <Table className="over overflow-auto custom-scroll-bar">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!loading &&
              (table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          ) || "none"}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    className="h-24 text-center"
                    colSpan={columns.length}
                  >
                    No results.
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {loading && (
          <div className="w-full min-w-full min-h-[200px] grid place-content-center">
            <div className="info flex items-center justify-center max-w-[300px] flex-col gap-4">
              <div className="loading animate-spin w-[80px] h-[80px] border-[#ccc] border-5 border-r-[#232121] rounded-full" />
              <p className="text-lg sr-only">Getting all students...</p>
            </div>
          </div>
        )}
      </div>
      {!mini && (
        <div className="flex items-center justify-end space-x-4 py-4">
          {table?.getCanPreviousPage() && (
            <Button
              radius="sm"
              variant="bordered"
              onClick={() => table.previousPage()}
            >
              Previous
            </Button>
          )}
          {table?.getCanNextPage() && (
            <Button
              radius="sm"
              variant="bordered"
              onClick={() => table.nextPage()}
            >
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export const columns: ColumnDef<StudentType>[] = [
  {
    accessorKey: "firstname",
    header: "Firstname",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("firstname")}</div>;
    },
  },
  {
    accessorKey: "lastname",
    header: "Lastname",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("lastname")}</div>;
    },
  },
  {
    accessorKey: "tag_id",
    header: "Tag",
    cell: ({ row }) => {
      return (
        <div className="capitalize">{row.getValue("tag_id") || "null"}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "telephone",
    header: "Phone",
    cell: ({ row }) => {
      return <div>{row.getValue("telephone")}</div>;
    },
  },
  {
    accessorKey: "faculty",
    header: "Faculty",
    cell: ({ row }) => {
      return <div>{row.getValue("faculty")}</div>;
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      return <div>{row.getValue("department")}</div>;
    },
  },
  {
    accessorKey: "nysc_cleared",
    header: "Status",
    cell: ({ row }) => {
      let color = "warning" as
        | "success"
        | "warning"
        | "danger"
        | "default"
        | "primary"
        | "secondary"
        | undefined;

      if (row.getValue("nysc_cleared")) color = "success";
      if (!row.getValue("nysc_cleared")) color = "danger";

      return (
        <Chip className="capitalize" color={color} size="sm" variant="bordered">
          {row.getValue("nysc_cleared") ? "cleared" : "pending"}
        </Chip>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row: rowL }) => {
      const row = rowL.original;

      return <Options row={row} />;
    },
  },
];

const Options = ({ row }: { row: StudentType }) => {
  const [role] = useLocalStorage<RoleType | undefined>("role", undefined);
  const [, setTableUpdate] = useLocalStorage<number>("tableUpdate", 0);

  return (
    <div className="flex justify-end items-end">
      <Dropdown
        showArrow
        classNames={{
          base: "before:bg-default-200",
          content:
            "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
        }}
      >
        <DropdownTrigger>
          <Button isIconOnly variant="light">
            <MoreVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dropdown menu with description"
          variant="faded"
          onAction={async (key) => {
            switch (key) {
              case "status":
                const { success: success, message: message } =
                  await toggleClear(row.id);

                if (!success)
                  showNotification(
                    success ? "success" : "error",
                    "top-right",
                    undefined,
                    {
                      message,
                    }
                  );

                setTableUpdate(Date.now());
                return;
              default:
                return;
            }
          }}
        >
          {role === "nysc" ? (
            <DropdownItem
              key="status"
              description="Student status toggle"
              textValue="status"
            >
              <div className="flex justify-between gap-2 items-center min-w-full w-full">
                <span>Cleared</span>
                <Switch
                  aria-label="nysc_cleared"
                  isSelected={row.nysc_cleared}
                  size="sm"
                />
              </div>
            </DropdownItem>
          ) : (
            <DropdownItem></DropdownItem>
          )}

          <DropdownItem
            key="view"
            description="Student profile"
            as={Link}
            href={"/dashboard/students/${row.id}"}
            startContent={
              <User
                className={
                  "text-xl text-default-500 pointer-events-none flex-shrink-0"
                }
              />
            }
            textValue="view"
          >
            View Profile
          </DropdownItem>
          {role === "institution" ? (
            <DropdownItem
              key="delete"
              description="Remove student"
              startContent={
                <Trash
                  className={
                    "text-xl text-default-500 pointer-events-none flex-shrink-0"
                  }
                  color="red"
                />
              }
              textValue="delete"
            >
              Delete
            </DropdownItem>
          ) : (
            <DropdownItem></DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
