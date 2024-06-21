'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDown, CircleDollarSign, Eye, Globe, HomeIcon, LayoutDashboard, Megaphone, Newspaper, Package, Paintbrush2, Percent, Ruler, Shirt, ShoppingBasket, SquareStack, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useSideBar } from "@/hooks/use-sidebar";

const links = [
    {
        label: 'Dashboard',
        icon: HomeIcon,
        href: '/',
        group: false
    },
    {
        label: 'Store',
        icon: Store,
        group: true,
        links : [
            {
                label: 'Categories',
                icon: LayoutDashboard,
                href: '/categories'
            },
            {
                label: 'Subcategories',
                icon: SquareStack,
                href: '/subcategories'
            },
            {
                label: 'Sizes',
                icon: Ruler,
                href: '/sizes'
            },
            {
                label: 'colors',
                icon: Paintbrush2,
                href: '/colors'
            },
            {
                label: 'Products',
                icon: Shirt,
                href: '/products'
            },
        ]
    },
    {
        label: 'Orders',
        icon: Package,
        group: true,
        links : [
            {
                label: 'Statuses',
                icon: Eye,
                href: '/statuses'
            },
            {
                label: 'Orders',
                icon: Package,
                href: '/orders'
            },
        ]
    },
    {
        label: 'Marketing',
        icon: Megaphone,
        group: true,
        links : [
            {
                label: 'Discounts',
                icon: Percent,
                href: '/discounts'
            },
            {
                label: 'Promocodes',
                icon: CircleDollarSign,
                href: '/promocodes'
            },
        ]
    },
    {
        label: 'SEO',
        icon: Globe,
        group: true,
        links : [
            {
                label: 'Blogs',
                icon: Newspaper,
                href: '/blogs'
            },
        ]
    },
]

const SidebarLinks = () => {
    const path = usePathname();
    const {isOpen} = useSideBar();
    return (
        <div className="flex flex-col w-full gap-y-2 h-[70vh] overflow-y-auto">
            {links.map((link, i) => (
                link.group ? 
                    <div className="group">
                        <Button 
                            key={i}
                            variant={"outline"}
                            className="p-2 items-start justify-between w-full"
                        >
                            <div className="flex flex-row gap-2 items-center">
                                <link.icon size={20} />
                                {isOpen && link.label}
                            </div>
                            {isOpen && <ArrowDown size={20} />}
                        </Button>
                        <div className="flex flex-col gap-2 max-h-0 group-hover:max-h-[300px] overflow-hidden group-hover:mt-2 w-11/12 ml-auto transition-all duration-300">
                            {link.links?.map((link, i) => (
                                <Link 
                                key={i} 
                                href={link.href!} 
                                >
                                    <Button 
                                        key={i}
                                        variant={path === link.href ? "default" : "outline"}
                                        className="p-2 flex justify-start gap-2 w-full"
                                    >
                                        <link.icon size={20} />
                                        {isOpen && link.label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                :
                <Link 
                    key={i} 
                    href={link.href!} 
                >
                    <Button 
                        key={i}
                        variant={path === link.href ? "default" : "outline"}
                        className="p-2 flex justify-start gap-2 w-full"
                    >
                        <link.icon size={20} />
                        {isOpen && link.label}
                    </Button>
                </Link>
            ))}
        </div>
    )
}

export default SidebarLinks;