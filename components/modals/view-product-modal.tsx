'use client';

import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import Gallery from "../gallery";
import { Skeleton } from "../ui/skeleton";

const ViewProductModal = () => {
    const {isOpen, onOpen, onClose, type, data} = useModal();
    const isOpenModal = isOpen && type === "viewProduct"

    const body = (
        <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-[35vh] w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-full h-[35vh]">
                    <Gallery
                        media={data?.product?.media || []}
                    />
                </div>
                <h2 className="text-sm lg:text-md font-bold capitalize text-gray-800 line-clamp-2">{data?.product?.title}</h2>
                <h2 className="font-bold text-lg md:text-2xl">${data?.product?.price}</h2>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-[35vh] w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-6 w-1/2" />
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="View Product"
            label="Edit"
            onSubmit={() => onOpen("editProduct", {product: data?.product})}
            body={body}
        />
    )
}

export default ViewProductModal;