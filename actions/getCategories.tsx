import { category } from "@/lib/types";
import { useFetch } from "@/hooks/use-fetch";

const categoriesAPI: any = process.env.NEXT_PUBLIC_CATEGORIES_API;

export function getCategories () {
    const categories = useFetch<category>(categoriesAPI);
    return categories;
}