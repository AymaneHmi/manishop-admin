'use client';

import { MoreHorizontal, PenSquare, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { status } from "@/lib/types";
import useModal from "@/hooks/use-modal";
import { useUpdateStatuses } from "@/actions/get-statuses";

const endPoint = process.env.NEXT_PUBLIC_API + '/statuses/status';

interface CellActionProps {
    data: status;
}

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const {onOpen} = useModal();
    const {updateStatuses} = useUpdateStatuses();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onOpen("editStatus", {status: data})} className="space-x-2"><PenSquare size={15} /> <span>Edit</span></DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onOpen("alertModal", {itemId: data.id, endPoint, reload: updateStatuses})} className="space-x-2"><Trash size={15} /> <span>Delete</span></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellAction;