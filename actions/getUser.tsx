import { useState, useEffect, useCallback } from "react";
import  useCookie  from "@/hooks/use-cookies";
import { useRequest } from "@/hooks/use-request";

type User = {
    id: number;
    username: string;
    email: string;
    imageSrc: string | null;
    number: string | null;
    address: string | null;
    city: string | null;
};

export function getUser(): User | null {
    const [user, setUser] = useState<User | null>(null);
    // const token = useCookie('ms_admin_user_token');
    const token = sessionStorage.getItem('ms_admin_user_token');
    
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setUser(null);
                return;
            }
    
            const data = {
                user_token: token
            };
    
            const responseData = await useRequest.post(data, '/user/fetch_admin_user.php');
    
            if (responseData.error) {
                setUser(null);
                return;
            }
            setUser(responseData);
        };
        fetchUser();
    }, [token]);

    return user;
}