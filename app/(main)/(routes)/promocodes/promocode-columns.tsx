'use client';

import { ColumnDef } from "@tanstack/react-table"
 
import CellAction from "./promocode-cell-action";
import { promocode } from "@/lib/types";
import { format } from "date-fns";

export const columns: ColumnDef<promocode>[] = [
    {
      accessorKey: "promocode",
      header: "Promocode",
    },
    {
      accessorKey: "discountAmount",
      header: "Discount Amount",
      cell: ({row}) => {
        const discountAmount = row.original.discountAmount;
        return discountAmount + '%'
      }
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({row}) => {
        const startDate = row.original.startDate;
        return (format(new Date(startDate), 'MMMM dd, yyyy'))
      }
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({row}) => {
        const endDate = row.original.endDate;
        return (format(new Date(endDate), 'MMMM dd, yyyy'))
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