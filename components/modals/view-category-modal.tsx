'use client';

import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { Label } from "../ui/label";
import Image from "next/image";


const ViewCategoryModal = () => {
    const {isOpen, onOpen, onClose, type, data} = useModal();
    const isOpenModal = isOpen && type === "viewCategory"

    const body = (<>
        <Label htmlFor="media">Media</Label>
        <div className="flex flex-wrap gap-2">
            {data?.category?.image?.map((file, index) => (
                <div className="h-32 w-44 rounded relative overflow-hidden" key={index}>
                    <Image
                        src={file}
                        alt={data?.category?.name!}
                        fill
                        className="object-cover"
                        />
                </div>
            ))}
        </div>
        <Label>Published At</Label>
        <p>{data?.category?.createdAt.toString()}</p>
        <Label htmlFor="title">Title</Label>
        <h2 className="font-bold">{data?.category?.name}</h2>
        <Label htmlFor="description">Description</Label>
        <p>{data?.category?.description}</p>
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="View Category"
            label="Edit"
            onSubmit={() => onOpen("editCategory", {category: data?.category})}
            body={body}
        />
    )
}

export default ViewCategoryModal;