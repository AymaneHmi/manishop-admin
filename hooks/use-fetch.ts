import { useCallback, useEffect, useState } from "react";

import {format} from 'date-fns';
import { blog, category, order, product, storeInfo, subcategory } from "@/lib/types";

const ApiToken: any = process.env.NEXT_PUBLIC_API_TOKEN;

type Data = category | subcategory | product | order | blog ;

export function useFetch<T extends Data>(api: string) {
    const [data , setData] = useState<T[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: encodeURIComponent(ApiToken),
                },
            });
            const data = await res.json();
            if(data.error){
                setData([])
            }
            const formattedData = data.map((item: T) => {
                const formattedCreatedAt = format(new Date(item.createdAt), 'MMMM dd, yyyy');
                return {
                    ...item,
                    createdAt: formattedCreatedAt,
                }
            });
            setData(formattedData);
        } catch (err) {
            setData([]);
            return;
        }
    },[])

    useEffect(() => {
        fetchData();
    },[])


    return data;
}