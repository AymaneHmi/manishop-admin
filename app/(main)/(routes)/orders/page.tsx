'use client';

import Heading from "@/components/Heading";
import Orders from "./Orders";
import { Separator } from "@/components/ui/separator";
import { useData } from "@/providers/data";

const ordersPage = () => {
    const {orders} = useData();

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

export default ordersPage;