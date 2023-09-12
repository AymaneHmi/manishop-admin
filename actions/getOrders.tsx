import { order } from "@/lib/types";
import { useFetch } from "@/hooks/use-fetch";

const ordersAPI: any = process.env.NEXT_PUBLIC_ORDERS_API;

export function getOrders () {
    const orders = useFetch<order>(ordersAPI);
    return orders;
}