'use client'

import React from 'react'
import { cn } from "@/lib/utils"
import { useSideBar } from '@/hooks/use-sidebar';
import SideBarNavigation from './sidebar-navigation';

export default function Sidebar() {
    
    const sideBar = useSideBar();

    return (
        <aside className={cn(
        "flex flex-col h-screen bg-white border-r fixed overflow-hidden transition-all duration-300 ease-in-out w-0",
        sideBar.isOpen ? "lg:w-64" : "lg:w-20"
        )}>
            <SideBarNavigation isExpended={sideBar.isOpen} showCloseIcon />
        </aside>
    )
}