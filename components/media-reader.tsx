import { cn } from "@/lib/utils";
import Image from "next/image";

interface mediaReaderProps {
    media: string[] | string;
    className?: string;
    videoControls?: boolean;
    onClick?: React.MouseEventHandler<HTMLVideoElement | HTMLImageElement>;
}

const MediaReader: React.FC<mediaReaderProps> = ({
    media,
    className,
    videoControls = false,
    onClick,
}) => {
    const fileExtension = typeof media === "string" ? media.split('.').pop() : media?.[0].split('.').pop();
    return (
        <>
            {fileExtension === 'mp4' 
                ? 
                <video 
                    className={cn("w-full h-full object-contain", className)} 
                    controls={videoControls}
                    onClick={onClick}
                >
                    <source src={typeof media === "string" ? media : media?.[0]} type="video/mp4" />
                </video> 
                :
                 <Image
                    className={cn("object-cover", className)}
                    src={typeof media === "string" ? media : media?.[0]}
                    alt="product gallery"
                    fill
                    onClick={onClick}
                /> 
            }
        </>
    )
}

export default MediaReader