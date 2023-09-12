import { product } from "@/lib/types";
import { useFetch } from "@/hooks/use-fetch";

const productsAPI: any = process.env.NEXT_PUBLIC_PRODUCTS_API;

export function getProducts () {
    const products = useFetch<product>(productsAPI);
    // const test = useQuery
    return products;
}