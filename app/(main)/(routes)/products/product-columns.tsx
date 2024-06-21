'use client';

import { ColumnDef } from "@tanstack/react-table"
 
import CellAction from "./product-cell-action";
import { Eye, EyeOff, LockIcon } from "lucide-react";
import { useMinimize } from "@/hooks/use-minimize";
import { product } from "@/lib/types";
import MediaReader from "@/components/media-reader";

export const columns: ColumnDef<product>[] = [
  {
    header: "Media",
    cell: ({row}) => {
      const media = row.original.media;
      return (
        <div className="aspect-square overflow-hidden w-20 relative">
          <MediaReader
            media={media?.[0]}
          />
        </div>
      )
    }
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => {
      const product = row.original;
      return (
        <div className="text-sm line-clamp-1">{product.title}</div>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({row}) => {
      const product = row.original;
      return (
        <div className="text-xs line-clamp-2" dangerouslySetInnerHTML={{ __html: product.description}}></div>
      )
    }
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "subcategory.name",
    header: "Subcategory",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({row}) => {
      const product = row.original;
      return (
        <div className="text-sm">${product.price}</div>
      )
    }
  },
  {
    accessorKey: "available",
    header: "Visibility",
    cell: ({row}) => {
      const product = row.original;
      return (
        <div className="w-full flex flex col justify-center">
          {product.available ? <Eye size={15} /> : <LockIcon size={15} />}
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