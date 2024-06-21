'use client';

import { useData } from "@/providers/data";
import { columns } from "./discount-columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/EmptyState";

const Discounts = () => {
    const {discounts, isLoadingDiscounts, errorDiscounts} = useData();

    if(isLoadingDiscounts) {
        return <div className="w-full flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    }

    if(errorDiscounts) {
        return <div className="w-full flex flex-col items-center my-4">
            <EmptyState
                title="Ups!! Something Went wrong!"
                subtitle={`Error Accured:` + errorDiscounts}
            />
        </div>
    }
    return (
        <>
            <DataTable filterLabel="name" columns={columns} data={discounts} />
        </>
    )
}

export default Discounts;