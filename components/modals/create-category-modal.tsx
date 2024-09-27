'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import UploadImage from "../upload-media";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useUpdateCategories } from "@/actions/get-categories";

const endPoint = process.env.NEXT_PUBLIC_API + '/categories/category';

interface InputsProps {
    title: string;
    description: string;
    uploadMedia: string[];
}

const CreateCategoryModal = () => {
    const {updateCategories} = useUpdateCategories();
    const {isOpen, onClose, type} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "createCategory"

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<InputsProps>()

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        setLoading(true)
        axios.post(endPoint, data)
        .then(res => {
            toast({
                title: 'Category created succesfully.'
            })
            reset();
            onClose();
            updateCategories();
        })
        .catch(error => {
            toast({
                variant: "destructive",
                title: "Uh No! Something went wrong.",
                description: "Error: " + error.request.statusText
            })
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const body = (<>
        <Label htmlFor="title">Title</Label>
        <Input 
            required
            type="text" 
            placeholder="Title" 
            {...register('title')}
        />
        <Label htmlFor="description">Description</Label>
        <Input 
            required
            type="text" 
            placeholder="Description" 
            {...register('description')}
        />
        <Label htmlFor="media">Media</Label>
        <UploadImage 
            multiple
            required={watch("uploadMedia")?.length === 0}
            onUpload={media => setValue("uploadMedia", media)} 
            uploadMedia={watch("uploadMedia")}
        />
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Add Category"
            label="Add"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default CreateCategoryModal;