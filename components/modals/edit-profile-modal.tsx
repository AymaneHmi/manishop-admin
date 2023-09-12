'use client';

import { useState } from "react";

import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import Loader from "../ui/loader";
import Avatar from "../Avatar";

const EditProfileModal = () => {
    const {isOpen, onClose, type, data} = useModal();

    const router = useRouter();

    const isOpenModal = isOpen && type === "editProfile";
    const [isLoading, setIsLoading] = useState(false)

    const body = (
        <>
            <Avatar imageSrc={data?.imageSrc} />
        </>
    )

    const label = (
        <>
            Save
            <Loader
                isLoading={isLoading}
                size={15}
            />
        </>
    )

    return (
        <Modal 
            isOpen={isOpenModal}
            onClose={onClose}
            onSubmit={() => {}}
            body={body}
            title="Edit profile"
            label={label}
        />
    )
}

export default EditProfileModal;