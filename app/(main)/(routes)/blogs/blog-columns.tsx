'use client';

import { blog } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table"

import CellAction from "./blog-cell-action";
import { useMinimize } from "@/hooks/use-minimize";

export const columns: ColumnDef<blog>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
      header: "Description",
      cell: ({row}) => {
        const blog = row.original;
        return (
          <div className="text-xs" dangerouslySetInnerHTML={{ __html: useMinimize(blog.description, 100) }}></div>
        )
      }
  },
  {
    accessorKey: "author",
    header: "Author",
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