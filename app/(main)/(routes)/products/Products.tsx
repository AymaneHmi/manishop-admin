'use client';

import { useData } from "@/providers/data";
import { columns } from "./product-columns";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/EmptyState";


const Products = () => {

    const {products, isLoadingProducts, errorProducts} = useData();

    if(isLoadingProducts) {
        return <div className="w-full flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    }

    if(errorProducts) {
        return <div className="w-full flex flex-col items-center my-4">
            <EmptyState
                title="Ups!! Something Went wrong!"
                subtitle={`Error Accured:` + errorProducts}
            />
        </div>
    }

    return (
        <>
            <DataTable filterLabel="title" columns={columns} data={products} />
        </>
    )
}

export default Products;