'use client';

import { useData } from "@/providers/data";
import { columns } from "./sub-columns";
import { DataTable } from "@/components/data-table";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/ui/loader";

const Subcategories = () => {

    const {subcategories, isLoadingSubcategories, errorSubcategories} = useData();

    if(isLoadingSubcategories) {
        return <div className="w-full flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    }

    if(errorSubcategories) {
        return <div className="w-full flex flex-col items-center my-4">
            <EmptyState
                title="Ups!! Something Went wrong!"
                subtitle={`Error Accured:` + errorSubcategories}
            />
        </div>
    }

    return (
        <>
            <DataTable filterLabel="name" columns={columns} data={subcategories} />
        </>
    )
}

export default Subcategories;