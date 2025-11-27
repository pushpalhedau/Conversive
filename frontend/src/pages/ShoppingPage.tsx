import { useState, useEffect } from 'react';
import type { Product } from '../types/product.types';
import { productService } from '../services/productService';
import { AdminLoginModal } from '../components/auth/AdminLoginModal';
import { SuccessModal } from '../components/ui/SuccessModal';

export function ShoppingPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [purchasingId, setPurchasingId] = useState<number | null>(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productService.fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuyNow = async (productId: number) => {
        setPurchasingId(productId);
        try {
            const updatedProduct = await productService.buyProduct(productId);
            setProducts(products.map(p => p.id === productId ? updatedProduct : p));
            setShowSuccessModal(true);
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Purchase failed');
        } finally {
            setPurchasingId(null);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <div>Loading products...</div>
            </div>
        );
    }

    return (
        <div className="app-container">
            {/* Header */}
            <div className="page-header">
                <h1 className="page-title">
                    Welcome to Our Store
                </h1>
                <button
                    onClick={() => setShowLoginModal(true)}
                    className="btn btn-admin"
                >
                    Login As Admin
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid-products">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        {/* Product Image */}
                        <div className="product-image-container">
                            {product.image_url ? (
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="product-image"
                                />
                            ) : (
                                <div className="product-placeholder">📦</div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="product-content">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>

                            <div className="product-meta">
                                <div className="product-price">
                                    ${product.price}
                                </div>
                                <div className={`product-stock ${product.available_quantity > 0 ? 'stock-ok' : 'stock-out'}`}>
                                    {product.available_quantity > 0 ? `${product.available_quantity} in stock` : 'Out of stock'}
                                </div>
                            </div>

                            <button
                                onClick={() => handleBuyNow(product.id)}
                                disabled={product.available_quantity === 0 || purchasingId === product.id}
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                            >
                                {purchasingId === product.id ? 'Processing...' : product.available_quantity === 0 ? 'Out of Stock' : 'Buy Now'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            <AdminLoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
            />
        </div>
    );
}
