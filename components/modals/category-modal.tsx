'use client';

import Model from "@/components/Modal";
import UploadImage from "@/components/UploadImage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConvertImages } from "@/hooks/use-convert-images";
import { useRequest } from "@/hooks/use-request";
import { useForm } from "@/hooks/use-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useModel from "@/hooks/use-modal";
import Loader from "../ui/loader";

const imageUrl = process.env.NEXT_PUBLIC_CATEGORIES_IMG_URL;

const initialCreateState = {
    title: '',
    description: '',
    image: [],
}

const initialEditState = {
    title: '',
    description: '',
    image: [],
    deleteImage: []
}

const CategoryModel = () => {
    const {isOpen, onClose, type, data} = useModel();

    const isOpenModal = isOpen && (type === 'createCategory'  || type === 'editCategory');

    const [isLoading,setIsLoading] = useState(false);
    const [uploadImages , setUploadImages] = useState<string[]>([])

    const { formData: category, handleChange: handleChangeCreate, resetForm: resetCreateForm } = useForm(
        initialCreateState
    );

    const { formData: editCategory, handleChange: handleChangeEdit, resetForm: resetEditForm } = useForm(
        initialEditState
    );

    useEffect(() => {
        if(!data?.category) return;
        handleChangeEdit('id', data.category?.id);
        handleChangeEdit('title', data.category?.name);
        handleChangeEdit('description', data.category?.description);
        handleChangeEdit('image', data.category?.image);
    },[data?.category])


    const handleSubmit = () => {
        type === "createCategory" ? createCategory() : updateCategory();
    }

    const handleCloseModel = () => {
        resetCreateForm(initialCreateState);
        resetEditForm(initialEditState);
        setUploadImages([]);
        onClose();
    }



    const createCategory = async () => {
        setIsLoading(true)
        const data = {
            title: category.title,
            description: category.description,
            image: uploadImages
        }
        const responseData: any = await useRequest.post(data, '/category/category.php');
        setIsLoading(false)
        if(responseData.error) {
            toast.error('something went wrong!');
            return ;
        } 
        handleCloseModel();
        toast.success('category created.')
    }

    const updateCategory = async () => {
        setIsLoading(true)
        const data = {
            id: editCategory.id,
            title: editCategory.title,
            description: editCategory.description,
            upload_image: uploadImages?.[0],
            delete_image: editCategory.deleteImage[0]
        }
        const responseData = await useRequest.patch(data, '/category/category.php');
        setIsLoading(false)
        if(responseData.error){
            toast.error(responseData.error);
            return;
        }
        handleCloseModel();
        toast.success('category updated');
    }

    const handleUploadImages = async (images: any) => {
        const imageDataList = await useConvertImages(images,0.5);
        setUploadImages(imageDataList)
    }

    let body;
    
    if(type === "createCategory") {
        body =(
            <>
                <Label htmlFor="title">Title</Label>
                <Input 
                    required
                    type="text" 
                    placeholder="Title" 
                    onChange={(e) => handleChangeCreate('title', e.target.value)} 
                />
                <Label htmlFor="description">Description</Label>
                <Input 
                    required
                    type="text" 
                    placeholder="Description" 
                    onChange={(e) => handleChangeCreate('description', e.target.value)} 
                />
                <Label htmlFor="images">Images</Label>
                <UploadImage 
                    required
                    onChange={(e) => handleUploadImages(e.target.files)}
                    uploadImages={uploadImages}
                />
            </>
        )
    }

    if(type === "editCategory"){
        body = (
            <>
                <Label htmlFor="title">Title</Label>
                <Input 
                    required
                    defaultValue={editCategory.title} 
                    type="text" 
                    placeholder="Title" 
                    onChange={(e) => handleChangeEdit('title', e.target.value)} 
                />
                <Label htmlFor="description">Description</Label>
                <Input 
                    required
                    defaultValue={editCategory.description} 
                    type="text" 
                    placeholder="Description" 
                    onChange={(e) => handleChangeEdit('description', e.target.value)} 
                />
                <Label htmlFor="images">Images</Label>
                <UploadImage 
                    required={editCategory.image?.length === editCategory.deleteImage?.length && uploadImages?.length === 0}
                    src={imageUrl} 
                    existImages={editCategory.image}
                    uploadImages={uploadImages}
                    handleCheckedImages={(images) => handleChangeEdit('deleteImage', images)}
                    onChange={(e) => handleUploadImages(e.target.files)}
                />
            </>
        )
    }

    const label = (
        <>
            {type === "createCategory" ? 'Add category' : 'Update category'}
            <Loader
                isLoading={isLoading}
                size={15}
            />
        </>
    )

    return (
        <>
            <Model 
                title='Categories' 
                body={body} 
                label={label} 
                isOpen={isOpenModal} 
                onSubmit={handleSubmit}
                disabled={isLoading}
                onClose={handleCloseModel} 
            />
        </>
    )
}

export default CategoryModel;