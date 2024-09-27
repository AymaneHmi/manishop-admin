'use client';

import { columns } from "./order-columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/EmptyState";
import { order } from "@/lib/types";
import getOrders from "@/actions/get-orders";

const Orders = () => {

    const {orders, isLoading, error} = getOrders();

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
            <DataTable filterLabel="orderProducts" columns={columns} data={orders as order[]} />
        </>
    )
}

export default Orders;