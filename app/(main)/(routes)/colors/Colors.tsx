'use client';

import { columns } from "./color-columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/EmptyState";
import { color } from "@/lib/types";
import getColors from "@/actions/get-colors";

const Colors = () => {
    const {colors, isLoading, error} = getColors();

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
            <DataTable filterLabel="name" columns={columns} data={colors as color[]} />
        </>
    )
}

export default Colors;