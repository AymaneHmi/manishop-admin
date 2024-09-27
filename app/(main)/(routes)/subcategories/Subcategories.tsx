'use client';

import getSubcategories from "@/actions/get-subcategories";
import { columns } from "./sub-columns";
import { DataTable } from "@/components/data-table";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/ui/loader";
import { subcategory } from "@/lib/types";

const Subcategories = () => {

    const {subcategories, isLoading, error} = getSubcategories();

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
            <DataTable filterLabel="name" columns={columns} data={subcategories as subcategory[]} />
        </>
    )
}

export default Subcategories;