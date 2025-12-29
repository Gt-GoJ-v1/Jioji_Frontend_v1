import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productApi } from '../../api/productApi';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    productType: 'SEED',
    category: '',
    breed: '',
    description: '',
    price: '',
    stockQuantity: '',
    active: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await productApi.getProductById(id);
      if (response) {
        setFormData({
          ...response,
          price: response.price?.toString() || '',
          stockQuantity: response.stockQuantity?.toString() || ''
        });
      }
    } catch (error) {
      alert('Failed to load product');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stockQuantity: parseInt(formData.stockQuantity)
    };

    try {
      if (id) {
        await productApi.updateProduct(id, payload);
      } else {
        await productApi.createProduct(payload);
      }
      navigate('/admin/products');
    } catch (error) {
      alert(error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-container">
      <div className="modal-header" style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
        <h2>{id ? 'Edit Product' : 'Add New Product'}</h2>
      </div>

      <div style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label>Product Type</label>
              <select name="productType" value={formData.productType} onChange={handleChange} required>
                <option value="SEED">SEED</option>
                <option value="FERTILIZER">FERTILIZER</option>
                <option value="ACCESSORY">ACCESSORY</option>
                <option value="ANIMAL">ANIMAL</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                required
              />
            </div>

            <div className="form-group">
              <label>Breed (Optional)</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="Enter breed"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
            />
          </div>

          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              name="active"
              id="active"
              checked={formData.active}
              onChange={handleChange}
            />
            <label htmlFor="active" style={{ marginBottom: 0 }}>Product is Active</label>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button type="button" className="btn-cancel" onClick={() => navigate('/admin/products')}>
              Cancel
            </button>
            <button type="submit" className="btn-success" disabled={loading}>
              {loading ? 'Saving...' : id ? 'Update' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;