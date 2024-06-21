'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import UploadImage from "../upload-media";
import { useUpdateData } from "@/providers/data";
import axios from "axios";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import Loader from "../ui/loader";
import InputError from "../ui/input-error";
import { useUser } from "@/hooks/use-user";
import { toast } from "../ui/use-toast";

const endPoint = process.env.NEXT_PUBLIC_API  + '/blogs/blog';
const openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

interface InputsProps {
    title: string;
    description: string;
    tags: string;
    uploadMedia: string[];
}

const CreateBlogModal = () => {
    const {updateBlogs} = useUpdateData();
    const {user} = useUser();
    const {isOpen, onClose, type} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "createBlog"
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
        setValue("description", blogDescription)
    },[blogDescription])

    useEffect(() => {
        if(watch('title') === '') {
            setGenerateButton(e => ({...e, disabled: true}))
        } else {
            setGenerateButton(e => ({...e, disabled: false}))
        }
    },[watch('title'), useForm])

    const handleGenerateBlog = async () => {
        setGenerateButton(e => ({...e, loading: true}))
        axios({
            method: "POST",
            url: "https://api.openai.com/v1/completions",
            data: {
                prompt: `Write a blog post using headers, bullet points, paragraphs, links, images, with a best SEO optimization, with sample and clear laungage about ${watch("title")}. Answer should be embedded in html tags.`,
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
        const requestData = {
            ...data,
            userId: user?.id
        }
        setLoading(true)
        axios.post(endPoint, requestData)
        .then(res => {
            toast({
                title: "Blog Created Seccussfuly.",
            })
            reset();
            setBlogDescription('')
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
            type="text" 
            placeholder="Title" 
            {...register('title', {required:true})}
        />
        <InputError isShow={!!errors.title} />
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
                className="text-white flex flex-row gap-2 w-fit"
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
            type="text" 
            placeholder="put cammas between tags ','" 
            {...register('tags', {required:true})}
        />
        <InputError isShow={!!errors.tags} />
        <Label htmlFor="media">Media</Label>
        <UploadImage 
            required={watch("uploadMedia")?.length === 0}
            onUpload={media => setValue("uploadMedia", media)} 
            uploadMedia={watch("uploadMedia")}
        />
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Add Blog"
            label="Add"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default CreateBlogModal;