'use client';

import { useData } from "@/providers/data";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/EmptyState";

const Categories = () => {
    const {categories, isLoadingCategories, errorCategories} = useData();

    if(isLoadingCategories) {
        return <div className="w-full flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    }

    if(errorCategories) {
        return <div className="w-full flex flex-col items-center my-4">
            <EmptyState
                title="Ups!! Something Went wrong!"
                subtitle={`Error Accured:` + errorCategories}
            />
        </div>
    }

    return (
        <>
            <DataTable filterLabel="name" columns={columns} data={categories} />
        </>
    )
}

export default Categories;