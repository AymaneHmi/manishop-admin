'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import Loader from "../ui/loader";
import { toast } from "../ui/use-toast";
import UploadMedia from "../upload-media";
import { useUpdateBlogs } from "@/actions/get-blogs";

const endPoint = process.env.NEXT_PUBLIC_API + '/blogs/blog';
const openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

interface InputsProps {
    id: number;
    title: string;
    description: string;
    tags: string;
    uploadMedia: any[];
    existMedia: any[];
    deleteMedia: any[];
}

const EditBlogModal = () => {
    const {updateBlogs} = useUpdateBlogs();
    const {isOpen, onClose, type, data} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "editBlog"
    const [blogDescription , setBlogDescription] = useState('');

    const [generateButton, setGenerateButton] = useState({
        disabled: true,
        loading: false
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<InputsProps>()

    useEffect(() => {
        setValue('id', data?.blog?.id!);
        setValue('title', data?.blog?.title!);
        setValue('tags', data?.blog?.tags?.join(', ')!);
        const existMedia = [data?.blog?.image];
        setValue('existMedia', existMedia);

        setValue('description', data?.blog?.description!);
        setBlogDescription(data?.blog?.description!)
    },[data?.blog, setValue])

    useEffect(() => {
        setValue("description", blogDescription)
    },[blogDescription, setValue])

    useEffect(() => {
        const title = watch("title");
        if(title === '') {
            setGenerateButton(e => ({...e, disabled: true}))
        } else {
            setGenerateButton(e => ({...e, disabled: false}))
        }
    },[watch, watch('title')])

    const handleGenerateBlog = async () => {
        setGenerateButton(e => ({...e, loading: true}))
        axios({
            method: "POST",
            url: "https://api.openai.com/v1/completions",
            data: {
                prompt: `Write a blog post using headers, bullet points, paragraphs, links, with a best SEO optimization, with sample and clear laungage about ${watch("title")}. Answer should be embedded in html tags.`,
                temperature: 0.5,
                n: 1,
                max_tokens: 1000,
                model: "gpt-3.5-turbo-instruct"
            },
            headers: {
              "Content-Type": "application/json",
              Authorization:
                `Bearer ${openaiKey}`
            }
        })
        .then((res) => {
            setBlogDescription(res.data.choices[0].text);
        })
        .catch((e) => {
            toast({
                variant: "destructive",
                title: "Uh No! Something went wrong.",
                description: "check your connection and try again."
            })
        })
        .finally(() => {
            setGenerateButton(e => ({...e, loading: false}))
        })
    }

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        console.log(data)
        setLoading(true)
        axios.patch(endPoint, data)
        .then(res => {
            toast({
                title: "Blog Updated Seccussfuly.",
            })
            reset();
            onClose();
            updateBlogs();
        })
        .catch(error => {
            toast({
                variant: "destructive",
                title: "Uh No! Something went wrong.",
                description: "check your connection and try again."
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
        <ReactQuill 
            placeholder="Enter product description" 
            style={{marginBottom: '2.1rem'}} 
            value={blogDescription} 
            onChange={setBlogDescription} 
        />
        <div className="flex flex-row gap-2 items-center">
            <Button
                variant="magic"
                type="button"
                className="text-white w-fit"
                onClick={handleGenerateBlog}
                disabled={generateButton.disabled}
            >
                {generateButton.loading ? <Loader isLoading /> : <>
                    <Sparkles className="group-hover:scale-125 group-hover:rotate-3 transition duration-150" size={18} />
                    Generate
                </>}
            </Button>
            <p>(Generate blog from title)</p>
        </div>
        <Label htmlFor="tags">Tags</Label>
        <Input 
            required
            type="text" 
            placeholder="put cammas between tags ','" 
            {...register('tags')}
        />
        <Label htmlFor="media">Media</Label>
        <UploadMedia 
            required={watch("deleteMedia")?.length === watch("existMedia")?.length && (watch("uploadMedia") ? watch("uploadMedia")?.length === 0 : true)}
            onUpload={media => setValue("uploadMedia", media)} 
            uploadMedia={watch("uploadMedia")}
            existMedia={watch('existMedia')}
            handleCheckedImages={media => setValue('deleteMedia', media)}
        />
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Edit Blog"
            label="Save"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default EditBlogModal;