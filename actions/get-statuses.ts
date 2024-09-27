"use client"

import axios, { AxiosError } from "axios";
import {format} from 'date-fns';
import { create } from "zustand";
import { useEffect } from "react";
import { API_BASE, ApiToken } from "@/lib/utils";
import { useQuery } from "react-query";
import { status } from "@/lib/types";

interface updateStatusesProps {
    reloadStatuses: boolean;
    updateStatuses: () => void;
}

export const useUpdateStatuses = create<updateStatusesProps>((set) => ({
    reloadStatuses: false,
    updateStatuses: () => set((state) => ({ reloadStatuses: !state.reloadStatuses })),
}))

export default function getStatuses () {
    const {reloadStatuses} = useUpdateStatuses();

    const fetchStatuses = async () => {
        const res = await axios.post(`${API_BASE}/statuses`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: encodeURIComponent(ApiToken),
            }
        })
        return res.data;
    }

    const {data: resData, isLoading, error, refetch} = useQuery<status[] | [], AxiosError>({
        queryKey: ['statuses'],
        queryFn: () => fetchStatuses(),
    })
    
    const statuses = resData && resData.length > 0 && resData.map((item: status) => {
        const formattedCreatedAt = item?.createdAt && format(new Date(item.createdAt), "PPP") as string;
        return {
            ...item,
            createdAt: formattedCreatedAt,
        }
    }) || [];

    useEffect(() => {
        refetch();
    },[reloadStatuses])

    return {statuses, isLoading, error}
}