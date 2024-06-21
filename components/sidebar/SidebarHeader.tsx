'use client';

import Image from "next/image";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSideBar } from "@/hooks/use-sidebar";

const SidebarHeader = () => {

    const {isOpen} = useSideBar();

    return (
        <div className="flex flex-row items-center gap-2 w-full">
            <Image 
                src={'/MS.svg'}
                alt="Logo"
                width={'40'}
                height={'40'}
            />
            {isOpen && <div className="flex flex-col text-current uppercase">
                <h1 className="font-bold text-lg">Manishop</h1>
                <h2 className="text-xs">Admin panel</h2>
            </div>}
        </div>
    )
}

export default SidebarHeader;