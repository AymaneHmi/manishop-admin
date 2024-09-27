'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "../ui/use-toast";
import { useUpdateSubcategories } from "@/actions/get-subcategories";
import getCategories from "@/actions/get-categories";

const endPoint = process.env.NEXT_PUBLIC_API + '/subcategories/subcategory';

interface InputsProps {
    title: string;
    categoryId: string;
}

const CreateSubcategoryModal = () => {
    const {updateSubcategories} = useUpdateSubcategories();
    const {categories} = getCategories();
    const {isOpen, onClose, type} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "createSubcategory"

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<InputsProps>()

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        setLoading(true)
        axios.post(endPoint, data)
        .then(res => {
            toast({
                title: "Subcategory Created Seccussfuly"
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
        >
            <SelectTrigger>
                <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
                {categories?.map(category => (
                    <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Add Subcategory"
            label="Add"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default CreateSubcategoryModal;