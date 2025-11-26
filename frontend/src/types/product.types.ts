export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    total_quantity: number;
    available_quantity: number;
    need_restock: boolean;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    total_quantity: number;
    available_quantity: number;
}

export type View = 'products' | 'restock';

export interface ApiResponse<T> {
    data: T;
    status: number;
}
