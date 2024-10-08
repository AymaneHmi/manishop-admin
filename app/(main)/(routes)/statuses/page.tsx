'use client';

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useModal from "@/hooks/use-modal";
import Statuses from "./Statuses";
import getStatuses from "@/actions/get-statuses";

const StatusesPage = () => {
    const {onOpen} = useModal()
    const {statuses} = getStatuses();

    const handleCreateStatus = () => {
        onOpen("createStatus")
    }
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <Heading
                    title={`Statuses (${statuses?.length})`}
                    subtitle="Manage your orders status."
                />
                <Button className="w-fit" onClick={handleCreateStatus}>
                    Add a Status
                </Button>
            </div>
            <Separator />
            <Statuses />
        </section>
    )
}

export default StatusesPage;