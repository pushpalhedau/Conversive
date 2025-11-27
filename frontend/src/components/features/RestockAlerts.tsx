import type { Product } from '../../types/product.types';
import { AlertTriangle, CheckCircle, Package, DollarSign, TrendingDown } from 'lucide-react';
import { Button } from '../ui/Button';

interface RestockAlertsProps {
    products: Product[];
    onMarkResolved: (id: number) => void;
}

export const RestockAlerts = ({ products, onMarkResolved }: RestockAlertsProps) => {
    if (products.length === 0) {
        return (
            <div className="empty-state">
                <CheckCircle className="icon-success" />
                <p>All products are well stocked!</p>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '8px' }}>
                    No restock alerts at this time
                </span>
            </div>
        );
    }

    const calculateStockPercentage = (available: number, total: number) => {
        return Math.round((available / total) * 100);
    };

    const getPriority = (percentage: number): 'high' | 'medium' => {
        return percentage < 10 ? 'high' : 'medium';
    };

    return (
        <div className="grid-container">
            {products.map((product) => {
                const stockPercentage = calculateStockPercentage(
                    product.available_quantity,
                    product.total_quantity
                );
                const priority = getPriority(stockPercentage);

                return (
                    <div key={product.id} className={`alert-card ${priority === 'high' ? 'critical' : ''}`}>
                        <div className="alert-header">
                            <div className="alert-info">
                                <div className="alert-title-row">
                                    <AlertTriangle
                                        className="w-5 h-5"
                                        style={{ color: priority === 'high' ? '#f87171' : 'var(--color-yellow-restock)' }}
                                    />
                                    <h3 className="alert-title">{product.name}</h3>
                                    <span className={`priority-badge ${priority}`}>
                                        {priority === 'high' ? '🔴 Critical' : '⚠️ Low'}
                                    </span>
                                </div>
                                {product.description && (
                                    <p className="alert-description">{product.description}</p>
                                )}
                            </div>
                        </div>

                        <div className="stock-progress">
                            <div className="stock-progress-label">
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <TrendingDown className="w-4 h-4" style={{ color: '#f87171' }} />
                                    Stock Level
                                </span>
                                <span style={{ fontWeight: 700, color: stockPercentage < 10 ? '#f87171' : 'var(--color-yellow-restock)' }}>
                                    {stockPercentage}%
                                </span>
                            </div>
                            <div className="stock-progress-bar">
                                <div
                                    className="stock-progress-fill"
                                    style={{
                                        width: `${stockPercentage}%`,
                                        background: stockPercentage < 10
                                            ? '#ef4444'
                                            : stockPercentage < 20
                                                ? 'var(--color-yellow-restock)'
                                                : 'var(--color-green-status)'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="stock-info-grid">
                            <div className="stock-info-item">
                                <div className="stock-info-label">
                                    <Package className="w-3 h-3" style={{ display: 'inline', marginRight: '4px' }} />
                                    Available
                                </div>
                                <div className={`stock-info-value ${stockPercentage < 10 ? 'low' : ''}`}>
                                    {product.available_quantity}
                                </div>
                            </div>
                            <div className="stock-info-item">
                                <div className="stock-info-label">Total Stock</div>
                                <div className="stock-info-value">{product.total_quantity}</div>
                            </div>
                            <div className="stock-info-item">
                                <div className="stock-info-label">
                                    <DollarSign className="w-3 h-3" style={{ display: 'inline', marginRight: '4px' }} />
                                    Price
                                </div>
                                <div className="stock-info-value price">${product.price}</div>
                            </div>
                        </div>

                        <div className="alert-actions">
                            <Button
                                variant="primary"
                                onClick={() => onMarkResolved(product.id)}
                            >
                                <CheckCircle className="w-4 h-4" />
                                Mark Resolved
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
