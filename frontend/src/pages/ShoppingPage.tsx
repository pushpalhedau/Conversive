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
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0B1F3B 0%, #0A2540 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                <div style={{ fontSize: '1.25rem' }}>Loading products...</div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0B1F3B 0%, #0A2540 100%)',
            padding: '40px 20px'
        }}>
            {/* Header */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: 0
                }}>
                    Welcome to Our Store
                </h1>
                <button
                    onClick={() => setShowLoginModal(true)}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: 'rgba(10, 99, 105, 0.8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(10, 99, 105, 1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(10, 99, 105, 0.8)';
                    }}
                >
                    For Admin
                </button>
            </div>

            {/* Product Grid */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
            }}>
                {products.map(product => (
                    <div
                        key={product.id}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* Product Image */}
                        <div style={{
                            width: '100%',
                            height: '200px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            {product.image_url ? (
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <div style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '48px' }}>📦</div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div style={{ padding: '20px' }}>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: 'white',
                                marginBottom: '8px'
                            }}>
                                {product.name}
                            </h3>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: '14px',
                                marginBottom: '16px',
                                minHeight: '40px'
                            }}>
                                {product.description}
                            </p>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '16px'
                            }}>
                                <div style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: 'var(--color-green)',
                                }}>
                                    ${product.price}
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    color: product.available_quantity > 0 ? 'var(--color-green)' : 'var(--color-yellow)'
                                }}>
                                    {product.available_quantity > 0 ? `${product.available_quantity} in stock` : 'Out of stock'}
                                </div>
                            </div>

                            <button
                                onClick={() => handleBuyNow(product.id)}
                                disabled={product.available_quantity === 0 || purchasingId === product.id}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: product.available_quantity === 0 ? 'rgba(255, 255, 255, 0.1)' : 'var(--color-green)',
                                    color: product.available_quantity === 0 ? 'rgba(255, 255, 255, 0.3)' : 'var(--color-navy-primary)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: product.available_quantity === 0 ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (product.available_quantity > 0) {
                                        e.currentTarget.style.opacity = '0.9';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                }}
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
