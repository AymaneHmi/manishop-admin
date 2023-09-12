'use client';

import Model from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRequest } from "@/hooks/use-request";
import { useForm } from "@/hooks/use-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { getCategories } from "@/actions/getCategories";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import useModel from "@/hooks/use-modal";
import Loader from "../ui/loader";

const initialCreateState = {
    title: '',
    category: '',
    sizes: [],
}

const initialEditState = {
    id: '',
    title: '',
    category: '',
    sizes: [],
}

const SubcategoryModel = () => {
    const {isOpen, onClose, type, data} = useModel();

    const isOpenModal = isOpen && (type === "createSubcategory" || type === "editSubcategory")

    const categories = getCategories();


    const [isLoading , setIsLoading] = useState(false)
    const [sizeInputValue , setSizeInputValue] = useState('');
    const [sizes , setSizes] = useState<string[]>([]);
    const [NullSize , setNullSize] = useState(false);

    const { formData: subcategory, handleChange: handleChangeCreate, resetForm: resetCreateForm } = useForm(
        initialCreateState
    );

    const { formData: editSubcategory, handleChange: handleChangeEdit, resetForm: resetEditForm } = useForm(
        initialEditState
    );

    useEffect(() => {
        if(!data?.subcategory) return;
        handleChangeEdit('id', data.subcategory.id);
        handleChangeEdit('title', data.subcategory.name);
        handleChangeEdit('category', data.subcategory.category_id);
        setNullSize(data.subcategory.sizes? false : true);
        setSizes(data.subcategory.sizes || []);
    },[data?.subcategory])

    const handleSubmit = () => {
        type === "createSubcategory" ? createSubcategory() : updateSubcategory();
    }

    const handleCloseModel = () => {
        resetCreateForm(initialCreateState);
        resetEditForm(initialEditState);
        setSizes([]);
        onClose();
    }

    const createSubcategory = async () => {
        setIsLoading(true)
        const data = {
            title: subcategory.title,
            category: subcategory.category,
            sizes: subcategory.sizes
        }
        const responseData = await useRequest.post(data, '/subcategory/subcategory.php');
        setIsLoading(false)
        if(responseData.error) {
            toast.error('something went wrong!');
            return ;
        } 
        handleCloseModel();
        toast.success('subcategory created.')
    }

    const updateSubcategory = async () => {
        setIsLoading(true)
        const data = {
            id: editSubcategory.id,
            title: editSubcategory.title,
            category: editSubcategory.category,
            sizes: editSubcategory.sizes
        }
        console.log(data)
        const responseData = await useRequest.patch(data, '/subcategory/subcategory.php');
        setIsLoading(false)
        if(responseData.error){
            toast.error('something went wrong!');
            return;
        }
        handleCloseModel();
        toast.success('subcategory updated');
    }

    const handlePressKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ' && sizeInputValue.trim() !== '') {
            const newTag = sizeInputValue.trim();
            setSizes((prevTags) => [...prevTags, newTag]);
            setSizeInputValue('');
        } 
    }

    const handleTagRemove = (index: number) => {
        const updatedSizes = sizes.filter((_, i) => i !== index);
        setSizes(updatedSizes);
    };

    useEffect(() => {
        type === "createSubcategory" && handleChangeCreate('sizes', sizes);
        type === "editSubcategory" && handleChangeEdit('sizes', sizes);
    },[sizes])

    let body;

    if(type === "createSubcategory"){
        body = (
            <>
                <Label htmlFor="title">Title</Label>
                <Input 
                    required 
                    type="text" 
                    placeholder="Title" 
                    onChange={(e) => handleChangeCreate('title', e.target.value)} 
                />
                <Label htmlFor="category">Category</Label>
                <Select 
                    required 
                    onValueChange={(category) => handleChangeCreate('category', category)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(category => (
                            <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="w-full flex flex-row items-center justify-between">
                    <Label htmlFor="sizes">Sizes (insert sizes of this subcategory)</Label>
                    <div className="flex flex-row items-center gap-2">
                        <Checkbox id="sizes" onCheckedChange={(e) => setNullSize(e as boolean)} />
                        <div className="grid gap-1.5 leading-none">
                            <label
                            htmlFor="sizes"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            No sizes
                            </label>
                        </div>
                    </div>
                </div>
                {!NullSize && <>
                    <Input type="text" placeholder="Sizes" onKeyDown={handlePressKey} value={sizeInputValue} onChange={(e) => setSizeInputValue(e.target.value)} />
                    <div className="flex flex-wrap gap-2 w-full">
                        {sizes.map((size,index) => (
                            <Badge key={index} className="w-fit space-x-2 font-light bg-br_primary hover:bg-br_secondary"><span>{size}</span><X onClick={() => handleTagRemove(index)} size={10} /></Badge>
                        ))}
                    </div>
                </>}
            </>
        )
    }

    if(type === "editSubcategory"){
        body = (
            <>
                <Label htmlFor="title">Title</Label>
                <Input 
                    required
                    defaultValue={editSubcategory.title} 
                    type="text" placeholder="Title" 
                    onChange={(e) => handleChangeEdit('title', e.target.value)} 
                />
                <Label htmlFor="category">Category</Label>
                <Select 
                    required
                    value={editSubcategory.category} 
                    onValueChange={(category) => handleChangeEdit('category', category)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(category => (
                            <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="w-full flex flex-row items-center justify-between">
                    <Label htmlFor="sizes">Sizes (insert sizes of this subcategory)</Label>
                    <div className="flex flex-row items-center gap-2">
                        <Checkbox id="sizes" defaultChecked={!data.subcategory?.sizes} onCheckedChange={(e) => setNullSize(e as boolean)} />
                        <div className="grid gap-1.5 leading-none">
                            <label
                            htmlFor="sizes"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            No sizes
                            </label>
                        </div>
                    </div>
                </div>
                {!NullSize && <>
                    <Input type="text" placeholder="Sizes" onKeyDown={handlePressKey} value={sizeInputValue} onChange={(e) => setSizeInputValue(e.target.value)} />
                    <div className="flex flex-wrap gap-2 w-full">
                        {editSubcategory.sizes?.map((size: string,index: number) => (
                            <Badge key={index} className="w-fit space-x-2 font-light bg-br_primary hover:bg-br_secondary"><span>{size}</span><X className="cursor-pointer" onClick={() => handleTagRemove(index)} size={10} /></Badge>
                        ))}
                    </div>
                </>}
            </>
        )
    }

    const label = (
        <>
            {type === "createSubcategory" ? 'Add subcategory' : 'Update subcategory'}
            <Loader
                isLoading={isLoading}
                size={15}
            />
        </>
    )

    return (
        <>
            <Model 
                title='Subcategories' 
                body={body} 
                label={label} 
                isOpen={isOpenModal} 
                onSubmit={handleSubmit}
                disabled={isLoading || !body}
                onClose={handleCloseModel} 
            />
        </>
    )
}

export default SubcategoryModel;