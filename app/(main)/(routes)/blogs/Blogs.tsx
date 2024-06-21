'use client';

import EmptyState from "@/components/EmptyState";
import { columns } from "./blog-columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import { useData } from "@/providers/data";

const Blogs = () => {

    const {blogs, isLoadingBlogs, errorBlogs} = useData();

    if(isLoadingBlogs) {
        return <div className="w-full flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    }

    if(errorBlogs) {
        return <div className="w-full flex flex-col items-center my-4">
            <EmptyState
                title="Ups!! Something Went wrong!"
                subtitle={`Error Accured:` + errorBlogs}
            />
        </div>
    }

    return (
        <>
            <DataTable filterLabel="title" columns={columns} data={blogs} />
        </>
    )
}

export default Blogs;