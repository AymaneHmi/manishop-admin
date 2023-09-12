'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import  useCookie  from "@/hooks/use-cookies";
import { useRequest } from "@/hooks/use-request";
import { useForm } from "@/hooks/use-form";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

const initialState = {
    email: '',
    password: ''
}
export default function LoginPage () {
    const { formData: loginData, handleChange: handleChange, resetForm: resetInsertForm } = useForm(
        initialState
    );

    const route = useRouter();

    const [mounted, setIsMounted] = useState(true)

    const [isLoading , setIsLoading] = useState(false)
    const [loginError , setLoginError] = useState<String | null>(null);

    useEffect(() => {
        setIsMounted(false)
    },[])

    if(mounted){
        return null;
    }

    // const token = useCookie('ms_admin_user_token');
    const token = sessionStorage.getItem('ms_admin_user_token');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isLoading) return;
        if(!loginData.email || !loginData.password) {
            setLoginError('Fields are required!')
            return;
        }
        setIsLoading(true)
        const data: any = {
            email: loginData.email,
            password: loginData.password
        }
        const responseData = await useRequest.post(data,'/login/admin_login.php');
        setIsLoading(false);
        if(responseData.error) {
            setLoginError(responseData.error)
            return;
        }
        if(!responseData.user_token){
            return;
        }
        // document.cookie = `ms_admin_user_token=${responseData.user_token}; expires=${new Date(Date.now() + 10 * 60 * 1000).toUTCString()}; path=/`;
        sessionStorage.setItem('ms_admin_user_token', responseData.user_token);
        toast.success('Login successfuly.')
        resetInsertForm(initialState)
        route.push('/');
    }

    if(token) {
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Label htmlFor="email">Your email address</Label>
                <Input 
                    type="email" 
                    placeholder="Email" 
                    required
                    onChange={(e) => handleChange('email', e.target.value)} 
                />
                <Label htmlFor="email">Your password</Label>
                <Input 
                    type="password" 
                    placeholder="Password" 
                    required
                    onChange={(e) => handleChange('password', e.target.value)} 
                />
                {loginError && <p className="text-red-500 text-sm">email or password in incorrect</p>}
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