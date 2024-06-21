import { blog, category, color, discount, product, promocode, size, status, subcategory } from "@/lib/types";
import { create } from "zustand";

export type ModalType = "createCategory" | "editCategory" | "createSubcategory" | "editSubcategory" | "createSize" | "editSize" | "createColor" | "editColor" | "createProduct" | "editProduct" | "createStatus" | "editStatus" | "createDiscount" | "editDiscount" | "createPromocode" | "editPromocode" | "createBlog" | "editBlog" | "alertModal" | "editProfile" | "viewCategory" | "viewProduct" | "viewBlog";

interface ModalData {
    category?: category;
    subcategory?: subcategory;
    size?: size;
    color?: color;
    product?: product;
    status?: status;
    discount?: discount;
    promocode?: promocode;
    blog?: blog;
    itemId?: number;
    endPoint?: string;
    reload?: () => void;
    imageSrc?: string | null;
}

interface ModalProps {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    showModal: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

const useModal = create<ModalProps>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    showModal: false,
    onOpen: (type, data) => {
        set({ isOpen: true, type, data})
        setTimeout(() => {
            set({ showModal: true});
        },100);
    },
    onClose: () => {
        set({ showModal: false});
        setTimeout(() => {
            set({ isOpen: false, type: null, data: {} })
        },300);
    },
}))

export default useModal;