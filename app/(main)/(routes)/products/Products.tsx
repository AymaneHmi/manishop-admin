'use client';

import { getProducts } from "@/actions/getProducts";
import { columns } from "./product-columns";
import { DataTable } from "@/components/data-table";
import { product } from "@/lib/types";

interface ProductsProps {
    products: product[];
}

const Products: React.FC<ProductsProps> = ({products}) => {

    return (
        <>
            <DataTable filterLabel="title" columns={columns} data={products} />
        </>
    )
}

export default Products;