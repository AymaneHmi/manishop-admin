"use client"

import axios, { AxiosError } from "axios";
import {format} from 'date-fns';
import { create } from "zustand";
import { useEffect } from "react";
import { API_BASE, ApiToken } from "@/lib/utils";
import { useQuery } from "react-query";
import { category } from "@/lib/types";

interface updateCategoriesProps {
    reloadCategories: boolean;
    updateCategories: () => void;
}

export const useUpdateCategories = create<updateCategoriesProps>((set) => ({
    reloadCategories: false,
    updateCategories: () => set((state) => ({ reloadCategories: !state.reloadCategories })),
}))

export default function getCategories () {
    const {reloadCategories} = useUpdateCategories();

    const fetchCategories = async () => {
        const res = await axios.post(`${API_BASE}/categories`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: encodeURIComponent(ApiToken),
            }
        })
        return res.data;
    }

    const {data: resData, isLoading, error, refetch} = useQuery<category[] | [], AxiosError>({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(),
    })
    
    const categories = resData && resData.length > 0 && resData.map((item: category) => {
        const formattedCreatedAt = item?.createdAt && format(new Date(item.createdAt), "PPP") as string;
        return {
            ...item,
            createdAt: formattedCreatedAt,
        }
    }) || [];

    useEffect(() => {
        refetch();
    },[reloadCategories])

    return {categories, isLoading, error}
}