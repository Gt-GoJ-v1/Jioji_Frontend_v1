// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useFetch } from '../../hooks/useFetch';
// import { productApi } from '../../api/productApi';


// const ProductList = () => {
//   const { data: response, loading, setData } = useFetch(() => productApi.getAllProducts());
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const products = response?.content || [];

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await productApi.deleteProduct(id);
//         if (response && response.content) {
//           setData({
//             ...response,
//             content: response.content.filter(p => p.productId !== id)
//           });
//         }
//       } catch (error) {
//         alert('Failed to delete product: ' + error.message);
//       }
//     }
//   };

//   const handleViewDetails = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   if (loading) {
//     return <div className="loading"><div className="spinner"></div></div>;
//   }

//   const productData = products;

//   return (
//     <div>
//       <div className="table-container">
//         <div className="table-header">
//           <h2>Product & Category Management</h2>
//           <div className="table-actions">
//             <input type="text" placeholder="Search products..." className="search-box" />
//             <Link to="/admin/products/add" className="btn-success">+ Add New Product</Link>
//           </div>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Category</th>
//               <th>Status</th>
//               <th>Price</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productData.length > 0 ? (
//               productData.map((product) => (
//                 <tr key={product.productId}>
//                   <td>{product.productName}</td>
//                   <td>{product.category}</td>
//                   <td>
//                     <span className={`status-badge ${product.active ? 'active' : 'pending'}`}>
//                       {product.active ? 'Active' : 'Inactive'}
//                     </span>
//                   </td>
//                   <td>₹{product.price}</td>
//                   <td>
//                     <div className="action-buttons">
//                       <button className="btn-icon" onClick={() => handleViewDetails(product)} title="View">
//                         👁️
//                       </button>
//                       <Link to={`/admin/products/edit/${product.productId}`} className="btn-icon" title="Edit">
//                         ✏️
//                       </Link>
//                       <button className="btn-icon" onClick={() => handleDelete(product.productId)} title="Delete">
//                         🗑️
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No products found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {showModal && selectedProduct && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>PRODUCT DETAILS</h2>
//               <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
//             </div>
//             <div className="modal-body">
//               <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px' }}>
//                 <div style={{ width: '150px', height: '150px', background: '#ddd', borderRadius: '8px', overflow: 'hidden' }}>
//                   {selectedProduct.imageUrls?.[0] && <img src={selectedProduct.imageUrls[0]} alt={selectedProduct.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
//                 </div>
//                 <div>
//                   <h3>{selectedProduct.productName}</h3>
//                   <p style={{ color: '#666', marginTop: '5px' }}>ID: PRD{selectedProduct.productId}</p>
//                   <div style={{ marginTop: '20px', display: 'grid', gap: '10px' }}>
//                     <div><strong>Category:</strong> {selectedProduct.category}</div>
//                     <div><strong>Type:</strong> {selectedProduct.productType}</div>
//                     <div><strong>Price:</strong> ₹{selectedProduct.price}</div>
//                     <div><strong>Stock:</strong> {selectedProduct.stockQuantity}</div>
//                     <div><strong>Description:</strong> {selectedProduct.description || 'N/A'}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, MoreVertical, Eye, FileEdit, Trash2, Plus, X } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { productApi } from '../../api/productApi';

const ProductList = () => {
  const { data: response, loading, setData } = useFetch(() => productApi.getAllProducts());
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const menuRef = useRef(null);
  const products = response?.content || [];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products.filter(item => 
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productApi.deleteProduct(id);
        setData({
          ...response,
          content: response.content.filter(p => p.productId !== id)
        });
        setOpenMenuId(null);
      } catch (error) {
        alert('Failed to delete product: ' + error.message);
      }
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="page">
      {/* HEADER */}
      <div className="top">
        <h3>Product & category management</h3>
        <Link to="/admin/products/add" className="add-btn">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <div className="search">
          <input 
            type="text" 
            placeholder="User Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} color="#999" />
        </div>
        <select><option>Products</option></select>
        <select><option>Categories</option></select>
        <select><option>Date</option></select>
        <button className="clear" onClick={() => setSearchTerm("")}>Clear</button>
      </div>

      {/* TABLE BOX */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}><input type="checkbox" /></th>
              <th>SKU</th>
              <th>PRODUCT NAME</th>
              <th>CATEGORIES</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>STOCKS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.productId}>
                <td><input type="checkbox" /></td>
                <td>{product.sku || "TS-001"}</td>
                <td>{product.productName}</td>
                <td>{product.category}</td>
                <td>{product.price} Rs.</td>
                <td>{product.stockQuantity || 0}</td>
                <td>
                  <span className={product.active ? 'active' : 'out'}>
                    {product.active ? 'Active' : 'Out'}
                  </span>
                </td>
                <td className="action">
                  <div className="dots-container" onClick={() => setOpenMenuId(openMenuId === product.productId ? null : product.productId)}>
                    <MoreVertical size={20} />
                  </div>
                  
                  {openMenuId === product.productId && (
                    <div className="menu" ref={menuRef}>
                      <div className="menu-item" onClick={() => {setSelectedProduct(product); setShowModal(true); setOpenMenuId(null);}}>
                        <Eye size={16} className="menu-icon" /> View
                      </div>
                      <Link to={`/admin/products/edit/${product.productId}`} className="menu-item">
                        <FileEdit size={16} className="menu-icon" /> Edit
                      </Link>
                      <div className="menu-item" onClick={() => handleDelete(product.productId)}>
                        <Trash2 size={16} className="menu-icon" /> Delete
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION (Placed outside table-box) */}
      <div className="pagination-wrapper">
        <div className="pagination">
          <button className="page-btn">Pre</button>
          <button className="page-btn num active">1</button>
          <button className="page-btn num">2</button>
          <button className="page-btn num">3</button>
          <button className="page-btn">Next</button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span>PRODUCT DETAILS</span>
              <X size={18} style={{ cursor: 'pointer' }} onClick={() => setShowModal(false)} />
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '120px', height: '120px', background: '#eee', borderRadius: '8px' }}>
                  {selectedProduct.imageUrls?.[0] && <img src={selectedProduct.imageUrls[0]} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}}/>}
                </div>
                <div>
                  <h4>{selectedProduct.productName}</h4>
                  <p style={{color:'#888', fontSize:'12px', margin: '5px 0'}}>ID: PRD{selectedProduct.productId}</p>
                  <p><strong>Category:</strong> {selectedProduct.category}</p>
                  <p><strong>Price:</strong> {selectedProduct.price} Rs.</p>
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