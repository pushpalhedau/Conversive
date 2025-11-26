import type { Product } from '../../types/product.types';
import { Table } from '../ui/Table';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import { Edit, Trash2 } from 'lucide-react';

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
    const columns = [
        {
            header: 'Name',
            key: 'name',
        },
        {
            header: 'Description',
            key: 'description',
        },
        {
            header: 'Price',
            key: 'price',
            render: (value: string) => `$${value}`,
        },
        {
            header: 'Total Qty',
            key: 'total_quantity',
        },
        {
            header: 'Available',
            key: 'available_quantity',
        },
        {
            header: 'Status',
            key: 'need_restock',
            render: (value: boolean) => (
                <StatusBadge status={value ? 'restock' : 'in-stock'} />
            ),
        },
        {
            header: 'Actions',
            key: 'id',
            render: (_: any, row: Product) => (
                <div className="flex gap-sm">
                    <Button
                        variant="icon-edit"
                        icon={Edit}
                        onClick={() => onEdit(row)}
                        aria-label="Edit product"
                    />
                    <Button
                        variant="icon-delete"
                        icon={Trash2}
                        onClick={() => onDelete(row.id)}
                        aria-label="Delete product"
                    />
                </div>
            ),
        },
    ];

    return <Table columns={columns} data={products} />;
};
