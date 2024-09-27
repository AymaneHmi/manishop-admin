'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "../ui/use-toast";
import UploadMedia from "../upload-media";
import { useUpdateCategories } from "@/actions/get-categories";

const endPoint = process.env.NEXT_PUBLIC_API + '/categories/category';

interface InputsProps {
    id: number;
    title: string;
    description: string;
    uploadMedia: any[];
    existMedia: any[];
    deleteMedia: any[];
}

const EditCategoryModal = () => {
    const {updateCategories} = useUpdateCategories();
    const {isOpen, onClose, type, data} = useModal();

    const [loading, setLoading] = useState(false);

    const isOpenModal = isOpen && type === "editCategory"

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<InputsProps>();

    useEffect(() => {
        setValue("id", data?.category?.id!);
        setValue("title", data?.category?.name!);
        setValue("description", data?.category?.description!);
        setValue("existMedia", data?.category?.image!);
    },[data?.category, setValue])

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        setLoading(true)
        axios.patch(endPoint, data)
        .then(res => {
            toast({
                title: 'Category Updated succesfully.'
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
        <UploadMedia
            required={watch("deleteMedia")?.length === watch("existMedia")?.length && (watch("uploadMedia") ? watch("uploadMedia")?.length === 0 : true)}
            onUpload={media => setValue("uploadMedia", media)} 
            uploadMedia={watch("uploadMedia")}
            existMedia={watch("existMedia")}
            handleCheckedImages={(media) => setValue("deleteMedia", media)}
        />
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Edit Category"
            label="Save"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default EditCategoryModal;