'use client';

import { useData } from "@/providers/data";
import { columns } from "./status-columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/EmptyState";

const Statuses = () => {
    const {statuses, isLoadingStatuses, errorStatuses} = useData();

    if(isLoadingStatuses) {
        return <div className="w-full flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    }

    if(errorStatuses) {
        return <div className="w-full flex flex-col items-center my-4">
            <EmptyState
                title="Ups!! Something Went wrong!"
                subtitle={`Error Accured:` + errorStatuses}
            />
        </div>
    }
    return (
        <>
            <DataTable filterLabel="name" columns={columns} data={statuses} />
        </>
    )
}

export default Statuses;