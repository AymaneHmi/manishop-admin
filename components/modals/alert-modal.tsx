import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import Heading from "../Heading";
import { useState } from "react";
import Loader from "../ui/loader";
import axios from "axios";
import { toast } from "../ui/use-toast";

const AlertModal = () => {
    const {isOpen, onClose, type, data} = useModal();

    const isOpenModal = isOpen && type === "alertModal";
    const [isLoading, setIsLoading] = useState(false)

    const deleteItem = async (e: number | undefined) => {
        setIsLoading(true)
        axios.delete(data.endPoint + '?id=' + e)
        .then(res => {
            data?.reload;
            toast({
                title: "Item deleted seccussfuly",
            })
        })
        .catch(err => {
            toast({
                variant: "destructive",
                title: "Uh No! Something went wrong.",
                description: "check your connection and try again."
            })
        })
        .finally(() => {
            setIsLoading(false)
        })
    } 

    const body = (
        <>
            <Heading 
                small
                title="Are you absolutely sure?"
                subtitle="This action cannot be undone."
            />
        </>
    )

    const label = (
        <>
            Delete
            <Loader
                isLoading={isLoading}
                size={15}
            />
        </>
    )

    return (
        <Modal 
            isAlertModel
            isOpen={isOpenModal}
            onClose={onClose}
            onSubmit={() => deleteItem(data.itemId)}
            body={body}
            title="Delete"
            label={label}
            secondLebel="Cancel"
            secondAction={onClose}
        />
    )
}

export default AlertModal;