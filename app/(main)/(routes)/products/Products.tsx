'use client';

import { columns } from "./product-columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/EmptyState";
import { product } from "@/lib/types";
import getProducts from "@/actions/get-products";


const Products = () => {

    const {products, isLoading, error} = getProducts();

    if(isLoading) {
        return <div className="w-full flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    }

    if(error) {
        return <div className="w-full flex flex-col items-center my-4">
            <EmptyState
                title="Ups!! Something Went wrong!"
                subtitle={`Error Accured:` + error}
            />
        </div>
    }

    return (
        <>
            <DataTable filterLabel="title" columns={columns} data={products as product[]} />
        </>
    )
}

export default Products;