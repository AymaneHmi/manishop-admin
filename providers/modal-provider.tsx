'use client';

import AlertModal from "@/components/modals/alert-modal";
import CreateBlogModal from "@/components/modals/create-blog-modal";
import CreateCategoryModal from "@/components/modals/create-category-modal";
import CreateColorModal from "@/components/modals/create-color-modal";
import CreateDiscountModal from "@/components/modals/create-discount-modal";
import CreateProductModal from "@/components/modals/create-product-modal";
import CreatePromocodeModal from "@/components/modals/create-promocode-modal";
import CreateSizeModal from "@/components/modals/create-size-modal";
import CreateStatusModal from "@/components/modals/create-status-modal";
import CreateSubcategoryModal from "@/components/modals/create-subcategory-modal";
import EditBlogModal from "@/components/modals/edit-blog-modal";
import EditCategoryModal from "@/components/modals/edit-category-modal";
import EditColorModal from "@/components/modals/edit-color-modal";
import EditDiscountModal from "@/components/modals/edit-discount-modal";
import EditProductModal from "@/components/modals/edit-product-modal";
import EditPromocodeModal from "@/components/modals/edit-promocode-modal";
import EditSizeModal from "@/components/modals/edit-size-modal";
import EditStatusModal from "@/components/modals/edit-status-modal";
import EditSubcategoryModal from "@/components/modals/edit-subcategory-modal";
import ViewBlogModal from "@/components/modals/view-blog-modal";
import ViewCategoryModal from "@/components/modals/view-category-modal";
import ViewProductModal from "@/components/modals/view-product-modal";

export default function ModalProvider() {
    return (
        <>
        <AlertModal />

        <CreateCategoryModal />
        <EditCategoryModal/>
        <ViewCategoryModal />

        <CreateSubcategoryModal/>
        <EditSubcategoryModal/>

        <CreateSizeModal/>
        <EditSizeModal/>

        <CreateColorModal/>
        <EditColorModal />

        <CreateProductModal/>
        <EditProductModal/>
        <ViewProductModal />

        <CreateStatusModal/>
        <EditStatusModal/>

        <CreateDiscountModal/>
        <EditDiscountModal/>

        <CreatePromocodeModal/>
        <EditPromocodeModal/>

        <CreateBlogModal/>
        <EditBlogModal/>
        <ViewBlogModal />

        </>
    )
}