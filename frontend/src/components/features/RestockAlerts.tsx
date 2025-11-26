import type { Product } from '../../types/product.types';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface RestockAlertsProps {
    products: Product[];
    onMarkResolved: (id: number) => void;
}

export const RestockAlerts = ({ products, onMarkResolved }: RestockAlertsProps) => {
    if (products.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <CheckCircle
                    className="w-16 h-16 mx-auto mb-4"
                    style={{ color: 'var(--color-green-status)', margin: '0 auto 1rem' }}
                />
                <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    All products are well stocked!
                </p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {products.map((product) => (
                <div key={product.id} className="card">
                    <div className="flex justify-between items-center">
                        <div style={{ flex: 1 }}>
                            <div className="card-header">
                                <AlertTriangle
                                    className="w-5 h-5"
                                    style={{ color: 'var(--color-yellow-restock)' }}
                                />
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{product.name}</h3>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: 'var(--spacing-sm)' }}>
                                {product.description}
                            </p>
                            <div className="flex gap-md" style={{ fontSize: '0.875rem' }}>
                                <span>
                                    <strong>Available:</strong> {product.available_quantity}
                                </span>
                                <span>
                                    <strong>Total:</strong> {product.total_quantity}
                                </span>
                                <span>
                                    <strong>Price:</strong> ${product.price}
                                </span>
                            </div>
                        </div>
                        <Button variant="primary" onClick={() => onMarkResolved(product.id)}>
                            Mark Resolved
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
