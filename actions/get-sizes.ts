"use client"

import axios, { AxiosError } from "axios";
import {format} from 'date-fns';
import { create } from "zustand";
import { useEffect } from "react";
import { API_BASE, ApiToken } from "@/lib/utils";
import { useQuery } from "react-query";
import { size } from "@/lib/types";

interface updateSizesProps {
    reloadSizes: boolean;
    updateSizes: () => void;
}

export const useUpdateSizes = create<updateSizesProps>((set) => ({
    reloadSizes: false,
    updateSizes: () => set((state) => ({ reloadSizes: !state.reloadSizes })),
}))

export default function getSizes () {
    const {reloadSizes} = useUpdateSizes();

    const fetchSizes = async () => {
        const res = await axios.post(`${API_BASE}/sizes`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: encodeURIComponent(ApiToken),
            }
        })
        return res.data;
    }

    const {data: resData, isLoading, error, refetch} = useQuery<size[] | [], AxiosError>({
        queryKey: ['sizes'],
        queryFn: () => fetchSizes(),
    })
    
    const sizes = resData && resData.length > 0 && resData.map((item: size) => {
        const formattedCreatedAt = item?.createdAt && format(new Date(item.createdAt), "PPP") as string;
        return {
            ...item,
            createdAt: formattedCreatedAt,
        }
    }) || [];

    useEffect(() => {
        refetch();
    },[reloadSizes])

    return {sizes, isLoading, error}
}