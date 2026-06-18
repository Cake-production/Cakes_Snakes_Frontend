import React, { useState, useEffect, useRef } from 'react';
import { productAPI } from '../services/api';
import { colors } from '../constants/theme';
import { Edit2, Trash2, Plus, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    badge: '',
    category: 'CAKES',
    stock: '',
    price: '',
    image: '📦',
    imageFile: null,
    imagePreview: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const categories = ['CAKES', 'TARTS', 'PASTRIES', 'SEASONAL', 'MACARONS', 'CHOCOLATES'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([{ id: 1, name: 'Sample Product', badge: 'Demo', stock: 10, price: 29.99, image: '📦', imageUrl: '📦' }]);
      toast.error('Using demo data - API not available');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(id);
        setProducts(products.filter((p) => p.id !== id));
        toast.success('Product deleted successfully');
      } catch (error) {
        console.error('Delete failed:', error);
        setProducts(products.filter((p) => p.id !== id));
        toast.success('Product removed locally (API failed)');
      }
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      badge: '',
      category: 'CAKES',
      stock: '',
      price: '',
      image: '📦',
      imageFile: null,
      imagePreview: null,
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      badge: product.badge || '',
      category: product.category || 'CAKES',
      stock: product.stock?.toString() || '',
      price: product.price?.toString() || '',
      image: product.image || product.imageUrl || '📦',
      imageFile: null,
      imagePreview: product.imageUrl && product.imageUrl.startsWith('data:') ? product.imageUrl : null,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: reader.result,
        image: reader.result, // store base64 in image field for payload
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      imageFile: null,
      imagePreview: null,
      image: '📦',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    const stockNum = parseInt(formData.stock);
    const priceNum = parseFloat(formData.price);
    if (isNaN(stockNum) || stockNum < 0) {
      toast.error('Valid stock quantity is required');
      return;
    }
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error('Valid price is required');
      return;
    }

    setIsSubmitting(true);

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim() || '',
      badge: formData.badge.trim() || 'General',
      category: formData.category,
      stock: stockNum,
      price: priceNum,
      image: formData.image || '📦',
    };

    try {
      let result;
      if (editingProduct) {
        result = await productAPI.update(editingProduct.id, productData);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? result : p));
        toast.success('Product updated successfully');
      } else {
        result = await productAPI.create(productData);
        setProducts(prev => [...prev, result]);
        toast.success('Product added successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Operation failed:', error);
      if (error.response) {
        toast.error(`Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        toast.error('Network error - cannot reach server. Changes saved locally.');
        const tempProduct = { ...productData, id: editingProduct?.id || Date.now(), imageUrl: productData.image };
        if (editingProduct) {
          setProducts(prev => prev.map(p => p.id === editingProduct.id ? tempProduct : p));
        } else {
          setProducts(prev => [...prev, tempProduct]);
        }
        setIsModalOpen(false);
      } else {
        toast.error(`Failed: ${error.message}. Changes saved locally.`);
        const tempProduct = { ...productData, id: editingProduct?.id || Date.now(), imageUrl: productData.image };
        if (editingProduct) {
          setProducts(prev => prev.map(p => p.id === editingProduct.id ? tempProduct : p));
        } else {
          setProducts(prev => [...prev, tempProduct]);
        }
        setIsModalOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px' }} className="font-bold">
            Inventory Management
          </h2>
          <button
            onClick={handleAddProduct}
            style={{ backgroundColor: colors.gold, cursor: 'pointer' }}
            className="px-6 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p style={{ color: '#666' }}>Loading inventory...</p>
          </div>
        ) : (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden' }} className="shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: colors.darkPlum, color: 'white' }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Stock Level</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Revenue</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <tr key={product.id} style={{ backgroundColor: idx % 2 === 0 ? colors.champagne : 'white', borderBottomColor: colors.lightGray }} className="border-b hover:opacity-80 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div style={{ fontSize: '24px' }}>
                          {(() => {
                            const imageSrc = product.imageUrl || product.image || '📦';
                            if (imageSrc.startsWith('data:image/')) {
                              return <img src={imageSrc} alt={product.name} className="w-12 h-12 object-cover rounded" />;
                            }
                            return imageSrc;
                          })()}
                        </div>
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            <p style={{ color: '#666' }} className="text-xs">{product.badge}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold">{product.stock} units</td>
                      <td className="px-6 py-4 font-semibold">${product.price}</td>
                      <td className="px-6 py-4">
                        <span style={{ backgroundColor: colors.success, color: 'white' }} className="text-xs px-3 py-1 rounded-full font-semibold">
                          In Stock
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: colors.gold }}>
                        ${(product.price * product.stock).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          style={{ color: colors.gold }}
                          className="hover:opacity-80 transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} style={{ color: colors.error }} className="hover:opacity-80 transition">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal - 2-column layout */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSubmit}>
              {/* 2-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Badge</label>
                    <input
                      type="text"
                      name="badge"
                      value={formData.badge}
                      onChange={handleInputChange}
                      placeholder="e.g., New, Limited, Bestseller"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Stock Quantity *</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Price ($) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0.01"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                      required
                    />
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Brief description of the product..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Image</label>
                    <div className="flex flex-col gap-2">
                      {/* Image preview */}
                      {formData.imagePreview ? (
                        <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div
                          className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-4xl"
                          style={{ backgroundColor: colors.champagne }}
                        >
                          {formData.image || '📦'}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          style={{ backgroundColor: colors.gold }}
                          className="px-4 py-2 text-sm font-semibold text-black rounded-lg hover:shadow-lg transition flex items-center gap-2"
                        >
                          <Upload size={16} />
                          Upload Image
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const emoji = prompt('Enter an emoji or text icon:', formData.image || '📦');
                            if (emoji !== null) {
                              setFormData(prev => ({
                                ...prev,
                                image: emoji || '📦',
                                imageFile: null,
                                imagePreview: null,
                              }));
                            }
                          }}
                          className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                          Use Emoji
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">Upload an image or use an emoji as fallback</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions - full width */}
              <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: colors.gold }}
                  className="px-6 py-2 text-black font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50"
                >
                  {isSubmitting ? (editingProduct ? 'Updating...' : 'Adding...') : (editingProduct ? 'Update Product' : 'Add Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default InventoryPage;