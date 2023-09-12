
export type category = {
    id: number;
    name: string;
    description: string;
    image: string[];
    createdAt: Date;
}

export type subcategory = {
    id: number;
    name: string;
    category_id: number;
    category: string;
    sizes: string[];
    createdAt: Date;
}

export type product = {
    id: number;
    category: string;
    category_id: number;
    subcategory: string;
    subcategory_id: number;
    title: string;
    description: string;
    slug: string;
    price: number;
    images: string[];
    sizes: string[];
    available: boolean;
    createdAt: Date;
}

export type order = {
    id: number;
    orderId: string;
    products: string;
    name: string;
    phone: string;
    address: string;
    price: number;
    status: string;
    isPaid: boolean;
    createdAt: Date;
}

export type blog = {
    id: number;
    title: string;
    description: string;
    image: string[];
    author: string;
    slug: string;
    tags: string[];
    createdAt: Date;
}

export type storeInfo = {
    totalRevenue: number;
    sales: number;
    products: number;
}