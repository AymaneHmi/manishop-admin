'use client';

import { ColumnDef } from "@tanstack/react-table"
 
import CellAction from "./sub-cell-action";
import { subcategory } from "@/lib/types";

export const columns: ColumnDef<subcategory>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "category",
      header: "Category",
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