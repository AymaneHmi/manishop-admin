'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListMinus, Newspaper, Package, ShoppingBasket } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/'
    },
    {
        label: 'Categories',
        icon: ListMinus,
        href: '/categories'
    },
    {
        label: 'Subcategories',
        icon: ListMinus,
        href: '/subcategories'
    },
    {
        label: 'Products',
        icon: ShoppingBasket,
        href: '/products'
    },
    {
        label: 'Orders',
        icon: Package,
        href: '/orders'
    },
    {
        label: 'Blogs',
        icon: Newspaper,
        href: '/blogs'
    },
]

const SidebarLinks = () => {
    const path = usePathname();
    return (
        <div className="flex flex-col w-full gap-y-2">
            {links.map((link) => (
                <Link 
                    key={link.label} 
                    href={link.href} 
                    className={cn("w-full py-2 px-2 rounded hover:bg-white hover:text-br_primary transition duration-150",
                    path === link.href ? "bg-white text-br_primary" : "bg-br_primary text-white")}
                >
                    <div className="flex flex-row gap-2 items-center">
                        <link.icon size={'15'}/>
                        {link.label}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default SidebarLinks;