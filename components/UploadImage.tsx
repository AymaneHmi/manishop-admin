'use client';

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "./ui/loader";

interface UploadImageProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    multiple?: boolean;
    src?: string;
    existImages?: string[] | null;
    uploadImages?: string[] | null;
    handleCheckedImages?: (images: string[]) => void;
    required?: boolean;
}

const UploadImage: React.FC<UploadImageProps> = ({
    onChange,
    multiple,
    src,
    existImages,
    uploadImages,
    handleCheckedImages,
    required
}) => {

    const [checkedImages, setCheckedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageClick = (imageName: string) => {
        setCheckedImages((prevCheckedImages) => {
          if (prevCheckedImages.includes(imageName)) {
            return prevCheckedImages.filter((img) => img !== imageName);
          } else {
            return [...prevCheckedImages, imageName];
          }
        });
    };

    useEffect(() => {
        handleCheckedImages?.(checkedImages)
    },[checkedImages])

    const handleUploadImages = (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        onChange(e)
        setIsLoading(false);
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
                            <p className="text-xs">PNG, JPG or GIF</p>
                        </div>
                        <input 
                            name="images"
                            id="dropzone-file" 
                            className="hidden" 
                            type="file" 
                            multiple={multiple}
                            required={required}
                            onChange={handleUploadImages} 
                        />
                    </> : 
                        <Loader
                            isLoading={isLoading}
                            size={25}
                        />
                    }
                </label>
                {required && <p className="text-red-500">This field is required</p>}
            </div> 
            <div className="flex flex-wrap gap-2">
                {existImages?.map((image, index) => (
                        <div
                            key={index}
                            className="aspect-[4/3] h-20 border relative rounded overflow-hidden cursor-pointer hover:scale-95 transition-all duration-150"
                            onClick={() => handleImageClick?.(image)}
                            >
                            {checkedImages?.includes(image) && (
                                <div className="absolute w-full h-full bg-white opacity-90 flex flex-col items-center justify-center">
                                <CheckCircle2 />
                                </div>
                            )}
                            <Image
                                key={index}
                                src={src + image}
                                alt="image"
                                width={100}
                                height={50}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )) 
                }
                {uploadImages?.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt="image"
                        className="h-20 aspext-[4/3] object-cover rounded opacity-70"
                        width={'100'}
                        height={'100'}
                    />
                    )) 
                }
            </div>
        </>
    )
}

export default UploadImage;