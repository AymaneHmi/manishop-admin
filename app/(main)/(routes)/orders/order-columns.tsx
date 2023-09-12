'use client';

import { order } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table"
import { DollarSign } from "lucide-react";

export const columns: ColumnDef<order>[] = [
    {
      accessorKey: "orderId",
      header: "order id",
      cell: ({row}) => {
        const order = row.original;
        return (
          <h2 className="font-bold">{order.orderId}</h2>
        )
      }
    },
    {
      accessorKey: "products",
      header: "Products",
    },
    {
      accessorKey: "name",
      header: "Client's name",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({row}) => {
        const order = row.original;
        return (
          <h2>${order.price}</h2>
        )
      }
    },
    {
      accessorKey: "isPaid",
      header: "Paid",
      cell: ({row}) => {
        const order = row.original;
        return (
          <div className="w-full flex flex col justify-center">
            <DollarSign className={order.isPaid ? "text-lime-500" : "text-red-500" } size={15} />
          </div>
        )
      }
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ] 