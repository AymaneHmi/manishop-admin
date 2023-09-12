import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import Heading from "../Heading";
import { useRequest } from "@/hooks/use-request";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../ui/loader";

const AlertModal = () => {
    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter();

    const isOpenModal = isOpen && type === "alertModal";
    const [isLoading, setIsLoading] = useState(false)

    const deleteItem = async (e: number | undefined) => {
        setIsLoading(true)
        const query = {
            id: e
        }
        const responseData = await useRequest.delete(query, data.endPoint ? data.endPoint : '');
        setIsLoading(false)
        if(responseData.error) {
            toast.error(responseData.error);
            return;
        }
        toast.success('item deleted successfuly.');
        onClose();
        router.refresh();
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