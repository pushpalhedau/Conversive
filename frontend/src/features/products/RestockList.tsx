import { useGetRestockListQuery, useUpdateRestockStatusMutation } from '../../services/api';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export const RestockList = () => {
    const { data: products, isLoading } = useGetRestockListQuery();
    const [updateRestockStatus] = useUpdateRestockStatusMutation();

    const handleMarkResolved = async (id: number) => {
        await updateRestockStatus({ id, need_restock: false });
    };

    if (isLoading) return <div className="text-center py-8">Loading...</div>;

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-xl text-gray-600">All products are well stocked!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="bg-white border-l-4 border-red-500 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center mb-2">
                                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                            <div className="flex space-x-4 text-sm">
                                <span className="text-gray-700">
                                    <strong>Available:</strong> {product.available_quantity}
                                </span>
                                <span className="text-gray-700">
                                    <strong>Total:</strong> {product.total_quantity}
                                </span>
                                <span className="text-gray-700">
                                    <strong>Price:</strong> ${product.price}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleMarkResolved(product.id)}
                            className="ml-4 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        >
                            Mark Resolved
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
