
export type user = {
    id: number;
    username: string;
    fullName: string;
    email: string;
    imageSrc: string;
    number: string;
    address: string;
    city: string;
}

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
    createdAt: Date;
}

export type size = {
    id: number;
    name: string;
    value: string;
    createdAt: Date;
}

export type color = {
    id: number;
    name: string;
    value: string;
    createdAt: Date;
}

export type product = {
    id: number;
    category: category;
    subcategory: subcategory;
    title: string;
    description: string;
    tags: string[];
    slug: string;
    price: number;
    media: string[];
    sizes: size[];
    colors: color[];
    available: boolean;
    createdAt: Date;
}

export type discount = {
    id: number;
    name: string;
    discountAmount: number;
    productsIds: number[];
    startDate: Date;
    endDate: Date;
    createdAt: Date
}

export type promocode = {
    id: number;
    promocode: string;
    discountAmount: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date
}

export type status = {
    id: number;
    name: string;
    value: string;
    createdAt: Date;
}

export type order = {
    id: number;
    orderId: string;
    orderProducts: string;
    customerName: string;
    customerNumber: string;
    customerAddress: string;
    totalPrice: number;
    status: status;
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
    graphData: any[];
}