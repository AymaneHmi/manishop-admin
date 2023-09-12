'use client';

import { columns } from "./order-columns";
import { DataTable } from "@/components/data-table";
import { order } from "@/lib/types";

interface OrdersProps {
    orders: order[];
}

const Orders = ({orders}: OrdersProps) => {

    return (
        <>
            <DataTable filterLabel="products" columns={columns} data={orders} />
        </>
    )
}

export default Orders;