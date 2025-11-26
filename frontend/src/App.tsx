import { useState, useEffect } from 'react';
import type { Product, ProductFormData, View } from './types/product.types';
import { productService } from './services/productService';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { ProductTable } from './components/features/ProductTable';
import { RestockAlerts } from './components/features/RestockAlerts';
import { ProductForm } from './components/features/ProductForm';
import './index.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>('products');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.fetchProducts();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
        alert(`Error deleting product: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
  };

  const handleFormSubmit = async (formData: ProductFormData) => {
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, formData);
      } else {
        await productService.createProduct(formData);
      }
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      alert(`Error saving product: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleMarkResolved = async (id: number) => {
    try {
      await productService.updateRestockStatus(id, false);
      fetchProducts();
    } catch (err) {
      console.error('Error updating restock status:', err);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="app-container flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)' }}>
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div style={{ fontSize: '1.25rem', color: 'var(--color-yellow-restock)' }}>
          Error: {error}
        </div>
      </div>
    );
  }

  const restockProducts = products.filter((p) => p.need_restock);

  const formInitialData = editingProduct
    ? {
      name: editingProduct.name,
      description: editingProduct.description,
      price: parseFloat(editingProduct.price),
      total_quantity: editingProduct.total_quantity,
      available_quantity: editingProduct.available_quantity,
    }
    : undefined;

  return (
    <div className="app-container">
      {/* Header Section */}
      <Header onAddProduct={handleAddProduct} showAddButton={currentView === 'products'} />

      {/* Navigation Tabs */}
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      {/* Main Content */}
      <div className="page-wrapper">
        {currentView === 'products' ? (
          <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <RestockAlerts products={restockProducts} onMarkResolved={handleMarkResolved} />
        )}
      </div>

      {/* Product Form Modal */}
      <ProductForm
        isOpen={showForm}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={formInitialData}
        isEditing={!!editingProduct}
      />
    </div>
  );
}

export default App;
