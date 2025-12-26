import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productApi } from '../../api/productApi';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    productCode: '',
    discountCategory: '',
    category: '',
    mrp: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await productApi.getProductById(id);
      setFormData(data);
    } catch (error) {
      alert('Failed to load product');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await productApi.updateProduct(id, formData);
      } else {
        await productApi.createProduct(formData);
      }
      navigate('/admin/products');
    } catch (error) {
      alert('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-container">
      <div className="modal-header" style={{padding: '20px', borderBottom: '1px solid #eee'}}>
        <h2>{id ? 'Edit Product' : 'Add New Product'}</h2>
      </div>

      <div style={{padding: '20px'}}>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Product Food</label>
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
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select category</option>
                <option value="Seed">Seed</option>
                <option value="Grain">Grain</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Fruit">Fruit</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Product Code</label>
              <input
                type="text"
                name="productCode"
                value={formData.productCode}
                onChange={handleChange}
                placeholder="Enter product code"
                required
              />
            </div>

            <div className="form-group">
              <label>Discount Category</label>
              <input
                type="text"
                name="discountCategory"
                value={formData.discountCategory}
                onChange={handleChange}
                placeholder="Enter discount"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>MRP</label>
              <input
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <select name="stock" value={formData.stock} onChange={handleChange} required>
                <option value="">Select stock status</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Limited">Limited</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <div className="file-upload">
              <p>📁 Upload</p>
              <input type="file" accept="image/*" style={{display: 'none'}} id="productImage" />
              <label htmlFor="productImage" style={{cursor: 'pointer', color: '#7B1FA2'}}>
                Choose file or drag & drop here
              </label>
            </div>
          </div>

          <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
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