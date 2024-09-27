'use client';

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useModal from "@/hooks/use-modal";
import Discounts from "./Discounts";
import getDiscounts from "@/actions/get-discounts";

const DiscountsPage = () => {
    const {onOpen} = useModal()
    const {discounts} = getDiscounts();

    const handleCreateDiscount = () => {
        onOpen("createDiscount")
    }
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <Heading
                    title={`Discounts (${discounts?.length})`}
                    subtitle="Manage your products discounts."
                />
                <Button className="w-fit" onClick={handleCreateDiscount}>
                    Add a Discount
                </Button>
            </div>
            <Separator />
            <Discounts />
        </section>
    )
}

export default DiscountsPage;