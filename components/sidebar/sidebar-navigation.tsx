"use client";

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  LayoutDashboard, 
  Layers, 
  Ruler, 
  Palette, 
  Package, 
  ClipboardList, 
  Percent, 
  Tag, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  User,
  Settings,
  SquareStack,
  Shirt
} from 'lucide-react'
import { useSideBar } from '@/hooks/use-sidebar'
import Image from 'next/image'
import { useUser } from '@/hooks/use-user'
import Link from 'next/link'
import { cn } from "@/lib/utils";

interface sidebarNavigationProps {
    isExpended: boolean;
    showCloseIcon?: boolean
}

export default function SideBarNavigation({isExpended, showCloseIcon=false}: sidebarNavigationProps) {

    const {user} = useUser();
    const sideBar = useSideBar();
    const toggleSidebar = sideBar.isOpen ? sideBar.onClose : sideBar.onOpen;

    const NavItem = ({ icon, label, href }: {icon: React.ReactNode, label: string, href: string}) => (
        <Link 
        href={href} 
        className={cn(
            "flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
            sideBar.isOpen ? "justify-start space-x-3" : "justify-center"
        )}
        >
        {icon}
        {sideBar.isOpen && <span>{label}</span>}
        </Link>
    )

    const NavGroup = ({ title, children }: {title: string, children: React.ReactNode}) => (
        <div className="mb-4">
        {sideBar.isOpen && <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase">{title}</h3>}
        <nav className="mt-2 space-y-1">{children}</nav>
        </div>
    )

    return (
        <>
            <div className="flex items-center justify-between p-4">
                {isExpended && 
                    <Image 
                        src={'/MS.svg'}
                        alt="Logo"
                        width={'40'}
                        height={'40'}
                    />
                }
                {showCloseIcon && <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                {isExpended ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>}
            </div>
            <ScrollArea className="flex-grow">
                <NavItem icon={<LayoutDashboard className="h-5 w-5" />} label="Overview" href="/" />
                
                <NavGroup title="Store">
                <NavItem icon={<Layers className="h-5 w-5" />} label="Categories" href="/categories" />
                <NavItem icon={<SquareStack className="h-5 w-5" />} label="Subcategories" href="/subcategories" />
                <NavItem icon={<Ruler className="h-5 w-5" />} label="Sizes" href="/sizes" />
                <NavItem icon={<Palette className="h-5 w-5" />} label="Colors" href="/colors" />
                <NavItem icon={<Shirt className="h-5 w-5" />} label="Products" href="/products" />
                </NavGroup>
                
                <NavGroup title="Orders">
                <NavItem icon={<ClipboardList className="h-5 w-5" />} label="Statuses" href="/statuses" />
                <NavItem icon={<Package className="h-5 w-5" />} label="Orders" href="/orders" />
                </NavGroup>
                
                <NavGroup title="Marketing">
                <NavItem icon={<Percent className="h-5 w-5" />} label="Discounts" href="/discounts" />
                <NavItem icon={<Tag className="h-5 w-5" />} label="Promocodes" href="/promocodes" />
                </NavGroup>
                
                <NavGroup title="SEO">
                <NavItem icon={<FileText className="h-5 w-5" />} label="Blogs" href="/blogs" />
                </NavGroup>

                <NavGroup title="SETTINGS">
                <NavItem icon={<User className="h-5 w-5" />} label="Profile" href="/profile" />
                <NavItem icon={<Settings className="h-5 w-5" />} label="Settings" href="/settings" />
                </NavGroup>
            </ScrollArea>
            <div className="p-4 border-t">
                <div className={cn(
                "flex items-center",
                isExpended ? "justify-start space-x-3" : "justify-center"
                )}>
                <Avatar>
                    <AvatarImage src={user?.imageSrc} alt="User" />
                    <AvatarFallback>{user?.username?.match(/\b(\w)/g)?.join('')}</AvatarFallback>
                </Avatar>
                {isExpended && (
                    <div>
                    <p className="text-sm font-medium">{user?.fullName}</p>
                    <p className="text-xs text-gray-500">Admin</p>
                    </div>
                )}
                </div>
            </div>
        </>
    )
}