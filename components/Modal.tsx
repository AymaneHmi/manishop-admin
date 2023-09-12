'use client';

import { X } from "lucide-react";
import Heading from "./Heading";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    subtitle?: string;
    body?: React.ReactNode,
    label: string | React.ReactNode;
    secondAction?: () => void;
    secondLebel?: string;
    disabled?: boolean;
    isAlertModel?: boolean;
}

const Modal: React.FC <ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    subtitle,
    body,
    label,
    secondAction,
    secondLebel,
    disabled,
    isAlertModel
}) => {

    const handleCloseModal = () =>{
        if(disabled){
            return;
        }
        onClose();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(disabled){
            return;
        }
        onSubmit();
    }

    if(!isOpen) {
        return null;
    }


    return (
       <div className="fixed w-screen h-screen inset-0 bg-black/70 backdrop-blur-sm z-[30] flex flex-col items-center justify-center">
            <div className="bg-white border flex flex-col gap-2 w-11/12 md:w-1/3 rounded">
                <div className="flex flex-row items-center justify-between py-2 px-4">
                    <Heading title={title} subtitle={subtitle} />
                    <X size={20} className="cursor-pointer" onClick={handleCloseModal} />
                </div>
                <Separator />
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    {body && <div className="flex flex-col gap-4 py-2 px-4 max-h-[40vh] overflow-y-auto">
                        {body}
                    </div>}
                    <Separator />
                    <div className="flex flex-row gap-2 py-2 px-4">
                        {secondLebel && <Button variant={'outline'} disabled={disabled} onClick={secondAction} className="w-full">{secondLebel}</Button>}
                        <Button variant={isAlertModel ? "destructive" : "default"} disabled={disabled} type="submit" className="w-full flex flex-row items-center gap-2">{label}</Button>
                    </div>
                </form>
            </div>
       </div>
    )
}

export default Modal;