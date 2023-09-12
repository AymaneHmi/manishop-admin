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

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { getUser } from "@/actions/getUser";
import useModel from "@/hooks/use-modal";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Loader from "../ui/loader";

const imageUrl = process.env.NEXT_PUBLIC_BLOGS_IMG_URL;

const initialCreateState = {
    title: '',
    description: '',
    image: [],
    tags: [],
}

const initialEditState = {
    title: '',
    description: '',
    image: [],
    tags: [],
    deleteImage: []
}

const BlogModel = () => {
    const user = getUser();

    const {isOpen, onClose, type, data} = useModel();

    const isOpenModel = isOpen && (type === "createBlog" || type === 'editBlog');
    
    const [uploadImages , setUploadImages] = useState<string[] | null>(null)
    const [description, setDescription] = useState<string | undefined>('');
    const [tags, setTags] = useState<string[]>([])
    const [tagsInput, setTagsInput] = useState('')
    
    const [isLoading,setIsLoading] = useState(false);

    const { formData: blog, handleChange: handleChangeCreate, resetForm: resetCreateForm } = useForm(
        initialCreateState
    );

    const { formData: editBlog, handleChange: handleChangeEdit, resetForm: resetEditForm } = useForm(
        initialEditState
    );

    useEffect(() => {
        if(!data?.blog) return;
        handleChangeEdit('id', data.blog?.id);
        handleChangeEdit('title', data.blog?.title);
        handleChangeEdit('image', data.blog?.image);
        setDescription(data.blog?.description)
        setTags(data.blog?.tags || [])
    },[data?.blog])

    const handleSubmit = () => {
        type === 'createBlog' && createBlog()
        type === 'editBlog' && updateBlog()
    }

    const handleCloseModel = () => {
        resetCreateForm(initialCreateState);
        resetEditForm(initialEditState);
        setUploadImages(null);
        setDescription('')
        onClose()
    }

    useEffect(() => {
        type === 'createBlog' && handleChangeCreate('description', description);
        type === 'editBlog' && handleChangeEdit('description', description)
    },[description])

    useEffect(() => {
        type === 'createBlog' && handleChangeCreate('tags', tags);
        type === 'editBlog' && handleChangeEdit('tags', tags);
    },[tags])

    const createBlog = async () => {
        setIsLoading(true)
        const data = {
            title: blog.title,
            description: blog.description,
            image: uploadImages?.[0],
            userId: user?.id,
            tags: tags
        }
        const responseData: any = await useRequest.post(data, '/blogs/blog.php');
        setIsLoading(false)
        if(responseData.error) {
            toast.error('something went wrong!');
            return ;
        } 
        handleCloseModel();
        toast.success('blog created.')
    }

    const updateBlog = async () => {
        console.log(editBlog)
        setIsLoading(true)
        const data = {
            id: editBlog.id,
            title: editBlog.title,
            description: editBlog.description,
            upload_image: uploadImages?.[0],
            delete_image: editBlog.deleteImage[0]
        }
        const responseData = await useRequest.patch(data, '/blogs/blog.php');
        setIsLoading(false)
        if(responseData.error){
            toast.error('something went wrong!');
            return;
        }
        handleCloseModel();
        toast.success('blog updated');
    }

    const handleUploadImages = async (images: any) => {
        const imageDataList = await useConvertImages(images,0.5);
        setUploadImages(imageDataList)
    }

    const handlePressKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ' && tagsInput.trim() !== '') {
            const newTag = tagsInput.trim();
            setTags((prevTags) => [...prevTags, newTag]);
            setTagsInput('');
        } 
    }

    const handleTagRemove = (index: number) => {
        const updatedTags = tags?.filter((_, i) => i !== index);
        setTags(updatedTags);
    };

    let body;
    
    if(type === "createBlog") {
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
                <ReactQuill 
                    style={{marginBottom: '2.1rem'}} 
                    value={description} 
                    onChange={setDescription} 
                />
                <Label htmlFor="tags">Tags</Label>
                <Input 
                    required
                    type="text" 
                    placeholder="tags" 
                    onKeyDown={handlePressKey} 
                    value={tagsInput} 
                    onChange={(e) => setTagsInput(e.target.value)} 
                />
                <div className="flex flex-wrap gap-2 w-full">
                    {tags?.map((tag,index) => (
                        <Badge key={index} className="w-fit space-x-2 font-light bg-br_primary hover:bg-br_secondary"><span>{tag}</span><X onClick={() => handleTagRemove(index)} size={10} /></Badge>
                    ))}
                </div>
                <Label htmlFor="image">image</Label>
                <UploadImage 
                    required
                    onChange={(e) => handleUploadImages(e.target.files)}
                    uploadImages={uploadImages}
                />
            </>
        )
    }

    if(type === 'editBlog'){
        body = (
            <>
                <Label htmlFor="title">Title</Label>
                <Input 
                    required
                    defaultValue={editBlog.title} 
                    type="text" 
                    placeholder="Title" 
                    onChange={(e) => handleChangeEdit('title', e.target.value)} 
                />
                <Label htmlFor="description">Description</Label>
                <ReactQuill 
                    style={{marginBottom: '2.1rem'}} 
                    value={description} 
                    onChange={setDescription} 
                />
                <Label htmlFor="tags">Tags</Label>
                <Input 
                    required
                    type="text" 
                    placeholder="tags" 
                    onKeyDown={handlePressKey} 
                    value={tagsInput} 
                    onChange={(e) => setTagsInput(e.target.value)} 
                />
                <div className="flex flex-wrap gap-2 w-full">
                    {tags?.map((tag,index) => (
                        <Badge key={index} className="w-fit space-x-2 font-light bg-br_primary hover:bg-br_secondary"><span>{tag}</span><X onClick={() => handleTagRemove(index)} size={10} /></Badge>
                    ))}
                </div>
                <Label htmlFor="images">Image</Label>
                <UploadImage 
                    required={editBlog.image?.length === editBlog.deleteImage?.length && uploadImages?.length === 0}
                    src={imageUrl} 
                    existImages={editBlog.image}
                    uploadImages={uploadImages}
                    handleCheckedImages={(images) => handleChangeEdit('deleteImage', images)}
                    onChange={(e) => handleUploadImages(e.target.files)} 
                />
            </>
        )
    }

    const label = (
        <>
            {type === 'createBlog' ? 'Add blog' : 'save blog'}
            <Loader
                isLoading={isLoading}
                size={15}
            />
        </>
    )

    return (
        <Model 
            title='Blogs' 
            body={body} 
            label={label} 
            isOpen={isOpenModel} 
            onSubmit={handleSubmit}
            disabled={isLoading}
            onClose={handleCloseModel} 
        />
    )
}

export default BlogModel;