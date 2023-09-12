'use client';

import AlertModal from "@/components/modals/alert-modal";
import BlogModal from "@/components/modals/blog-modal";
import CategoryModal from "@/components/modals/category-modal";
import EditProfileModal from "@/components/modals/edit-profile-modal";
import ProductsModal from "@/components/modals/product-modal";
import SubcategoryModal from "@/components/modals/subcategory-modal";

export default function ModalProvider() {
    return (
        <>
            <CategoryModal />
            <SubcategoryModal />
            <ProductsModal />
            <BlogModal />
            <AlertModal />
            <EditProfileModal />
        </>
    )
}