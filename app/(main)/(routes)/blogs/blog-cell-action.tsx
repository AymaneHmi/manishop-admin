'use client';

import { Eye, MoreHorizontal, PenSquare, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { blog } from "@/lib/types";
import useModal from "@/hooks/use-modal";

const endPoint = process.env.NEXT_PUBLIC_API + '/blogs/blog'

interface CellActionProps {
    data: blog;
}

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {

    const {onOpen} = useModal();

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
                <DropdownMenuItem onClick={() => onOpen("viewBlog")} className="space-x-2"><Eye size={15} /> <span>View</span></DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOpen('editBlog', {blog: data})} className="space-x-2"><PenSquare size={15} /> <span>Update</span></DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOpen("alertModal", {itemId: data.id, endPoint})} className="space-x-2"><Trash size={15} /> <span>Delete</span></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellAction;