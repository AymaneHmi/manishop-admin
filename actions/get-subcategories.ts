"use client"

import axios, { AxiosError } from "axios";
import {format} from 'date-fns';
import { create } from "zustand";
import { useEffect } from "react";
import { API_BASE, ApiToken } from "@/lib/utils";
import { useQuery } from "react-query";
import { subcategory } from "@/lib/types";

interface updateSubcategoriesProps {
    reloadSubcategories: boolean;
    updateSubcategories: () => void;
}

export const useUpdateSubcategories = create<updateSubcategoriesProps>((set) => ({
    reloadSubcategories: false,
    updateSubcategories: () => set((state) => ({ reloadSubcategories: !state.reloadSubcategories })),
}))

export default function getSubcategories () {
    const {reloadSubcategories} = useUpdateSubcategories();

    const fetchSubcategories = async () => {
        const res = await axios.post(`${API_BASE}/subcategories`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: encodeURIComponent(ApiToken),
            }
        })
        return res.data;
    }

    const {data: resData, isLoading, error, refetch} = useQuery<subcategory[] | [], AxiosError>({
        queryKey: ['subcategories'],
        queryFn: () => fetchSubcategories(),
    })
    
    const subcategories = resData && resData.length > 0 && resData.map((item: subcategory) => {
        const formattedCreatedAt = item?.createdAt && format(new Date(item.createdAt), "PPP") as string;
        return {
            ...item,
            createdAt: formattedCreatedAt,
        }
    }) || [];

    useEffect(() => {
        refetch();
    },[reloadSubcategories])

    return {subcategories, isLoading, error}
}