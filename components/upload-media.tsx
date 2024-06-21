'use client';

import { CheckCircle2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "./ui/loader";
import MediaReader from "./media-reader";
import { useConvertMedia } from "@/hooks/use-convert-media";

interface UploadImageProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onUpload: (e: string[]) => void;
    existMedia?: string[] | null;
    uploadMedia?: string[] | null;
    handleCheckedImages?: (images: string[]) => void;
    requiredMessage?: string | null;
}

const UploadMedia: React.FC<UploadImageProps> = ({
    onUpload,
    existMedia,
    uploadMedia,
    handleCheckedImages,
    requiredMessage,
    ...props
}) => {

    const [media, setMedia] = useState<string[]>([])
    const [checkedImages, setCheckedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileClick = (imageName: string) => {
        setCheckedImages((prevCheckedImages) => {
          if (prevCheckedImages.includes(imageName)) {
            return prevCheckedImages.filter((img) => img !== imageName);
          } else {
            return [...prevCheckedImages, imageName];
          }
        });
    };

    useEffect(() => {
        onUpload?.(media)
    },[media])

    useEffect(() => {
        handleCheckedImages?.(checkedImages)
    },[checkedImages])

    const handleUploadMedia = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const mediaDataList = await useConvertMedia(e.target.files)
        setIsLoading(false);
        setMedia(mediaDataList);
    }

    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="dropzone-file" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-br_secondary border-dashed rounded-lg cursor-pointer text-gray-700">
                    {!isLoading ? 
                    <>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-xs">PNG, JPG or MP4</p>
                        </div>
                        <input 
                            name="media"
                            id="dropzone-file" 
                            className="hidden" 
                            type="file" 
                            onChange={handleUploadMedia} 
                            {...props}
                        />
                    </> : 
                        <Loader
                            isLoading={isLoading}
                            size={25}
                        />
                    }
                </label>
            </div> 
            <div className="flex flex-wrap gap-2">
                {existMedia?.map((file, index) => (
                        <div
                            key={index}
                            className="aspect-[4/3] h-20 border relative rounded overflow-hidden cursor-pointer hover:scale-95 transition-all duration-150"
                            onClick={() => handleFileClick?.(file)}
                            >
                            {checkedImages?.includes(file) && (
                                <div className="absolute w-full h-full bg-white opacity-90 flex flex-col items-center justify-center z-[2]">
                                <CheckCircle2 />
                                </div>
                            )}
                            <MediaReader
                                media={file}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )) 
                }
                {uploadMedia?.map((file, index) => (
                    <div className="h-20 aspect-[4/3] rounded opacity-70 relative">
                        <MediaReader
                            key={index}
                            media={file}
                            className="object-cover"
                        />
                    </div>
                    )) 
                }
            </div>
        </>
    )
}

export default UploadMedia;