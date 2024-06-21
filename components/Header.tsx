'use client';

import { Menu } from "lucide-react";
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
import { useUser } from "@/hooks/use-user";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./ui/sheet";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarLinks from "./sidebar/SidebarLinks";
import SidebarUser from "./sidebar/SideBarUser";

const Header = () => {
    const sideBar = useSideBar();
    const route = useRouter();

    const handleLogOut = () => {
        sessionStorage.removeItem("ms_admin_user_token");
        route.push('/login')
    }
    const {user} = useUser();
    return (
        <section className="w-full bg-white border-b py-4 px-6 text-black shadow-lg flex flex-row items-center justify-between">

            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger>
                        <Menu 
                            onClick={sideBar.onOpen}
                        />
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader><SidebarHeader /></SheetHeader>
                        <div className="mt-4">
                            <SidebarLinks />
                        </div>
                        <SheetFooter><SidebarUser /></SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            <Menu 
                cursor={'pointer'} 
                onClick={sideBar.isOpen ? sideBar.onClose : sideBar.onOpen}
                className="hover:text-black hidden lg:block"
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