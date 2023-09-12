'use client';

import { ColumnDef } from "@tanstack/react-table"
 
import CellAction from "./product-cell-action";
import { Eye, EyeOff } from "lucide-react";
import { useMinimize } from "@/hooks/use-minimize";
import { product } from "@/lib/types";

export const columns: ColumnDef<product>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({row}) => {
        const product = row.original;
        return (
          <div className="text-xs" dangerouslySetInnerHTML={{ __html: useMinimize(product.description, 100) }}></div>
        )
      }
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "subcategory",
      header: "Subcategory",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "available",
      header: "Visibility",
      cell: ({row}) => {
        const product = row.original;
        return (
          <div className="w-full flex flex col justify-center">
            {product.available ? <Eye size={15} /> : <EyeOff size={15} />}
          </div>
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