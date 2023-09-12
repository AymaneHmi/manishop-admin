'use client';

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Products from "./Products";
import { Separator } from "@/components/ui/separator";
import { getProducts } from "@/actions/getProducts";
import useModal from "@/hooks/use-modal";

const productsPage = () => {
    const {onOpen} = useModal();
    const products = getProducts();

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
                    Create a product
                </Button>
            </div>
            <Separator />
            <Products
                products={products}
            />
        </section>
    )
}

export default productsPage;