'use client';

import { ColumnDef } from "@tanstack/react-table"
import { category } from "@/lib/types";
import CellAction from "./cell-action";
import MediaReader from "@/components/media-reader";

export const columns: ColumnDef<category>[] = [
    {
      header: "image",
      cell: ({row}) => {
          const category = row.original;
          return (
            <div className="aspect-square w-20 overflow-hidden relative">
              <MediaReader
                media={category.image}
              />
            </div>
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