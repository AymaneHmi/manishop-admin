'use client';

import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { Label } from "../ui/label";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { useEffect } from "react";

const ViewBlogModal = () => {
    const {isOpen, onOpen, onClose, type, data} = useModal();
    const isOpenModal = isOpen && type === "viewBlog"

    useEffect(() => {
        console.log(data?.blog)
    },[data?.blog])

    const body = (<>
        <Label>Media</Label>
        <div className="flex flex-wrap gap-2">
            <div className="h-32 w-44 rounded relative overflow-hidden">
                <Image
                    src={data?.blog?.image!}
                    alt={data?.product?.title!}
                    fill
                    className="object-cover"
                    />
            </div>
        </div>
        <Label>Published At</Label>
        <p>{data?.blog?.createdAt.toString()}</p>
        <Label>author</Label>
        <p>{data?.blog?.author}</p>
        <Label>title</Label>
        <h2 className="font-bold">{data?.blog?.title}</h2>
        <Label>Description</Label>
        <div className="text-xs" dangerouslySetInnerHTML={{ __html: data?.blog?.description!}}></div>
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
            {data?.blog?.tags?.map(tag => (
                <Badge variant={"outline"} key={tag}>{tag}</Badge>
            ))}
        </div>
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="View Blog"
            label="Edit"
            onSubmit={() => onOpen("editBlog", {blog: data?.blog})}
            body={body}
        />
    )
}

export default ViewBlogModal;