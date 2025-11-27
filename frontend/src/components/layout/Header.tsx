import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';

interface HeaderProps {
    onAddProduct: () => void;
    showAddButton: boolean;
}

export const Header = ({ onAddProduct, showAddButton }: HeaderProps) => {
    return (
        <div className="page-wrapper">
            <div className="flex items-center justify-between">
                <h1 className="text-white font-bold mb-4">Stock Management System</h1>
                {showAddButton && (
                    <Button variant="primary" icon={Plus} onClick={onAddProduct}>
                        Add Product
                    </Button>
                )}
            </div>
        </div>
    );
};
