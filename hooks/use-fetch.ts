import { useEffect } from "react";

import {format} from 'date-fns';
import { blog, category, color, discount, order, product, promocode, size, status, subcategory } from "@/lib/types";
import { useQuery } from "react-query";

const ApiToken: any = process.env.NEXT_PUBLIC_API_TOKEN;

type Data = category | subcategory | size | color | product | status | order | discount | promocode | blog ;

interface useFetchProps {
    api: string;
    keyQuery: string;
    reloadData: boolean;
}

export function useFetch<T extends Data>({api, keyQuery, reloadData}: useFetchProps) {
    const fetchData = async () => {
        const res = await fetch(api, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: encodeURIComponent(ApiToken),
            },
        });
        const data = await res.json();
        return data;
    }
    
    const { data: resData, isLoading, error, refetch } = useQuery<T[] | []>({
        queryKey: keyQuery,
        queryFn: () => fetchData(),
      });

    const data = resData?.map((item: T) => {
        const formattedCreatedAt = format(new Date(item.createdAt), "PPP");
        return {
            ...item,
            createdAt: formattedCreatedAt,
        }
    }) || [];

    useEffect(() => {
        refetch();
    },[reloadData])


    return {data, isLoading, error};
}