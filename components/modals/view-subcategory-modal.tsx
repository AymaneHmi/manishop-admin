'use client';

import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";



interface InputsProps {
    title: string;
    categoryId: string;
    sizes: string[];
}

const ViewSubcategoryModal = () => {
    const {isOpen, onOpen, onClose, type, data} = useModal();
    const isOpenModal = isOpen && type === "viewSubcategory"

    const body = (<>
        <Label>Title</Label>
        <h2 className="font-bold">{data?.subcategory?.name}</h2>
        <Label>Category</Label>
        <span>{data?.subcategory?.category}</span>
        <Label>Created At</Label>
        <span>{data?.subcategory?.createdAt?.toString()}</span>
        <Label>Sizes</Label>
        <div className="flex flex-wrap gap-2">
            {data?.subcategory?.sizes?.map(size => (
                <Badge variant={'outline'} key={size}>{size}</Badge>
            ))}
        </div>
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="View Subcategory"
            label="Edit"
            onSubmit={() => onOpen("editSubcategory", {subcategory: data?.subcategory})}
            body={body}
        />
    )
}

export default ViewSubcategoryModal;