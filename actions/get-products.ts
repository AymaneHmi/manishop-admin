"use client"

import axios, { AxiosError } from "axios";
import {format} from 'date-fns';
import { create } from "zustand";
import { useEffect } from "react";
import { API_BASE, ApiToken } from "@/lib/utils";
import { useQuery } from "react-query";
import { product } from "@/lib/types";

interface updateProductsProps {
    reloadProducts: boolean;
    updateProducts: () => void;
}

export const useUpdateProducts = create<updateProductsProps>((set) => ({
    reloadProducts: false,
    updateProducts: () => set((state) => ({ reloadProducts: !state.reloadProducts })),
}))

export default function getProducts () {
    const {reloadProducts} = useUpdateProducts();

    const fetchProducts = async () => {
        const res = await axios.post(`${API_BASE}/private/products`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: encodeURIComponent(ApiToken),
            }
        })
        return res.data;
    }

    const {data: resData, isLoading, error, refetch} = useQuery<product[] | [], AxiosError>({
        queryKey: ['Products'],
        queryFn: () => fetchProducts(),
    })
    
    const products = resData && resData.length > 0 && resData.map((item: product) => {
        const formattedCreatedAt = item?.createdAt && format(new Date(item.createdAt), "PPP") as string;
        return {
            ...item,
            createdAt: formattedCreatedAt,
        }
    }) || [];

    useEffect(() => {
        refetch();
    },[reloadProducts])

    return {products, isLoading, error}
}