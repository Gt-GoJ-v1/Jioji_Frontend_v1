import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { productApi } from '../../api/productApi';

const ProductList = () => {
  const { data: products, loading, setData } = useFetch(() => productApi.getAllProducts());
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productApi.deleteProduct(id);
        setData(products.filter(p => p.id !== id));
      } catch (error) {
        alert('Failed to delete product');
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

  const productData = products || [
    { id: 1, name: 'Mac Tomato', category: 'Seed', stock: 'In Stock', price: '₹100' },
    { id: 2, name: 'Wheat Premium', category: 'Grain', stock: 'In Stock', price: '₹50' },
    { id: 3, name: 'Rice Gold', category: 'Grain', stock: 'Out of Stock', price: '₹75' }
  ];

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
              <th>Stock Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  <span className={`status-badge ${product.stock === 'In Stock' ? 'active' : 'pending'}`}>
                    {product.stock}
                  </span>
                </td>
                <td>{product.price}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" onClick={() => handleViewDetails(product)} title="View">
                      👁️
                    </button>
                    <Link to={`/admin/products/edit/${product.id}`} className="btn-icon" title="Edit">
                      ✏️
                    </Link>
                    <button className="btn-icon" onClick={() => handleDelete(product.id)} title="Delete">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
              <div style={{display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px'}}>
                <div style={{width: '150px', height: '150px', background: '#ddd', borderRadius: '8px'}}></div>
                <div>
                  <h3>{selectedProduct.name}</h3>
                  <p style={{color: '#666', marginTop: '5px'}}>ID: PRD{selectedProduct.id}</p>
                  <div style={{marginTop: '20px', display: 'grid', gap: '10px'}}>
                    <div><strong>Category:</strong> {selectedProduct.category}</div>
                    <div><strong>Price:</strong> {selectedProduct.price}</div>
                    <div><strong>Stock:</strong> {selectedProduct.stock}</div>
                    <div><strong>Description:</strong> High quality product suitable for all farming needs</div>
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