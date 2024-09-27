'use client';

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useModal from "@/hooks/use-modal";
import Promocodes from "./Promocodes";
import getPromocodes from "@/actions/get-promocodes";

const PromocodesPage = () => {
    const {onOpen} = useModal()
    const {promocodes} = getPromocodes();

    const handleCreatePromocode = () => {
        onOpen("createPromocode")
    }
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <Heading
                    title={`Promocodes (${promocodes?.length})`}
                    subtitle="Manage your store promocodes."
                />
                <Button className="w-fit" onClick={handleCreatePromocode}>
                    Add a Promocode
                </Button>
            </div>
            <Separator />
            <Promocodes />
        </section>
    )
}

export default PromocodesPage;