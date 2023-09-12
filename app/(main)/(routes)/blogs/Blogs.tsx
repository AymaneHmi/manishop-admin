'use client';

import { columns } from "./blog-columns";
import { DataTable } from "@/components/data-table";
import { blog } from "@/lib/types";

interface BlogsProps {
    blogs: blog[];
}

const Blogs = ({blogs}: BlogsProps) => {

    return (
        <>
            <DataTable filterLabel="title" columns={columns} data={blogs} />
        </>
    )
}

export default Blogs;