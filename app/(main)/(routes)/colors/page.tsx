'use client';

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useModal from "@/hooks/use-modal";
import Colors from "./Colors";
import getColors from "@/actions/get-colors";

const ColorsPage = () => {
    const {onOpen} = useModal()
    const {colors} = getColors();

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

export default ColorsPage;