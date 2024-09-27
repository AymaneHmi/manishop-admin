"use client"

import axios, { AxiosError } from "axios";
import {format} from 'date-fns';
import { create } from "zustand";
import { useEffect } from "react";
import { API_BASE, ApiToken } from "@/lib/utils";
import { useQuery } from "react-query";
import { blog } from "@/lib/types";

interface updateBlogsProps {
    reloadBlogs: boolean;
    updateBlogs: () => void;
}

export const useUpdateBlogs = create<updateBlogsProps>((set) => ({
    reloadBlogs: false,
    updateBlogs: () => set((state) => ({ reloadBlogs: !state.reloadBlogs })),
}))

export default function getBlogs () {
    const {reloadBlogs} = useUpdateBlogs();

    const fetchBlogs = async () => {
        const res = await axios.post(`${API_BASE}/blogs`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: encodeURIComponent(ApiToken),
            }
        })
        return res.data;
    }

    const {data: resData, isLoading, error, refetch} = useQuery<blog[] | [], AxiosError>({
        queryKey: ['blogs'],
        queryFn: () => fetchBlogs(),
    })
    
    const blogs = resData && resData.length > 0 && resData.map((item: blog) => {
        const formattedCreatedAt = item?.createdAt && format(new Date(item.createdAt), "PPP") as string;
        return {
            ...item,
            createdAt: formattedCreatedAt,
        }
    }) || [];

    useEffect(() => {
        refetch();
    },[reloadBlogs])

    return {blogs, isLoading, error}
}