"use client"

import axios, { AxiosError } from "axios";
import {format} from 'date-fns';
import { create } from "zustand";
import { useEffect } from "react";
import { API_BASE, ApiToken } from "@/lib/utils";
import { useQuery } from "react-query";
import { order } from "@/lib/types";

interface updateOrdersProps {
    reloadOrders: boolean;
    updateOrders: () => void;
}

export const useUpdateOrders = create<updateOrdersProps>((set) => ({
    reloadOrders: false,
    updateOrders: () => set((state) => ({ reloadOrders: !state.reloadOrders })),
}))

export default function getOrders () {
    const {reloadOrders} = useUpdateOrders();

    const fetchOrders = async () => {
        const res = await axios.post(`${API_BASE}/orders`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: encodeURIComponent(ApiToken),
            }
        })
        return res.data;
    }

    const {data: resData, isLoading, error, refetch} = useQuery<order[] | [], AxiosError>({
        queryKey: ['orders'],
        queryFn: () => fetchOrders(),
    })
    
    const orders = resData && resData.length > 0 && resData.map((item: order) => {
        const formattedCreatedAt = item?.createdAt && format(new Date(item.createdAt), "PPP") as string;
        return {
            ...item,
            createdAt: formattedCreatedAt,
        }
    }) || [];

    useEffect(() => {
        refetch();
    },[reloadOrders])

    return {orders, isLoading, error}
}