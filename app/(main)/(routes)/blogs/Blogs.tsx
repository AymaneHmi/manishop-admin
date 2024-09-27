'use client';

import EmptyState from "@/components/EmptyState";
import { columns } from "./blog-columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import { blog } from "@/lib/types";
import getBlogs from "@/actions/get-blogs";

const Blogs = () => {

    const {blogs, isLoading, error} = getBlogs();
   
    if(isLoading) {
        return <div className="w-full flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    }

    if(error) {
        return <div className="w-full flex flex-col items-center my-4">
            <EmptyState
                title="Ups!! Something Went wrong!"
                subtitle={`Error Accured:` + error}
            />
        </div>
    }

    return (
        <>
            <DataTable filterLabel="title" columns={columns} data={blogs as blog[]} />
        </>
    )
}

export default Blogs;