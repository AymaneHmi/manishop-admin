'use client';

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Products from "./Products";
import { Separator } from "@/components/ui/separator";
import useModal from "@/hooks/use-modal";
import getProducts from "@/actions/get-products";

const ProductsPage = () => {
    const {onOpen} = useModal();
    const {products} = getProducts();

    const handleCreateProduct = () => {
        onOpen("createProduct");
    }
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <Heading
                    title={`Products (${products?.length})`}
                    subtitle="Manage your store products."
                />
                <Button className="w-fit" onClick={handleCreateProduct}>
                    Add a product
                </Button>
            </div>
            <Separator />
            <Products />
        </section>
    )
}

export default ProductsPage;