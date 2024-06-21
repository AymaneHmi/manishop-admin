'use client';

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useModal from "@/hooks/use-modal";
import { useData } from "@/providers/data";
import Colors from "./Colors";

const colorsPage = () => {
    const {onOpen} = useModal()
    const {colors} = useData();

    const handleCreateColor = () => {
        onOpen("createColor")
    }
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <Heading
                    title={`Colors (${colors?.length})`}
                    subtitle="Manage your products Colors."
                />
                <Button className="w-fit" onClick={handleCreateColor}>
                    Add a Color
                </Button>
            </div>
            <Separator />
            <Colors />
        </section>
    )
}

export default colorsPage;