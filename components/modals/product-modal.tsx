'use client';

import Model from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRequest } from "@/hooks/use-request";
import { useForm } from "@/hooks/use-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { getCategories } from "@/actions/getCategories";
import { Checkbox } from "@/components/ui/checkbox";
import { getSubcategories } from "@/actions/getSubcategories";
import UploadImage from "@/components/UploadImage";
import { useConvertImages } from "@/hooks/use-convert-images";
import useModel from "@/hooks/use-modal";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import Loader from "../ui/loader";

const productImages = process.env.NEXT_PUBLIC_PRODUCTS_IMG_URL;

const initialCreateState = {
    title: '',
    description: '',
    category: 0,
    subcategory: 0,
    price: '',
    available: true,
    images: [],
}

const initialEditState = {
    id: '',
    title: '',
    description: '',
    category: 0,
    subcategory: 0,
    price: '',
    available: true,
    images: [],
    uploadImages: [],
    deleteImages: []
}

const ProductsModel = () => {
    const {isOpen, onClose, type, data} = useModel();

    const isOpenModal = isOpen && (type === "createProduct" || type === "editProduct")

    const categories = getCategories();
    const subcategories = getSubcategories();

    const [productShow , setProductShow] = useState(true)
    const [productDescription , setProductDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadImages , setUploadImages] = useState<string[]>([])

    const { formData: product, handleChange: handleChangeCreate, resetForm: resetCreateForm } = useForm(
        initialCreateState
    );

    const { formData: editProduct, handleChange: handleChangeEdit, resetForm: resetEditForm } = useForm(
        initialEditState
    );

    const filteredSubcategories = subcategories.filter(subcategory => {
        if(type === "createProduct") {
            return subcategory.category_id === product.category
        } else {
            return subcategory.category_id === editProduct.category
        }
    })

    useEffect(() => {
        if(!data?.product) return;
        handleChangeEdit('id', data.product.id);
        handleChangeEdit('title', data.product.title);
        handleChangeEdit('images', data.product.images);
        handleChangeEdit('category', data.product.category_id);
        handleChangeEdit('subcategory', data.product.subcategory_id);
        handleChangeEdit('price', data.product.price);
        handleChangeEdit('available', data.product.available);
        setProductDescription(data.product.description);
    },[data?.product])

    const handleSubmit = () => {
        type === "createProduct" ? createProduct() : updateProduct();
    }

    const handleCloseModel = () => {
        setUploadImages([]);
        resetCreateForm(initialCreateState);
        resetEditForm(initialEditState);
        setProductDescription('')
        onClose();
    }


    const createProduct = async () => {
        setIsLoading(true)
        const data = {
            title: product.title,
            description: product.description,
            category: product.category,
            subcategory: product.subcategory,
            price: product.price,
            available: product.available,
            images: uploadImages
        }
        const responseData = await useRequest.post(data, '/products/product.php');
        setIsLoading(false)
        if(responseData.error) {
            toast.error('something went wrong!');
            return ;
        } 
        handleCloseModel();
        toast.success('product created.');
    }

    const updateProduct = async () => {
        setIsLoading(true);
        const data = {
            id: editProduct.id,
            title: editProduct.title,
            description: editProduct.description,
            category: editProduct.category,
            subcategory: editProduct.subcategory,
            price: editProduct.price,
            available: editProduct.available,
            upload_images: uploadImages,
            delete_images: editProduct.deleteImages.flat(),
        }
        const responseData = await useRequest.patch(data, '/products/product.php');
        setIsLoading(false);
        if(responseData.error){
            toast.error('something went wrong!');
            return;
        }
        handleCloseModel();
        toast.success('product updated');
    }

    const handleUploadImages = async (images: any) => {
        const imageDataList = await useConvertImages(images,0.5);
        setUploadImages(imageDataList)
    }

    useEffect(() => {
        if(type === "createProduct") {
            handleChangeCreate('images', uploadImages)
            handleChangeCreate('available' , productShow)
            handleChangeCreate('description' , productDescription)
        };
        if(type === "editProduct") {
            handleChangeEdit('uploadImages', uploadImages)
            handleChangeEdit('description' , productDescription)
        };
    },[type, uploadImages, productShow, productDescription])

    let body;

    if(type === "createProduct"){
        body = (
            <>
                <div className="flex flex-row items-center gap-2">
                    <Checkbox id="sizes" defaultChecked={true} onCheckedChange={(e) => setProductShow(e as boolean)} />
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
                    onChange={(e) => handleChangeCreate('title', e.target.value)} 
                />
                <Label htmlFor="description">Description</Label>
                {/* <Input type="text" placeholder="description" onChange={(e) => handleChangeCreate('description', e.target.value)} /> */}
                <ReactQuill 
                    placeholder="Enter product description" 
                    style={{marginBottom: '2.1rem'}} 
                    value={productDescription} 
                    onChange={setProductDescription} 
                />
                <Label htmlFor="category">Category</Label>
                <Select 
                    required
                    onValueChange={(category) => handleChangeCreate('category', category)}
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
                    onValueChange={(subcategory) => handleChangeCreate('subcategory', subcategory)}
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
                <Label htmlFor="price">Price</Label>
                <Input 
                    required
                    type="number" 
                    placeholder="Price" 
                    onChange={(e) => handleChangeCreate('price', e.target.value)}
                    step=".01"
                />
                <Label htmlFor="images">Images</Label>
                <UploadImage 
                    required
                    multiple 
                    onChange={(e) => {
                        handleUploadImages(e.target.files)
                    }} 
                    uploadImages={uploadImages}
                />
            </>
        )
    }


    if(type === "editProduct"){
        body = (
            <>
                <div className="flex flex-row items-center gap-2">
                    <Checkbox id="sizes" defaultChecked={data.product?.available} onCheckedChange={(e) => handleChangeEdit('available', e)} />
                    <div className="grid gap-1.5 leading-none">
                        <label
                        htmlFor="sizes"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                        Product visibility (Make product visible to users.)
                        </label>
                    </div>
                </div>
                <Label htmlFor="title">Title</Label>
                <Input 
                    required
                    defaultValue={editProduct.title} 
                    type="text" 
                    placeholder="Title" 
                    onChange={(e) => handleChangeEdit('title', e.target.value)} 
                />
                <Label htmlFor="description">Description</Label>
                <ReactQuill 
                    style={{marginBottom: '2.1rem'}} 
                    value={productDescription} 
                    onChange={setProductDescription} 
                />
                <Label htmlFor="category">Category</Label>
                <Select 
                    required
                    value={editProduct.category} 
                    onValueChange={(category) => handleChangeEdit('category', category)}
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
                    value={editProduct.subcategory} 
                    onValueChange={(subcategory) => handleChangeEdit('subcategory', subcategory)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                        {filteredSubcategories.map(subcategory => (
                            <SelectItem key={subcategory.id} value={subcategory.id.toString()}>{subcategory.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Label htmlFor="price">Price</Label>
                <Input 
                    required
                    defaultValue={editProduct.price} 
                    type="number" 
                    placeholder="Price" 
                    onChange={(e) => handleChangeEdit('price', e.target.value)} 
                />
                <Label htmlFor="images">Images</Label>
                <UploadImage 
                    required={editProduct.images?.length === editProduct.deleteImages?.length && uploadImages?.length === 0}
                    multiple 
                    onChange={(e) => {
                        handleUploadImages(e.target.files)
                    }}
                    existImages={editProduct.images}
                    src={productImages}
                    handleCheckedImages={(images) => handleChangeEdit('deleteImages', images)}
                    uploadImages={uploadImages}
                 />
            </>
        )
    }

    const label = (
        <>
            {type === "createProduct" ? 'Add product' : 'Update product'}
            <Loader
                isLoading={isLoading}
                size={15}
            />
        </>
    )

    return (
        <>
            <Model 
                title='Products' 
                body={body} 
                label={label} 
                isOpen={isOpenModal} 
                onSubmit={handleSubmit}
                disabled={isLoading || !body}
                onClose={handleCloseModel} 
            />
        </>
    )
}

export default ProductsModel;