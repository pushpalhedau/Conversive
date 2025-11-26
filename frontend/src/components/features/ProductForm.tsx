import { useState, useEffect } from 'react';
import type { ProductFormData } from '../../types/product.types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: ProductFormData) => void;
    initialData?: ProductFormData;
    isEditing?: boolean;
}

export const ProductForm = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEditing = false,
}: ProductFormProps) => {
    const [formData, setFormData] = useState<ProductFormData>(
        initialData || {
            name: '',
            description: '',
            price: 0,
            total_quantity: 0,
            available_quantity: 0,
        }
    );

    // Update form data when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: '',
                description: '',
                price: 0,
                total_quantity: 0,
                available_quantity: 0,
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'price' || name === 'total_quantity' || name === 'available_quantity'
                    ? parseFloat(value) || 0
                    : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Product' : 'Add New Product'}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        required
                        className="form-input"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <div className="form-group">
                        <label className="form-label">Total Quantity</label>
                        <input
                            type="number"
                            name="total_quantity"
                            value={formData.total_quantity}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Available</label>
                        <input
                            type="number"
                            name="available_quantity"
                            value={formData.available_quantity}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
