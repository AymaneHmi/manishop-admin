'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "../ui/use-toast";
import InputError from "../ui/input-error";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { codePattern } from "@/hooks/patterns";
import { useUpdatePromocodes } from "@/actions/get-promocodes";

const endPoint = process.env.NEXT_PUBLIC_API + '/promocodes/promocode';

interface InputsProps {
    promocode: string;
    discountAmount: number;
    startDate?: Date;
    endDate?: Date;
}

const CreatePromocodeModal = () => {
    const {updatePromocodes} = useUpdatePromocodes();
    const {isOpen, onClose, type} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "createPromocode"

    const yesterdayDate = () => {
        let t = new Date();
        t.setDate(t.getDate() - 1);
        return t;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<InputsProps>()

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        const resData = {
            ...data,
            promocode: data.promocode.toUpperCase()
        }
        setLoading(true)
        axios.post(endPoint, resData)
        .then(res => {
            toast({
                title: "Promocode Created Seccussfuly"
            })
            reset();
            onClose();
            updatePromocodes();
        })
        .catch(error => {
            toast({
                variant: "destructive",
                title: "Uh No! Something Went Wrong.",
                description: "Error: " + error.response.data.error
            })
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const body = (<>
        <Label htmlFor="promocode">Promocode</Label>
        <p className="text-xs font-light">Each promocode should be unique, and only use letters and numbers.</p>
        <Input 
            type="text" 
            placeholder="EX. THANKYOU" 
            style={{textTransform: "uppercase"}}
            {...register("promocode", {required: true, pattern: codePattern})}
        />
        <InputError
            isShow={!!errors.promocode}
        />
        <Label htmlFor="discount amount">Discount amount</Label>
        <Input 
            type="number"
            placeholder="EX. 25" 
            {...register("discountAmount", {required: true})}
        />
        <InputError
            isShow={!!errors.discountAmount}
        />
        <Label htmlFor="start date">Start date</Label>
        <TooltipProvider >
            <Tooltip>
                <TooltipTrigger type="button" asChild>
                    <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                        "w-full pl-3 text-left font-normal",
                        !watch('startDate') && "text-muted-foreground"
                        )}
                    >
                        {watch("startDate") ? (
                            format(watch("startDate")!, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <Input
                        className="hidden"
                        {...register('startDate', {required: !watch("startDate")})}
                    />
                    <Calendar
                        mode="single"
                        selected={watch("startDate")}
                        onSelect={(date) => setValue("startDate", date)}
                        className="rounded-md border"
                        disabled={(date) =>
                            date < yesterdayDate() || date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <InputError
            isShow={!!errors.startDate}
        />
        <Label htmlFor="end date">End date</Label>
        <TooltipProvider >
            <Tooltip>
                <TooltipTrigger type="button">
                    <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                        "w-full pl-3 text-left font-normal",
                        !watch('endDate') && "text-muted-foreground"
                        )}
                    >
                        {watch("endDate") ? (
                            format(watch("endDate")!, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <Input
                        className="hidden"
                        {...register('endDate', {required: !watch("endDate")})}
                    />
                    <Calendar
                        mode="single"
                        selected={watch("endDate")}
                        onSelect={(date) => setValue("endDate", date)}
                        className="rounded-md border"
                        disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01") || date < watch("startDate")!
                        }
                    />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <InputError
            isShow={!!errors.endDate}
        />
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Add Promocode"
            label="Add"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default CreatePromocodeModal;