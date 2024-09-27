"use client"

import axios, { AxiosError } from "axios";
import {format} from 'date-fns';
import { create } from "zustand";
import { useEffect } from "react";
import { API_BASE, ApiToken } from "@/lib/utils";
import { useQuery } from "react-query";
import { promocode } from "@/lib/types";

interface updatePromocodesProps {
    reloadPromocodes: boolean;
    updatePromocodes: () => void;
}

export const useUpdatePromocodes = create<updatePromocodesProps>((set) => ({
    reloadPromocodes: false,
    updatePromocodes: () => set((state) => ({ reloadPromocodes: !state.reloadPromocodes })),
}))

export default function getPromocodes () {
    const {reloadPromocodes} = useUpdatePromocodes();

    const fetchPromocodes = async () => {
        const res = await axios.post(`${API_BASE}/promocodes`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: encodeURIComponent(ApiToken),
            }
        })
        return res.data;
    }

    const {data: resData, isLoading, error, refetch} = useQuery<promocode[] | [], AxiosError>({
        queryKey: ['promocodes'],
        queryFn: () => fetchPromocodes(),
    })
    
    const promocodes = resData && resData.length > 0 && resData.map((item: promocode) => {
        const formattedCreatedAt = item?.createdAt && format(new Date(item.createdAt), "PPP") as string;
        return {
            ...item,
            createdAt: formattedCreatedAt,
        }
    }) || [];

    useEffect(() => {
        refetch();
    },[reloadPromocodes])

    return {promocodes, isLoading, error}
}