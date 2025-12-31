// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { productApi } from '../../api/productApi';

// const AddEditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     productName: '',
//     productType: 'SEED',
//     category: '',
//     breed: '',
//     description: '',
//     price: '',
//     stockQuantity: '',
//     active: true
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (id) {
//       loadProduct();
//     }
//   }, [id]);

//   const loadProduct = async () => {
//     try {
//       const response = await productApi.getProductById(id);
//       if (response) {
//         setFormData({
//           ...response,
//           price: response.price?.toString() || '',
//           stockQuantity: response.stockQuantity?.toString() || ''
//         });
//       }
//     } catch (error) {
//       alert('Failed to load product');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const payload = {
//       ...formData,
//       price: parseFloat(formData.price),
//       stockQuantity: parseInt(formData.stockQuantity)
//     };

//     try {
//       if (id) {
//         await productApi.updateProduct(id, payload);
//       } else {
//         await productApi.createProduct(payload);
//       }
//       navigate('/admin/products');
//     } catch (error) {
//       alert(error.message || 'Failed to save product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="table-container">
//       <div className="modal-header" style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
//         <h2>{id ? 'Edit Product' : 'Add New Product'}</h2>
//       </div>

//       <div style={{ padding: '20px' }}>
//         <form onSubmit={handleSubmit}>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Product Name</label>
//               <input
//                 type="text"
//                 name="productName"
//                 value={formData.productName}
//                 onChange={handleChange}
//                 placeholder="Enter product name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Product Type</label>
//               <select name="productType" value={formData.productType} onChange={handleChange} required>
//                 <option value="SEED">SEED</option>
//                 <option value="FERTILIZER">FERTILIZER</option>
//                 <option value="ACCESSORY">ACCESSORY</option>
//                 <option value="ANIMAL">ANIMAL</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Category</label>
//               <input
//                 type="text"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 placeholder="Enter category"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Breed (Optional)</label>
//               <input
//                 type="text"
//                 name="breed"
//                 value={formData.breed}
//                 onChange={handleChange}
//                 placeholder="Enter breed"
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Price (₹)</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 placeholder="Enter price"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Stock Quantity</label>
//               <input
//                 type="number"
//                 name="stockQuantity"
//                 value={formData.stockQuantity}
//                 onChange={handleChange}
//                 placeholder="Enter stock quantity"
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter product description"
//               style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
//             />
//           </div>

//           <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
//             <input
//               type="checkbox"
//               name="active"
//               id="active"
//               checked={formData.active}
//               onChange={handleChange}
//             />
//             <label htmlFor="active" style={{ marginBottom: 0 }}>Product is Active</label>
//           </div>

//           <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
//             <button type="button" className="btn-cancel" onClick={() => navigate('/admin/products')}>
//               Cancel
//             </button>
//             <button type="submit" className="btn-success" disabled={loading}>
//               {loading ? 'Saving...' : id ? 'Update' : 'Add Product'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEditProduct;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productApi } from '../../api/productApi';
import './product.css';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
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
    <>
      <div className="product-page">
        <h1 className="page-title">Product & category management</h1>
        <h2 className="page-subtitle">{id ? 'Edit Product' : 'Add New Product'}</h2>
        <p className="page-desc">Basic Information</p>

        <div className="product-card">
          <form onSubmit={handleSubmit}>
            {/* Grid Row 1 */}
            <div className="grid-2">
              <div className="field">
                <label>Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Ex: Product Name"
                  required
                />
              </div>

              <div className="field">
                <label>Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            {/* Grid Row 2 */}
            <div className="grid-2">
              <div className="field">
                <label>SKU / Product Code</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="TS-001"
                />
              </div>

              <div className="field">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="XXXX Rs"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Grid Row 3 */}
            <div className="grid-2">
              <div className="field">
                <label>Discount (optional)</label>
                <select 
                  name="discount"
                  onChange={handleChange}
                >
                  <option value="">0%</option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                </select>
              </div>

              <div className="field">
                <label>Status</label>
                <select 
                  name="productType" 
                  value={formData.productType} 
                  onChange={handleChange}
                  required
                >
                  <option value="SEED">Active</option>
                  <option value="FERTILIZER">Inactive</option>
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="checkbox-row">
              <label>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                />
                Seeds
              </label>
              <label>
                <input
                  type="checkbox"
                  name="farmProduct"
                />
                Farm Product
              </label>
            </div>

            {/* Description */}
            <div className="field full">
              <label>Product Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Additional details about the item..."
              />
            </div>

            {/* Upload Image Section */}
            <div className="upload-section">
              <label>Upload Image</label>
              <div className="upload-row">
                <label className="upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  📤 Upload
                </label>
                <button 
                  type="button" 
                  className="preview-btn"
                  onClick={() => setShowPreview(true)}
                >
                  Preview
                </button>
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={handleRemoveImage}
                  disabled={!imagePreview}
                >
                  Remove
                </button>
              </div>
              <p className="upload-hint">(You can drop and upload image)</p>
            </div>

            {/* Action Buttons */}
            <div className="action-row left-align">
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? 'Saving...' : id ? 'Update Product' : 'Save Product'}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => navigate('/admin/products')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {showPreview && (
        <div className="modal-overlay">
          <div className="modal-box">
            {/* ================= MODAL HEADER ================= */}
            <div className="modal-header">
              <h3>PRODUCT DETAILS</h3>
              <span className="close" onClick={() => setShowPreview(false)}>
                ×
              </span>
            </div>

            {/* ================= PREVIEW HEADER ================= */}
            <div className="preview-header">
              <div className="preview-image">
                {imagePreview ? (
                  <img src={imagePreview} alt="product" />
                ) : (
                  <span className="preview-image-placeholder">No Image</span>
                )}
              </div>

              <div className="preview-info">
                {formData.breed && (
                  <p className="preview-sku">
                    SKU: {formData.breed}
                  </p>
                )}
                <div className="preview-actions">
                  <button
                    className="edit-btn"
                    onClick={() => setShowPreview(false)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* ================= PREVIEW BODY ================= */}
            <div className="preview-body">
              <div className="preview-grid">
                {formData.productName && (
                  <div className="preview-item">
                    <span className="preview-label">Product Name:</span>
                    <span className="preview-value">
                      {formData.productName}
                    </span>
                  </div>
                )}

                {formData.price && (
                  <div className="preview-item">
                    <span className="preview-label">Price</span>
                    <span className="preview-value">
                      ₹{formData.price}
                    </span>
                  </div>
                )}

                {formData.stockQuantity && (
                  <div className="preview-item">
                    <span className="preview-label">Stock</span>
                    <span className="preview-value">
                      {formData.stockQuantity} units
                    </span>
                  </div>
                )}

                {formData.category && (
                  <div className="preview-item">
                    <span className="preview-label">Category:</span>
                    <span className="preview-value">{formData.category}</span>
                  </div>
                )}

                {formData.productType && (
                  <div className="preview-item">
                    <span className="preview-label">Status</span>
                    <span className="preview-value">
                      {formData.productType === 'SEED' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                )}

                {formData.breed && (
                  <div className="preview-item">
                    <span className="preview-label">SKU/Code</span>
                    <span className="preview-value">{formData.breed}</span>
                  </div>
                )}

                {formData.description && (
                  <div className="preview-item full">
                    <span className="preview-label">Description</span>
                    <p className="preview-description">
                      {formData.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEditProduct;