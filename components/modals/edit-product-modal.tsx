'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import UploadImage from "../upload-media";
import { useData, useUpdateData } from "@/providers/data";
import axios from "axios";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { toast } from "../ui/use-toast";
import { subcategory } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const endPoint = process.env.NEXT_PUBLIC_API + '/products/product';

interface InputsProps {
    id: number;
    title: string;
    description: string;
    tags: string;
    categoryId: string;
    subcategoryId: string;
    sizesIds: number[];
    colorsIds: number[];
    price: number;
    isAvailable: boolean;
    isDraft: boolean;
    uploadMedia: any[];
    existMedia: any[];
    deleteMedia: any[];
}

const EditProductModal = () => {
    const {categories, subcategories, colors, sizes} = useData();
    const {updateProducts} = useUpdateData();
    const {isOpen, onClose, type, data} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "editProduct"
    const [productDescription , setProductDescription] = useState('');
    const [filteredSubcategories, setFilteredsubcategories] = useState<subcategory[] | []>([])

    const [selectedSizesIds, setSelectedSizesIds] = useState<number[] | []>([]);
    const [selectedColorsIds, setSelectedColorsIds] = useState<number[] | []>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<InputsProps>()

    useEffect(() => {
        setValue("id", data?.product?.id!);
        setValue("title", data?.product?.title!);
        setValue("tags", data?.product?.tags.join(',')!);
        setValue("categoryId", data?.product?.category?.id?.toString()!);
        setValue("subcategoryId", data?.product?.subcategory?.id?.toString()!);
        setValue("price", data?.product?.price!);
        setValue("isAvailable", data?.product?.available!);
        setValue("existMedia", data?.product?.media!);
        
        setProductDescription(data?.product?.description!)
        setSelectedSizesIds(data?.product?.sizes?.map(size => size.id) || [])
        setSelectedColorsIds(data?.product?.colors?.map(color => color.id) || [])
    },[data?.product]);

    useEffect(() => {
        const filterSubcategories = () => {
            return subcategories.filter(subcategory => {
                return subcategory.category_id.toString() == watch("categoryId")
            })
        }
        setFilteredsubcategories(filterSubcategories)
    },[watch("categoryId")])


    useEffect(() => {
        setValue("description", productDescription)
    },[productDescription])

    useEffect(() => {
        setValue("sizesIds", selectedSizesIds);
    },[selectedSizesIds])

    useEffect(() => {
        setValue("colorsIds", selectedColorsIds);
    },[selectedColorsIds])

    const handleToggleSize = (sizeId: number) => {
        const isSizeIdExist = selectedSizesIds.some(selectedSizeId => selectedSizeId == sizeId);

        if(isSizeIdExist) {
            setSelectedSizesIds(sizesIds => (
                sizesIds.filter(existSizeId => existSizeId !== sizeId)
            ))
        } else {
            setSelectedSizesIds(e => [...e, sizeId])
        }
    }

    const handleToggleColor = (colorId: number) => {
        const isColorIdExist = selectedColorsIds.some(selectedColorId => selectedColorId === colorId);

        if(isColorIdExist) {
            setSelectedColorsIds(colorsIds => (
                colorsIds.filter(existColorId => existColorId !== colorId)
            ))
        } else {
            setSelectedColorsIds(e => [...e, colorId])
        }
    }
    
    const isActiveSize = (sizeId: number) => {
        return selectedSizesIds.some(selectedSizeId => selectedSizeId == sizeId)
    }

    const isActiveColor = (colorId: number) => {
        return selectedColorsIds.some(selectedColorId => selectedColorId == colorId)
    }

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        setLoading(true)
        axios.patch(endPoint, data)
        .then(res => {
            toast({
                title: "Product Updated Seccussfuly.",
            })
            reset();
            onClose();
            updateProducts();
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
        <div className="flex flex-row items-center gap-2">
            <Checkbox 
                checked={watch("isAvailable")}
                onCheckedChange={(e) => setValue("isAvailable", e as boolean)}  
            />
            <div className="grid gap-1.5 leading-none">
                <label
                htmlFor="sizes"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                Product available (Make product visible to users.)
                </label>
            </div>
        </div>
        <Label htmlFor="title">Title</Label>
        <Input 
            required
            type="text" 
            placeholder="Title" 
            {...register('title', {required: true})}
        />
        <Label htmlFor="description">Description</Label>
        <ReactQuill 
            placeholder="Enter product description" 
            style={{marginBottom: '2.1rem'}} 
            value={productDescription} 
            onChange={setProductDescription} 
        />
        <Label htmlFor="tags">Tags (put camma "," between each tag)</Label>
        <Input 
            required
            type="text" 
            placeholder="Tags" 
            {...register('tags')}
        />
        <Label htmlFor="category">Category</Label>
        <Select 
            required
            value={watch("categoryId")}
            onValueChange={(categoryId) => setValue('categoryId', categoryId)}
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
        <Label htmlFor="subcategory">Subcategory</Label>
        <Select 
            required
            value={watch("subcategoryId")}
            onValueChange={(subcategoryId) => setValue('subcategoryId', subcategoryId)}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
                {filteredSubcategories?.map(subcategory => (
                    <SelectItem key={subcategory.id} value={subcategory.id.toString()}>{subcategory.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Label htmlFor="sizes">Sizes</Label>
        <Input
            required={selectedSizesIds.length === 0}
            className="hidden"
        />
        <div className="flex flex-wrap gap-2 items-center">
            {sizes?.reverse()?.map(size => (
                <Badge 
                onClick={() => handleToggleSize(size.id)} 
                className={cn("px-3 py-1 cursor-pointer text-sm bg-transparent border text-black border-black font-medium hover:bg-gray-200", isActiveSize(size.id) && "border-br_primary text-br_primary")} key={size.id}>{size.value}</Badge>
            ))}
        </div>
        <Label htmlFor="colors">Colors</Label>
        <Input
            required={selectedColorsIds.length === 0}
            className="hidden"
        />
        <div className="flex flex-wrap gap-2 items-center">
            {colors?.reverse()?.map(color => (
                <TooltipProvider key={color.id}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Badge 
                                onClick={() => handleToggleColor(color.id)} 
                                style={{backgroundColor: color.value}} 
                                className={cn("w-6 h-6 rounded-full border border-gray-400 cursor-pointer flex flex-col items-center justify-center", isActiveColor(color.id) && 'opacity-80 text-br_primary border-br_primary')} 
                                >{isActiveColor(color.id) && <Check size={15} />}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>{color.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
        <Label htmlFor="price">Price</Label>
        <Input 
            required
            type="number" 
            placeholder="Price" 
            step=".01"
            {...register('price', {required: true})}
        />
        <Label htmlFor="media">Media</Label>
        <UploadImage 
            multiple 
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
            title="Edit Product"
            label="Save"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default EditProductModal;