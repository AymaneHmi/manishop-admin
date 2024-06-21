'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import useModal from "@/hooks/use-modal";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useData, useUpdateData } from "@/providers/data";
import axios from "axios";
import { toast } from "../ui/use-toast";
import InputError from "../ui/input-error";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"  
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import Image from "next/image";
import { useMinimize } from "@/hooks/use-minimize";
import { product } from "@/lib/types";
import { codePattern } from "@/hooks/patterns";

const endPoint = process.env.NEXT_PUBLIC_API + '/discounts/discount';

interface InputsProps {
    name: string;
    discountAmount: number;
    productsIds: number[];
    startDate?: Date;
    endDate?: Date;
}

const CreateDiscountModal = () => {
    const {updateDiscounts} = useUpdateData();
    const {products} = useData();
    const {isOpen, onClose, type} = useModal();
    const [loading, setLoading] = useState(false);
    const isOpenModal = isOpen && type === "createDiscount"

    const [isSearchProductsClicked, setIsSearchProductsClicked] = useState(false)
    const [discountProducts, setDiscountProducts] = useState<product[] | []>([])

    const yesterdayDate = () => {
        let t = new Date();
        t.setDate(t.getDate() - 1);
        return t;
    };

    useEffect(() => {
        const productsIds = discountProducts?.map(product => (product.id))
        setValue("productsIds", productsIds)
    },[discountProducts])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<InputsProps>()

    const handleDiscountProduct = (product: product) => {
        setDiscountProducts(existProducts => {
            const productExist = existProducts.some(existProduct => (
                existProduct.id === product.id
            ))
            if(!productExist) {
                return [...existProducts, product];
            }
            return existProducts;
        })
        setIsSearchProductsClicked(false)
    }

    const onSubmit: SubmitHandler<InputsProps> = async (data) => {
        const resData = {
            ...data,
            name: data.name.toUpperCase()
        }
        setLoading(true)
        axios.post(endPoint, resData)
        .then(res => {
            toast({
                title: "Discount Created Seccussfuly"
            })
            reset();
            onClose();
            updateDiscounts();
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
        <Label htmlFor="discount amount">Discount amount</Label>
        <Input 
            type="number" 
            placeholder="EX. 25" 
            {...register("discountAmount", {required: true})}
        />
        <InputError
            isShow={!!errors.discountAmount}
        />
        <Label htmlFor="products">Products</Label>
        <p className="text-xs font-light">Choose products to apply the discount.</p>
        <div className="flex flex-col md:flex-row gap-2 items-start">
            <Button
                disabled={products?.length === discountProducts.length}
                type="button"
                variant={"outline"}
                onClick={() => setDiscountProducts(products)}
                className="w-full md:w-1/3"
            >
                Add All Products
            </Button>
            <Command className="w-full md:w-2/3">
                <CommandInput onFocus={() => setIsSearchProductsClicked(true)} placeholder="Search products..." />
                <CommandList className={isSearchProductsClicked ? '' : 'hidden'}>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Products">
                        {products?.map(product => (
                            <CommandItem onSelect={() => handleDiscountProduct(product)} key={product.id} className="cursor-pointer">
                                <div className="flex flex-row gap-2 items-center">
                                    <Image
                                        src={product?.media?.[0]}
                                        alt="product image"
                                        width={50}
                                        height={50}
                                        className="aspect-square object-cover rounded"
                                    />
                                    <h2 className="font-medium">{useMinimize(product.title, 30)}</h2>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>

        </div>
        <div className="flex flex-col">
            {discountProducts?.map(product => (
                <div className="flex flex-row items-center justify-between gap-2 border first:border-b-0 even:border-b-0 p-2" key={product.id}>
                    <div className="flex flex-row gap-2 items-center">
                        <Image
                            src={product?.media?.[0]}
                            alt="product image"
                            width={50}
                            height={50}
                            className="aspect-square object-cover rounded"
                        />
                        <h2 className="font-medium">{useMinimize(product.title, 30)}</h2>
                    </div>
                    <h3>{product.price}</h3>
                    <X size={20} className="cursor-pointer" onClick={() => setDiscountProducts(existProducts => existProducts?.filter(existProduct => (
                        existProduct.id !== product.id
                    )))} />
                </div>
            ))}
        </div>
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
                            format(new Date(watch("startDate")!), "PPP")
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
                            format(new Date(watch("endDate")!), "PPP")
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
        <Label htmlFor="name">Name</Label>
        <p className="text-xs font-light">Each name should be unique, and only use letters and numbers.</p>
        <Input 
            type="text" 
            placeholder="EX. SAVE25"
            style={{textTransform: "uppercase"}}
            {...register("name", {required: true, pattern: codePattern})}
        />
        <InputError
            isShow={!!errors.name}
        />
    </>)

    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onClose}
            title="Add Discount"
            label="Add"
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            body={body}
        />
    )
}

export default CreateDiscountModal;