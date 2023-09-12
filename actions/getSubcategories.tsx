import { subcategory } from "@/lib/types";
import { useFetch } from "@/hooks/use-fetch";

const subcategoriesAPI: any = process.env.NEXT_PUBLIC_SUBCATEGORIES_API;

export function getSubcategories () {
    const subcategory = useFetch<subcategory>(subcategoriesAPI);
    return subcategory;
}