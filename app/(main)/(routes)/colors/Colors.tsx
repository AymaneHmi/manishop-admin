'use client';

import { useData } from "@/providers/data";
import { columns } from "./color-columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/EmptyState";

const Colors = () => {
    const {colors, isLoadingColors, errorColors} = useData();

    if(isLoadingColors) {
        return <div className="w-full flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    }

    if(errorColors) {
        return <div className="w-full flex flex-col items-center my-4">
            <EmptyState
                title="Ups!! Something Went wrong!"
                subtitle={`Error Accured:` + errorColors}
            />
        </div>
    }
    return (
        <>
            <DataTable filterLabel="name" columns={columns} data={colors} />
        </>
    )
}

export default Colors;