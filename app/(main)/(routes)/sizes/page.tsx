'use client';

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useModal from "@/hooks/use-modal";
import { useData } from "@/providers/data";
import Sizes from "./Sizes";

const sizesPage = () => {
    const {onOpen} = useModal()
    const {sizes} = useData()!;

    const handleCreateSize = () => {
        onOpen("createSize")
    }
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <Heading
                    title={`Sizes (${sizes?.length})`}
                    subtitle="Manage your products Sizes."
                />
                <Button className="w-fit" onClick={handleCreateSize}>
                    Add a Size
                </Button>
            </div>
            <Separator />
            <Sizes />
        </section>
    )
}

export default sizesPage;