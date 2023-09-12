'use client';

import { ColumnDef } from "@tanstack/react-table"
import { category } from "@/lib/types";

import Image from "next/image";
import CellAction from "./cell-action";

const imageUrl = process.env.NEXT_PUBLIC_CATEGORIES_IMG_URL;

export const columns: ColumnDef<category>[] = [
    {
      header: "image",
      cell: ({row}) => {
          const category = row.original;
          return (
              <Image 
                src={(imageUrl || "") + category.image}
                alt={category.name}
                width={100}
                height={100}
              />
          )
        }
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
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