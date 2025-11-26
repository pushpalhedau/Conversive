import type { Product, ProductFormData } from '../types/product.types';

const API_BASE_URL = 'http://localhost:5000/api';

export const productService = {
    /**
     * Fetch all products from the API
     */
    async fetchProducts(): Promise<Product[]> {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return response.json();
    },

    /**
     * Create a new product
     */
    async createProduct(productData: ProductFormData): Promise<Product> {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Failed to create product');
        }
        return response.json();
    },

    /**
     * Update an existing product
     */
    async updateProduct(id: number, productData: ProductFormData): Promise<Product> {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        return response.json();
    },

    /**
     * Delete a product
     */
    async deleteProduct(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
    },

    /**
     * Update restock status for a product
     */
    async updateRestockStatus(id: number, needRestock: boolean): Promise<Product> {
        const response = await fetch(`${API_BASE_URL}/restock/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ need_restock: needRestock }),
        });
        if (!response.ok) {
            throw new Error('Failed to update restock status');
        }
        return response.json();
    },
};
