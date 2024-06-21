'use client';

import { ColumnDef } from "@tanstack/react-table"
 
import CellAction from "./status-cell-action";
import { status } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<status>[] = [
    {
      accessorKey: "name",
      header: "status",
    },
    {
      header: "Overview",
      cell: ({row}) => {
        const {name, value: colorCode} = row.original;
        return (
          <Badge
            variant={"outline"}
            style={{borderColor: colorCode, color: colorCode}}
          >
            {name}
          </Badge>
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