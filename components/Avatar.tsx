'use client';

import useModal from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { Edit2, User } from "lucide-react";
import Image from "next/image";

const src = process.env.NEXT_PUBLIC_USERS_IMG_URL;

interface AvatarProps {
    imageSrc?: string | null;
    size?: number;
    isEdit?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    imageSrc,
    size,
    isEdit = false,
}) => {
    const {onOpen} = useModal();
    return (
        <div className={cn("relative", size ? `w-${size} h-${size}` : "w-10 h-10")}>
            {isEdit && 
            <div className="absolute top-0 right-0 text-white bg-br_primary p-2 rounded-full cursor-pointer hover:scale-105 transition duration-150">
                <Edit2 onClick={() => onOpen('editProfile', {imageSrc})} size={20} />
            </div>}
            <div className={cn("bg-br_primary flex items-center justify-center rounded-full overflow-hidden text-white", size ? `w-${size} h-${size}` : "w-10 h-10")}>
                {imageSrc ? 
                <Image
                    src={src + imageSrc}
                    width={100}
                    height={100}
                    alt="avatar"
                    className="w-full h-full object-cover"
                />
                : <User />}
            </div>
        </div>
    )
}

export default Avatar;