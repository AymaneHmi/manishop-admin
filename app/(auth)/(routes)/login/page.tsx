'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/hooks/use-user";
import { emailPattern, passwordPattern } from "@/hooks/patterns";
import InputError from "@/components/ui/input-error";
import { useRouter } from "next/navigation";
import axios from "axios";

const endPoint = process.env.NEXT_PUBLIC_API + '/user/admin/login'

interface InputsProps {
    email: string;
    password: string;
}
export default function LoginPage () {
    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<InputsProps>();

    const route = useRouter();

    const {user} = useUser();

    const [mounted, setIsMounted] = useState(true)

    const [isLoading , setIsLoading] = useState(false)
    const [loginError , setLoginError] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(false)
    },[])

    if(mounted){
        return null;
    }

    const token = sessionStorage.getItem('ms_admin_user_token');

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        setIsLoading(true)
        axios.post(endPoint, data)
        .then(res => {
            sessionStorage.setItem('ms_admin_user_token', res?.data?.user_token);
            route.push('/')
        })
        .catch(err => {
            setLoginError(err.response.data.error)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    if(user) {
        return route.push('/');
    }

    return (
        <div className="rounded-lg w-4/5 md:w-1/4 shadow-2xl flex flex-col gap-4 py-4 px-6 border">
            <div className="flex flex-row gap-2 items-center">
                <Image 
                    src={'/MS.svg'}
                    alt="Logo"
                    width={'40'}
                    height={'40'}
                />
                <h1 className="font-bold text-xl md:text-3xl text-center">Welcome back</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Label htmlFor="email">Your email address</Label>
                <Input 
                    type="email" 
                    placeholder="Email" 
                    {...register("email", {required: true, pattern: emailPattern})}
                />
                <InputError isShow={!!errors.email} />
                <Label htmlFor="email">Your password</Label>
                <Input 
                    type="password" 
                    placeholder="Password" 
                    {...register("password", {required: true, pattern: passwordPattern, min: 8})}
                />
                <InputError isShow={!!errors.password || !!loginError} message={loginError} />
                <Button 
                    type="submit" 
                    disabled={isLoading}
                >
                    Login
                </Button>
            </form>
        </div>
    )
}