'use client';

import Heading from "@/components/Heading";
import Orders from "./Orders";
import { Separator } from "@/components/ui/separator";
import getOrders from "@/actions/get-orders";

const OrdersPage = () => {
    const {orders} = getOrders();

    return (
        <section className="flex flex-col gap-4">
            <Heading
                title={`Orders (${orders?.length})`}
                subtitle="See your clients orders."
            />
            <Separator />
            <Orders />
        </section>
    )
}

export default OrdersPage;