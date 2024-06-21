'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useUpdateData } from "@/providers/data";
import axios from "axios";
import { toast } from "../ui/use-toast";

const endPoint = process.env.NEXT_PUBLIC_API + '/colors/color';

interface InputsProps {
    name: string;
    value: string;
}

const CreateColorModal = () => {
    const {updateColors} = useUpdateData();
    const {isOpen, onClose, type} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "createColor"

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InputsProps>()

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        setLoading(true)
        axios.post(endPoint, data)
        .then(res => {
            toast({
                title: "Color Created Seccussfuly"
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
            placeholder="Value" 
            {...register("value")}
        />
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Add Color"
            label="Add"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default CreateColorModal;