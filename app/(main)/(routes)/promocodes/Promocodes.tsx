'use client';

import { useData } from "@/providers/data";
import { columns } from "./promocode-columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/EmptyState";

const Promocodes = () => {
    const {promocodes, isLoadingPromocodes, errorPromocodes} = useData();

    if(isLoadingPromocodes) {
        return <div className="w-full flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    }

    if(errorPromocodes) {
        return <div className="w-full flex flex-col items-center my-4">
            <EmptyState
                title="Ups!! Something Went wrong!"
                subtitle={`Error Accured:` + errorPromocodes}
            />
        </div>
    }
    return (
        <>
            <DataTable filterLabel="name" columns={columns} data={promocodes} />
        </>
    )
}

export default Promocodes;