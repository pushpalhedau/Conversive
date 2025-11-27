import { AlertTriangle, CheckCircle } from 'lucide-react';

interface StatusBadgeProps {
    status: 'in-stock' | 'restock';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    if (status === 'restock') {
        return (
            <span className="status-badge restock">
                <AlertTriangle className="w-3 h-3" />
                Restock
            </span>
        );
    }

    return (
        <span className="status-badge in-stock">
            <CheckCircle className="w-3 h-3" />
            In Stock
        </span>
    );
};
