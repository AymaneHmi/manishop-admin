'use client';

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/EmptyState";
import { category } from "@/lib/types";
import getCategories from "@/actions/get-categories";

const Categories = () => {
    const {categories, isLoading, error} = getCategories();

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
            <DataTable filterLabel="name" columns={columns} data={categories as category[]} />
        </>
    )
}

export default Categories;