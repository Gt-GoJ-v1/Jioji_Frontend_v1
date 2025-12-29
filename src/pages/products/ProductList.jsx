import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { productApi } from '../../api/productApi';

const ProductList = () => {
  const { data: response, loading, setData } = useFetch(() => productApi.getAllProducts());
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = response?.content || [];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productApi.deleteProduct(id);
        if (response && response.content) {
          setData({
            ...response,
            content: response.content.filter(p => p.productId !== id)
          });
        }
      } catch (error) {
        alert('Failed to delete product: ' + error.message);
      }
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const productData = products;

  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h2>Product & Category Management</h2>
          <div className="table-actions">
            <input type="text" placeholder="Search products..." className="search-box" />
            <Link to="/admin/products/add" className="btn-success">+ Add New Product</Link>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productData.length > 0 ? (
              productData.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productName}</td>
                  <td>{product.category}</td>
                  <td>
                    <span className={`status-badge ${product.active ? 'active' : 'pending'}`}>
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>₹{product.price}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" onClick={() => handleViewDetails(product)} title="View">
                        👁️
                      </button>
                      <Link to={`/admin/products/edit/${product.productId}`} className="btn-icon" title="Edit">
                        ✏️
                      </Link>
                      <button className="btn-icon" onClick={() => handleDelete(product.productId)} title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>PRODUCT DETAILS</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px' }}>
                <div style={{ width: '150px', height: '150px', background: '#ddd', borderRadius: '8px', overflow: 'hidden' }}>
                  {selectedProduct.imageUrls?.[0] && <img src={selectedProduct.imageUrls[0]} alt={selectedProduct.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div>
                  <h3>{selectedProduct.productName}</h3>
                  <p style={{ color: '#666', marginTop: '5px' }}>ID: PRD{selectedProduct.productId}</p>
                  <div style={{ marginTop: '20px', display: 'grid', gap: '10px' }}>
                    <div><strong>Category:</strong> {selectedProduct.category}</div>
                    <div><strong>Type:</strong> {selectedProduct.productType}</div>
                    <div><strong>Price:</strong> ₹{selectedProduct.price}</div>
                    <div><strong>Stock:</strong> {selectedProduct.stockQuantity}</div>
                    <div><strong>Description:</strong> {selectedProduct.description || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;