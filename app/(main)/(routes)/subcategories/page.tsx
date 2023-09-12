'use client';

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Subcategories from "./Subcategories";
import { Separator } from "@/components/ui/separator";
import { getSubcategories } from "@/actions/getSubcategories";
import useModal from "@/hooks/use-modal";

const subcategoriesPage = () => {
    const {onOpen} = useModal()
    const subcategories = getSubcategories();

    const handleCreateSubcategory = () => {
        onOpen("createSubcategory")
    }
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <Heading
                    title={`Subcategories (${subcategories?.length})`}
                    subtitle="Manage your products subcategories."
                />
                <Button className="w-fit" onClick={handleCreateSubcategory}>
                    Create a subcategory
                </Button>
            </div>
            <Separator />
            <Subcategories subcategories={subcategories} />
        </section>
    )
}

export default subcategoriesPage;