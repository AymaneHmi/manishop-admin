"use client"

import axios, { AxiosError } from "axios";
import {format} from 'date-fns';
import { create } from "zustand";
import { useEffect } from "react";
import { API_BASE, ApiToken } from "@/lib/utils";
import { useQuery } from "react-query";
import { discount } from "@/lib/types";

interface updateDiscountsProps {
    reloadDiscounts: boolean;
    updateDiscounts: () => void;
}

export const useUpdateDiscounts = create<updateDiscountsProps>((set) => ({
    reloadDiscounts: false,
    updateDiscounts: () => set((state) => ({ reloadDiscounts: !state.reloadDiscounts })),
}))

export default function getDiscounts () {
    const {reloadDiscounts} = useUpdateDiscounts();

    const fetchDiscounts = async () => {
        const res = await axios.post(`${API_BASE}/discounts`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: encodeURIComponent(ApiToken),
            }
        })
        return res.data;
    }

    const {data: resData, isLoading, error, refetch} = useQuery<discount[] | [], AxiosError>({
        queryKey: ['discounts'],
        queryFn: () => fetchDiscounts(),
    })
    
    const discounts = resData && resData.length > 0 && resData.map((item: discount) => {
        const formattedCreatedAt = item?.createdAt && format(new Date(item.createdAt), "PPP") as string;
        return {
            ...item,
            createdAt: formattedCreatedAt,
        }
    }) || [];

    useEffect(() => {
        refetch();
    },[reloadDiscounts])

    return {discounts, isLoading, error}
}