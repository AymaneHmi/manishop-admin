'use client';

import Image from "next/image";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSideBar } from "@/hooks/use-sidebar";

const SidebarHeader = () => {

    const SideBar = useSideBar();

    return (
        <div className="flex flex-row items-center justify-between w-full md:w-fit">
            <div className="flex flex-row items-center gap-x-2">
                <Image 
                    src={'/MS.svg'}
                    alt="Logo"
                    width={'40'}
                    height={'40'}
                />
                <div className="flex flex-col text-white uppercase">
                    <h1 className="font-bold text-lg">Manishop</h1>
                    <h2 className="text-xs">Admin panel</h2>
                </div>
            </div>
            <X
                onClick={SideBar.onClose}
                size={25} 
                className="md:hidden text-white" 
            />
        </div>
    )
}

export default SidebarHeader;