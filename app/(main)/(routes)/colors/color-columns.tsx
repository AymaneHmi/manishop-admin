'use client';

import { ColumnDef } from "@tanstack/react-table"
 
import CellAction from "./color-cell-action";
import { color } from "@/lib/types";

export const columns: ColumnDef<color>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "colorCode",
      header: "Color",
      cell: ({row}) => {
        const color = row.original;
        return (
          <div className="w-5 h-5 border rounded-full" style={{backgroundColor: color.value}}></div>   
        )
      }
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