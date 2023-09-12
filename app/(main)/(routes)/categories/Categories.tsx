'use client';

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { category } from "@/lib/types";

interface CategoriesProps {
    categories: category[];
}

const Categories = ({categories}: CategoriesProps) => {

    return (
        <>
            <DataTable filterLabel="name" columns={columns} data={categories} />
        </>
    )
}

export default Categories;