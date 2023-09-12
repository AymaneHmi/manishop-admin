import { useRequest } from "@/hooks/use-request";
import { storeInfo } from "@/lib/types";
import { useEffect, useState } from "react";

export function getStoreInfo () {
    const [info, setInfo] = useState<storeInfo>({
        totalRevenue: 0,
        sales: 0,
        products: 0,
    })

    useEffect(() => {
        const fetchInfo = async () => {
            const responseData = await useRequest.post({}, '/store/info.php');
            if(responseData.error) return;
            setInfo(responseData)
        }
        fetchInfo();
    },[])

    return info;
}