import type { View } from '../../types/product.types';

interface NavigationProps {
    currentView: View;
    onViewChange: (view: View) => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
    return (
        <div className="page-wrapper" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="tab-container">
                <button
                    className={`tab ${currentView === 'products' ? 'active' : ''}`}
                    onClick={() => onViewChange('products')}
                >
                    All Products
                </button>
                <button
                    className={`tab ${currentView === 'restock' ? 'active' : ''}`}
                    onClick={() => onViewChange('restock')}
                >
                    Restock Alerts
                </button>
            </div>
        </div>
    );
};
