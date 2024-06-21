'use client';

import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AvatarProps {
    src?: string | null | undefined;
    className?: string;
}

const AvatarProfile: React.FC<AvatarProps> = ({
    src,
    className,
}) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    },[])

    if(!mounted) {
        return null;
    }

    return (
        <div className={cn("relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-br_primary text-white shadow-xl", className)}>
            {src ? 
                <Image
                    src={src || ""}
                    alt="avatar"
                    fill
                    className="w-full h-full object-cover"
                />
            : <User size={25} />}
        </div>
    )
}

export default AvatarProfile;