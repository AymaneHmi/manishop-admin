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
import axios from "axios";
import { toast } from "../ui/use-toast";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { subcategory } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import InputError from "../ui/input-error";
import { useUpdateProducts } from "@/actions/get-products";
import getCategories from "@/actions/get-categories";
import getSubcategories from "@/actions/get-subcategories";
import getColors from "@/actions/get-colors";
import getSizes from "@/actions/get-sizes";

const endPoint = process.env.NEXT_PUBLIC_API + '/products/product';

interface InputsProps {
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
}

const CreateProductModal = () => {
    const {updateProducts} = useUpdateProducts();
    
    const {categories} = getCategories();
    const {subcategories} = getSubcategories();
    const {colors} = getColors();
    const {sizes} = getSizes();

    const {isOpen, onClose, type} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "createProduct"
    const [productDescription , setProductDescription] = useState('');

    const [filteredSubcategories, setFilteredSubcategories] = useState<subcategory[]>([])

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
        const categoryId = watch("categoryId");
        if (categoryId) {
            const filtered = subcategories?.filter(subcategory => {
                return subcategory.category_id.toString() === categoryId;
            }) || [];
            setFilteredSubcategories(filtered);
        }
    }, [watch, watch("categoryId"), subcategories]);

    useEffect(() => {
        setValue("description", productDescription)
    },[productDescription, setValue])

    useEffect(() => {
        setValue("sizesIds", selectedSizesIds);
    },[selectedSizesIds, setValue])

    useEffect(() => {
        setValue("colorsIds", selectedColorsIds);
    },[selectedColorsIds, setValue])

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

    const handleOnClose = () => {
        onClose();
        setProductDescription('');
        setSelectedColorsIds([]);
        setSelectedSizesIds([]);
    }

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        setLoading(true)
        axios.post(endPoint, data)
        .then(res => {
            toast({
                title: "Product Created Seccussfuly"
            })
            reset();
            handleOnClose();
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
                defaultChecked={true}
                onCheckedChange={(e) => setValue("isAvailable", e as boolean)} 
                {...register('isAvailable')}
            />
            <div className="grid gap-1.5 leading-none">
                <Label className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Product available (Make product visible to users.)
                </Label>
            </div>
        </div>
        <Label htmlFor="title">Title</Label>
        <Input 
            type="text" 
            placeholder="Title" 
            {...register('title', {required: true})}
        />
        <InputError
            isShow={!!errors.title}
        />
        <Label htmlFor="description">Description</Label>
        <ReactQuill 
            placeholder="Enter product description" 
            style={{marginBottom: '2.1rem'}} 
            value={productDescription} 
            onChange={setProductDescription}
            // {...register('description', {required: !productDescription})}
        />
        <Label htmlFor="tags">Tags (put camma &quot;,&quot; between each tag)</Label>
        <Input 
            type="text" 
            placeholder="Tags" 
            {...register('tags', {required: true})}
        />
        <InputError
            isShow={!!errors.tags}
        />
        <Label htmlFor="category">Category</Label>
        <Select 
            onValueChange={(categoryId) => setValue('categoryId', categoryId)}
            {...register('categoryId', {required: !watch('categoryId')})}
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
        <InputError
            isShow={!!errors.categoryId}
        />
        <Label htmlFor="subcategory">Subcategory</Label>
        <Select 
            onValueChange={(subcategoryId) => setValue("subcategoryId", subcategoryId)}
            {...register('subcategoryId', {required: !watch('subcategoryId')})}
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
        <InputError
            isShow={!!errors.subcategoryId}
        />
        <Label htmlFor="sizes">Sizes</Label>
        <Input
            className="hidden"
            {...register("sizesIds", {required: selectedSizesIds.length === 0})}
        />
        <div className="flex flex-wrap gap-2 items-center">
            {sizes?.reverse()?.map(size => (
                <Badge 
                onClick={() => handleToggleSize(size.id)} 
                className={cn("px-3 py-1 cursor-pointer text-sm bg-transparent border text-black border-black font-medium hover:bg-gray-200", isActiveSize(size.id) && "border-br_primary text-br_primary")} key={size.id}>{size.value}</Badge>
            ))}
        </div>
        <InputError
            isShow={!!errors.sizesIds}
            message={"One size should be selected as minimum"}
        />
        <Label htmlFor="colors">Colors</Label>
        <Input
            className="hidden"
            {...register('colorsIds', {required: selectedColorsIds.length === 0})}
        />
        <div className="flex flex-wrap gap-2 items-center">
            {colors?.reverse()?.map(color => (
                <TooltipProvider key={color.id}>
                    <Tooltip>
                        <TooltipTrigger type="button">
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
        <InputError
            isShow={!!errors.colorsIds}
            message={"One color should be selected as minimum"}
        />
        <Label htmlFor="price">Price</Label>
        <Input 
            type="number" 
            placeholder="Price" 
            step=".01"
            {...register('price', {required: true})}
        />
        <InputError
            isShow={!!errors.price}
        />
        <Label htmlFor="media">Media</Label>
        <UploadImage 
            multiple 
            required={watch("uploadMedia")?.length === 0}
            onUpload={media => setValue("uploadMedia", media)} 
            uploadMedia={watch("uploadMedia")}
        />
        <InputError
            isShow={watch("uploadMedia")?.length === 0}
        />
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Add Product"
            label="Add"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default CreateProductModal;