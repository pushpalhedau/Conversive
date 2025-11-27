import { useState, useEffect } from 'react';
import type { ProductFormData } from '../../types/product.types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Package, FileText, DollarSign, Image as ImageIcon, Boxes, CheckCircle2 } from 'lucide-react';

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
            image_url: '',
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
                image_url: '',
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

    const modalTitle = (
        <>
            <Package className="w-6 h-6" />
            {isEditing ? 'Edit Product' : 'Add New Product'}
        </>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label className="form-label form-label-required">
                        <Package className="w-4 h-4" />
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter product name"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <FileText className="w-4 h-4" />
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="form-textarea"
                        placeholder="Describe your product..."
                    />
                    <span className="form-hint">Optional: Add a detailed description</span>
                </div>

                <div className="form-group">
                    <label className="form-label form-label-required">
                        <DollarSign className="w-4 h-4" />
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        required
                        className="form-input"
                        placeholder="0.00"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <ImageIcon className="w-4 h-4" />
                        Image URL
                    </label>
                    <input
                        type="url"
                        name="image_url"
                        value={formData.image_url || ''}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="https://example.com/image.jpg"
                    />
                    <span className="form-hint">Optional: Paste a link to product image</span>
                    {formData.image_url && (
                        <div className="image-preview-container">
                            <img
                                src={formData.image_url}
                                alt="Preview"
                                className="image-preview"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                        </div>
                    )}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label form-label-required">
                            <Boxes className="w-4 h-4" />
                            Total Quantity
                        </label>
                        <input
                            type="number"
                            name="total_quantity"
                            value={formData.total_quantity}
                            onChange={handleChange}
                            min="0"
                            required
                            className="form-input"
                            placeholder="0"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label form-label-required">
                            <CheckCircle2 className="w-4 h-4" />
                            Available
                        </label>
                        <input
                            type="number"
                            name="available_quantity"
                            value={formData.available_quantity}
                            onChange={handleChange}
                            min="0"
                            required
                            className="form-input"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        {isEditing ? 'Update Product' : 'Add Product'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
