import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product, ProductFormData } from '../types/product.types';
import { productService } from '../services/productService';

// Import existing components
import { Header } from '../components/layout/Header';
import { Navigation } from '../components/layout/Navigation';
import { ProductTable } from '../components/features/ProductTable';
import { RestockAlerts } from '../components/features/RestockAlerts';
import { ProductForm } from '../components/features/ProductForm';

export function AdminDashboard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentView, setCurrentView] = useState<'products' | 'restock'>('products');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        // Check if user is authenticated
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/');
            return;
        }
        fetchProducts();
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const data = await productService.fetchProducts();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error('Error loading products:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
            setLoading(false);
        }
    };

    const handleAddProduct = async (productData: ProductFormData) => {
        try {
            const newProduct = await productService.createProduct(productData);
            setProducts([...products, newProduct]);
            setShowForm(false);
        } catch (err) {
            console.error('Error adding product:', err);
            alert('Failed to add product');
        }
    };

    const handleEditProduct = async (productData: ProductFormData) => {
        if (!editingProduct) return;

        try {
            const updatedProduct = await productService.updateProduct(editingProduct.id, productData);
            setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
            setEditingProduct(null);
            setShowForm(false);
        } catch (err) {
            console.error('Error updating product:', err);
            alert('Failed to update product');
        }
    };

    const handleDeleteProduct = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await productService.deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error deleting product:', err);
            alert('Failed to delete product');
        }
    };

    const handleResolveRestock = async (id: number) => {
        try {
            const updatedProduct = await productService.updateRestockStatus(id, false);
            setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        } catch (err) {
            console.error('Error resolving restock:', err);
            alert('Failed to resolve restock alert');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/');
    };

    const restockProducts = products.filter(p => p.need_restock);

    if (loading) {
        return (
            <div className="app-container flex items-center justify-center" style={{ minHeight: '100vh' }}>
                <div style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Loading products...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-container flex items-center justify-center" style={{ minHeight: '100vh' }}>
                <div style={{ color: 'var(--color-yellow)', fontSize: '1.25rem' }}>
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 20px 0' }}>
                <div></div>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: 'rgba(249, 199, 79, 0.8)',
                        color: 'var(--color-navy-primary)',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Logout & Back to Shop
                </button>
            </div>

            <Header onAddClick={() => { setEditingProduct(null); setShowForm(true); }} />
            <Navigation currentView={currentView} onViewChange={setCurrentView} />

            {currentView === 'products' ? (
                <ProductTable
                    products={products}
                    onEdit={(product) => { setEditingProduct(product); setShowForm(true); }}
                    onDelete={handleDeleteProduct}
                />
            ) : (
                <RestockAlerts products={restockProducts} onResolve={handleResolveRestock} />
            )}

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
                    onCancel={() => { setShowForm(false); setEditingProduct(null); }}
                />
            )}
        </div>
    );
}
