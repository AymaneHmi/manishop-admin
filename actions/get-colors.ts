"use client"

import axios, { AxiosError } from "axios";
import {format} from 'date-fns';
import { create } from "zustand";
import { useEffect } from "react";
import { API_BASE, ApiToken } from "@/lib/utils";
import { useQuery } from "react-query";
import { color } from "@/lib/types";

interface updateColorsProps {
    reloadColors: boolean;
    updateColors: () => void;
}

export const useUpdateColors = create<updateColorsProps>((set) => ({
    reloadColors: false,
    updateColors: () => set((state) => ({ reloadColors: !state.reloadColors })),
}))

export default function getColors () {
    const {reloadColors} = useUpdateColors();

    const fetchColors = async () => {
        const res = await axios.post(`${API_BASE}/colors`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: encodeURIComponent(ApiToken),
            }
        })
        return res.data;
    }

    const {data: resData, isLoading, error, refetch} = useQuery<color[] | [], AxiosError>({
        queryKey: ['Colors'],
        queryFn: () => fetchColors(),
    })
    
    const colors = resData && resData.length > 0 && resData.map((item: color) => {
        const formattedCreatedAt = item?.createdAt && format(new Date(item.createdAt), "PPP") as string;
        return {
            ...item,
            createdAt: formattedCreatedAt,
        }
    }) || [];

    useEffect(() => {
        refetch();
    },[reloadColors])

    return {colors, isLoading, error}
}