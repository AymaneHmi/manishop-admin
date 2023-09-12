'use client';

// import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Categories from "./Categories";
import { getCategories } from "@/actions/getCategories";
import { Separator } from "@/components/ui/separator";
import useModal from "@/hooks/use-modal";

const categoriesPage = () => {
    const {onOpen} = useModal();
    const categories = getCategories();

    const handleCreateCategory = () => {
        onOpen("createCategory");
    }
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <Heading
                    title={`Categories (${categories?.length})`}
                    subtitle="Manage your products categories."
                />
                <Button className="w-fit" onClick={handleCreateCategory}>
                    Create a category
                </Button>
            </div>
            <Separator />
            <Categories categories={categories} />
        </section>
    )
}

export default categoriesPage;