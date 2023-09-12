'use client';

import { Settings, UserCircle } from "lucide-react";

import { getUser } from "@/actions/getUser";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Avatar from "@/components/Avatar";

const userRoutes = [
    {
        label: 'Profile',
        href: '/profile',
        icon: UserCircle
    },
    {
        label: 'Settings',
        href: '/settings',
        icon: Settings
    },
]

const SidebarUser = () => {
    const user = getUser();
    const pathname = usePathname();

    return (
        <div className="w-full flex flex-col gap-2">
            {userRoutes.map(route => (
                <Link href={route.href} key={route.label}>
                    <div className={`flex flex-row items-center gap-2 rounded cursor-pointer ${pathname === route.href ? 'bg-white text-br_secondary' : 'text-white'} hover:bg-white hover:text-br_primary py-1 px-2 transition duration-150`}>
                        <route.icon size={20} />
                        {route.label}
                    </div>
                </Link>
            ))}
            <Separator />
            <div className="flex flex-row items-center gap-x-2 w-full text-white">
                <Avatar imageSrc={user?.imageSrc} />
                <div className="flex flex-col items-left">
                    <h2>{user?.username}</h2>
                    <h3 className="font-light text-xs opacity-70">{user?.email}</h3>
                </div>
            </div>
        </div>
    )
}

export default SidebarUser;