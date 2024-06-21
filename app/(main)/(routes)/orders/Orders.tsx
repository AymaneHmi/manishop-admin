'use client';

import { useData } from "@/providers/data";
import { columns } from "./order-columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/EmptyState";

const Orders = () => {

    const {orders, isLoadingOrders, errorOrders} = useData();

    if(isLoadingOrders) {
        return <div className="w-full flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    }

    if(errorOrders) {
        return <div className="w-full flex flex-col items-center my-4">
            <EmptyState
                title="Ups!! Something Went wrong!"
                subtitle={`Error Accured:` + errorOrders}
            />
        </div>
    }

    return (
        <>
            <DataTable filterLabel="orderProducts" columns={columns} data={orders} />
        </>
    )
}

export default Orders;