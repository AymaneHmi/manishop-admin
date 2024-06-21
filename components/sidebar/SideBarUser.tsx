'use client';

import { Settings, UserCircle } from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { useSideBar } from "@/hooks/use-sidebar";

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
    const pathname = usePathname();
    const {isOpen} = useSideBar();

    return (
        <div className="w-full flex flex-col gap-2">
            <Separator />
            {userRoutes.map(route => (
                <Link href={route.href} key={route.label}>
                    <Button
                        variant={pathname === route.href ? "default" : "outline"}
                        className="justify-start p-2 w-full gap-2"
                    >
                        <route.icon size={20} />
                        {isOpen && route.label}
                    </Button>
                </Link>
            ))}
        </div>
    )
}

export default SidebarUser;