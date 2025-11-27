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
        // Sanitize data to remove read-only fields like need_restock
        const payload = {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            total_quantity: productData.total_quantity,
            available_quantity: productData.available_quantity,
            image_url: productData.image_url,
        };

        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || JSON.stringify(errorData) || 'Failed to update product';
            throw new Error(errorMessage);
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

    /**
     * Buy a product (decrement available quantity)
     */
    async buyProduct(id: number): Promise<Product> {
        const response = await fetch(`${API_BASE_URL}/products/${id}/buy`, {
            method: 'POST',
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to purchase product');
        }
        return response.json();
    },

    /**
     * Admin login
     */
    async login(username: string, password: string): Promise<{ message: string; user: { id: number; username: string } }> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        return response.json();
    },
};
