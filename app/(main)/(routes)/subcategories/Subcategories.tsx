'use client';

import { getSubcategories } from "@/actions/getSubcategories";
import { columns } from "./sub-columns";
import { DataTable } from "@/components/data-table";
import { subcategory } from "@/lib/types";

interface SubcategoriesProps {
    subcategories: subcategory[];
}

const Subcategories = ({subcategories}: SubcategoriesProps) => {
    return (
        <>
            <DataTable filterLabel="name" columns={columns} data={subcategories} />
        </>
    )
}

export default Subcategories;