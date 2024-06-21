import { storeInfo } from "@/lib/types";
import axios from "axios";
import { useQuery } from "react-query";

const endPoint = process.env.NEXT_PUBLIC_API + '/store'

export function getStoreInfo () {
    const fetchStoreStatistics = async () => {
        const res = await axios.get(endPoint)
        return res.data
    }

    const {data, isLoading, error} = useQuery<storeInfo>("storeStatistics", () => fetchStoreStatistics())

    return {data, isLoading, error};
}