'use client';

import { ColumnDef } from "@tanstack/react-table"
 
import CellAction from "./size-cell-action";
import { size } from "@/lib/types";

export const columns: ColumnDef<size>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "value",
      header: "Value",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => <CellAction data={row.original} />,
    },
  ] 