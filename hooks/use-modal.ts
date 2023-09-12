import { blog, category, product, subcategory } from "@/lib/types";
import { create } from "zustand";

export type ModalType = "createCategory" | "editCategory" | "createSubcategory" | "editSubcategory" | "createProduct" | "editProduct" | "createBlog" | "editBlog" | "alertModal" | "editProfile";

interface ModalData {
    category?: category;
    subcategory?: subcategory;
    product?: product;
    blog?: blog;
    itemId?: number;
    endPoint?: string;
    imageSrc?: string | null;
}

interface ModalProps {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

const useModal = create<ModalProps>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data) => set({ isOpen: true, type, data}),
    onClose: () => set({ isOpen: false, type: null }),
}))

export default useModal;