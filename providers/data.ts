import { useFetch } from '@/hooks/use-fetch';
import { blog, category, color, discount, order, product, promocode, size, status, subcategory } from '@/lib/types';
import { create } from 'zustand';

const categoriesAPI: any = process.env.NEXT_PUBLIC_API + '/categories';
const subcategoriesAPI: any = process.env.NEXT_PUBLIC_API + '/subcategories';
const sizesAPI: any = process.env.NEXT_PUBLIC_API + '/sizes';
const colorsAPI: any = process.env.NEXT_PUBLIC_API + '/colors';
const productsAPI: any = process.env.NEXT_PUBLIC_API + '/private/products';
const discoutnsAPI: any = process.env.NEXT_PUBLIC_API + '/discounts';
const promocodesAPI: any = process.env.NEXT_PUBLIC_API + '/promocodes';
const blogsApi: any = process.env.NEXT_PUBLIC_API + '/blogs';
const statusesAPI: any = process.env.NEXT_PUBLIC_API + '/statuses';
const ordersAPI: any = process.env.NEXT_PUBLIC_API + '/orders';

interface UpdateDataProps {
    reloadCategories: boolean,
    updateCategories: () => void;

    reloadSubcategories: boolean,
    updateSubcategories: () => void;

    reloadSizes: boolean,
    updateSizes: () => void;

    reloadColors: boolean,
    updateColors: () => void;

    reloadProducts: boolean,
    updateProducts: () => void;

    reloadBlogs: boolean,
    updateBlogs: () => void;

    reloadStatuses: boolean,
    updateStatuses: () => void;

    reloadOrders: boolean,
    updateOrders: () => void;

    reloadDiscounts: boolean;
    updateDiscounts: () => void;

    reloadPromocodes: boolean;
    updatePromocodes: () => void;
}

export const useUpdateData = create<UpdateDataProps>((set) => ({
    reloadCategories: false,
    updateCategories: () => set((state) => ({ reloadCategories: !state.reloadCategories })),

    reloadSubcategories: false,
    updateSubcategories: () => set((state) => ({ reloadSubcategories: !state.reloadSubcategories })),

    reloadSizes: false,
    updateSizes: () => set((state) => ({ reloadSizes: !state.reloadSizes })),

    reloadColors: false,
    updateColors: () => set((state) => ({ reloadColors: !state.reloadColors })),

    reloadProducts: false,
    updateProducts: () => set((state) => ({ reloadProducts: !state.reloadProducts })),

    reloadBlogs: false,
    updateBlogs: () => set((state) => ({ reloadBlogs: !state.reloadBlogs })),

    reloadStatuses: false,
    updateStatuses: () => set((state) => ({ reloadStatuses: !state.reloadStatuses })),

    reloadOrders: false,
    updateOrders: () => set((state) => ({ reloadOrders: !state.reloadOrders })),

    reloadDiscounts: false,
    updateDiscounts: () => set((state) => ({ reloadDiscounts: !state.reloadDiscounts})),

    reloadPromocodes: false,
    updatePromocodes: () => set((state) => ({ reloadPromocodes: !state.reloadPromocodes})),
}))



export function useData() {
    const {
        reloadCategories,
        reloadSubcategories,
        reloadSizes,
        reloadColors,
        reloadProducts,
        reloadBlogs,
        reloadStatuses,
        reloadOrders,
        reloadDiscounts,
        reloadPromocodes
    } = useUpdateData();

    const {data: categories, isLoading: isLoadingCategories, error: errorCategories} = useFetch<category>({api:categoriesAPI, keyQuery: "Categories", reloadData: reloadCategories});
    const {data: subcategories, isLoading: isLoadingSubcategories, error: errorSubcategories} = useFetch<subcategory>({api:subcategoriesAPI, keyQuery: "subcategories", reloadData: reloadSubcategories});
    const {data: sizes, isLoading: isLoadingSizes, error: errorSizes} = useFetch<size>({api:sizesAPI, keyQuery: "sizes", reloadData: reloadSizes});
    const {data: colors, isLoading: isLoadingColors, error: errorColors} = useFetch<color>({api:colorsAPI, keyQuery: "colors", reloadData: reloadColors});
    const {data: products, isLoading: isLoadingProducts, error: errorProducts} = useFetch<product>({api:productsAPI, keyQuery: "products", reloadData: reloadProducts});
    const {data: blogs, isLoading: isLoadingBlogs, error: errorBlogs} = useFetch<blog>({api:blogsApi, keyQuery: "blogs", reloadData: reloadBlogs});
    const {data: statuses, isLoading: isLoadingStatuses, error: errorStatuses} = useFetch<status>({api:statusesAPI, keyQuery: "statuses", reloadData: reloadStatuses});
    const {data: orders, isLoading: isLoadingOrders, error: errorOrders} = useFetch<order>({api:ordersAPI, keyQuery: "orders", reloadData: reloadOrders});
    const {data: discounts, isLoading: isLoadingDiscounts, error: errorDiscounts} = useFetch<discount>({api:discoutnsAPI, keyQuery: "discounts", reloadData: reloadDiscounts});
    const {data: promocodes, isLoading: isLoadingPromocodes, error: errorPromocodes} = useFetch<promocode>({api:promocodesAPI, keyQuery: "promocodes", reloadData: reloadPromocodes});

    return {
        categories,
        isLoadingCategories,
        errorCategories,

        subcategories,
        isLoadingSubcategories,
        errorSubcategories,

        sizes,
        isLoadingSizes,
        errorSizes,

        colors,
        isLoadingColors,
        errorColors,

        products,
        isLoadingProducts,
        errorProducts,

        blogs,
        isLoadingBlogs,
        errorBlogs,

        statuses,
        isLoadingStatuses,
        errorStatuses,

        orders,
        isLoadingOrders,
        errorOrders,

        discounts,
        isLoadingDiscounts,
        errorDiscounts,

        promocodes,
        isLoadingPromocodes,
        errorPromocodes,

    }
}
