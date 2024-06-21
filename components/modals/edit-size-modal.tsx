'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useUpdateData } from "@/providers/data";
import axios from "axios";
import { toast } from "../ui/use-toast";

const endPoint = process.env.NEXT_PUBLIC_API + '/sizes/size';

interface InputsProps {
    id: number;
    name: string;
    value: string;
}

const EditSizeModal = () => {
    const {updateSizes} = useUpdateData();
    const {isOpen, onClose, type, data} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "editSize"

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<InputsProps>()

    useEffect(() => {
        setValue("id", data?.size?.id!)
        setValue("name", data?.size?.name!)
        setValue("value", data?.size?.value!)
    },[data?.size])

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        setLoading(true)
        axios.patch(endPoint, data)
        .then(res => {
            toast({
                title: "Size Updated Seccussfuly"
            })
            reset();
            onClose();
            updateSizes();
        })
        .catch(error => {
            toast({
                variant: "destructive",
                title: "Uh No! Something Went Wrong.",
                description: "Error: " + error.request.statusText
            })
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const body = (<>
        <Label htmlFor="name">Name</Label>
        <Input 
            required 
            type="text" 
            placeholder="Name" 
            {...register("name")}
        />
        <Label htmlFor="value">Value</Label>
        <Input 
            required 
            type="text" 
            placeholder="value" 
            {...register("value")}
        />
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Edit Size"
            label="Save"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default EditSizeModal;