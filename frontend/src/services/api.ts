import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductFormData } from '../types/product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products',
            providesTags: ['Product'],
        }),
        getProduct: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
            providesTags: ['Product'],
        }),
        createProduct: builder.mutation<Product, ProductFormData>({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<Product, { id: number; data: Partial<ProductFormData> }>({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        getRestockList: builder.query<Product[], void>({
            query: () => '/restock/list',
            providesTags: ['Product'],
        }),
        updateRestockStatus: builder.mutation<Product, { id: number; need_restock: boolean }>({
            query: ({ id, need_restock }) => ({
                url: `/restock/update/${id}`,
                method: 'PUT',
                body: { need_restock },
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetRestockListQuery,
    useUpdateRestockStatusMutation,
} = productsApi;
