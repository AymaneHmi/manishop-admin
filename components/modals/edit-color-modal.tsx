'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useUpdateColors } from "@/actions/get-colors";

const endPoint = process.env.NEXT_PUBLIC_API + '/colors/color';

interface InputsProps {
    id: number;
    name: string;
    value: string;
}

const EditColorModal = () => {
    const {updateColors} = useUpdateColors();
    const {isOpen, onClose, type, data} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "editColor"

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<InputsProps>()

    useEffect(() => {
        setValue("id", data?.color?.id!)
        setValue("name", data?.color?.name!)
        setValue("value", data?.color?.value!)
    },[data?.color, setValue])

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        console.log(data)
        setLoading(true)
        axios.patch(endPoint, data)
        .then(res => {
            toast({
                title: "Color Updated Seccussfuly"
            })
            reset();
            onClose();
            updateColors();
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
            type="color" 
            placeholder="value" 
            {...register("value")}
        />
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Edit Color"
            label="Save"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default EditColorModal;