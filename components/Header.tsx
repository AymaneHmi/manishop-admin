'use client';

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSideBar } from "@/hooks/use-sidebar";
import Avatar from "@/components/Avatar";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { getUser } from "@/actions/getUser";

const Header = () => {
    const sideBar = useSideBar();
    const route = useRouter();

    const handleLogOut = () => {
        // document.cookie = `ms_admin_user_token=; ${new Date(Date.now()).toUTCString()}; path=/;`;    
        sessionStorage.removeItem("ms_admin_user_token");
        route.push('/login')
    }
    const user = getUser();
    return (
        <section className="w-full bg-br_primary py-4 px-6 text-white shadow-lg flex flex-row items-center justify-between">

            <Menu 
                cursor={'pointer'} 
                onClick={sideBar.isOpen ? sideBar.onClose : sideBar.onOpen}
                className="hover:text-black"
            />

            <DropdownMenu>
                <DropdownMenuTrigger className="hover:drop-shadow-xl">
                    <Avatar imageSrc={user?.imageSrc} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        My account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => route.push('/profile')}>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
        </section>
    )
}
export default Header