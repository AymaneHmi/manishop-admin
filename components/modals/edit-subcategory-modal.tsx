'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useData, useUpdateData } from "@/providers/data";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "../ui/use-toast";

const endPoint = process.env.NEXT_PUBLIC_API + '/subcategories/subcategory';

interface InputsProps {
    id: number;
    title: string;
    categoryId: string;
}

const EditSubcategoryModal = () => {
    const {categories} = useData();
    const {updateSubcategories} = useUpdateData();
    const {isOpen, onClose, type, data} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "editSubcategory"

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<InputsProps>()

    useEffect(() => {
        setValue("id", data?.subcategory?.id!)
        setValue("title", data?.subcategory?.name!)
        setValue("categoryId", data?.subcategory?.category_id?.toString()!)
    },[data?.subcategory])

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        setLoading(true)
        axios.patch(endPoint, data)
        .then(res => {
            toast({
                title: "Subcategory Updated Seccussfuly"
            })
            reset();
            onClose();
            updateSubcategories();
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
        <Label htmlFor="title">Title</Label>
        <Input 
            required 
            type="text" 
            placeholder="Title" 
            {...register("title")}
        />
        <Label htmlFor="category">Category</Label>
        <Select 
            required 
            onValueChange={(categoryId) => setValue('categoryId', categoryId)}
            value={watch("categoryId")}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
                {categories.map(category => (
                    <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Edit Subcategory"
            label="Save"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default EditSubcategoryModal;