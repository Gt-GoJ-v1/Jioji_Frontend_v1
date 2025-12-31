import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';
import './Employee.css';

const AddEditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ===== PREVIEW STATE ===== */
  const [showPreview, setShowPreview] = useState(false);

  /* ===== FILE STATE ===== */
  const [files, setFiles] = useState({
    image: null,
    pan: null,
    aadhaar: null,
    passbook: null,
  });

  /* ===== FORM STATE (API Integration) ===== */
  const [formData, setFormData] = useState({
    employeeId: '',
    email: '',
    mobileNumber: '',
    role: '',
    password: '',
    fullName: '',
    companyName: '',
    address: '',
    city: '',
    permanentAddress: '',
    altMobileNumber: '',
    district: '',
    state: '',
    pfNumber: '',
    insuranceNumber: '',
    accountNumber: '',
    ifscCode: '',
    panNumber: '',
    vehicleNumber: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* ===== LOAD EMPLOYEE (API Integration) ===== */
  useEffect(() => {
    if (!id) return;

    const loadEmployee = async () => {
      try {
        const data = await adminApi.getEmployeeById(id);
        setFormData({
          ...data,
          password: '' // Don't load password for security
        });
      } catch (err) {
        setError('Failed to load employee');
      }
    };

    loadEmployee();
  }, [id]);

  /* ===== INPUT CHANGE ===== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ===== FILE UPLOAD ===== */
  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFiles((prev) => ({
      ...prev,
      [type]: {
        file,
        preview: URL.createObjectURL(file),
      },
    }));
  };

  /* ===== REMOVE FILE ===== */
  const removeFile = (type) => {
    setFiles((prev) => ({ ...prev, [type]: null }));
  };

  /* ===== SAVE USER (API Integration - UNCHANGED) ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mapping for backend consistency
    const payload = {
      ...formData,
      mobileNumber: parseInt(formData.mobileNumber)
    };

    try {
      if (id) {
        await adminApi.updateEmployee(id, payload);
      } else {
        await adminApi.createEmployee(payload);
      }
      navigate('/admin/employees');
    } catch (err) {
      setError(err.message || 'Failed to save employee');
    } finally {
      setLoading(false);
    }
  };

  /* ===== FIELD LABELS ===== */
  const fieldLabels = {
    employeeId: 'Emp ID',
    fullName: 'Full Name',
    email: 'Email ID',
    mobileNumber: 'Phone Number',
    role: 'User Type',
    companyName: 'Company Name',
    address: 'Address',
    city: 'City',
    permanentAddress: 'Permanent Address',
    altMobileNumber: 'Alt Mobile Number',
    district: 'District',
    state: 'State',
    pfNumber: 'PF Number',
    insuranceNumber: 'Insurance Number',
    accountNumber: 'Account Number',
    ifscCode: 'IFSC Code',
    panNumber: 'PAN Number',
    vehicleNumber: 'Vehicle Number',
    description: 'Description'
  };

  return (
    <>
      <div className="employee-wrapper">
        <div className="employee-card">
          <div className="employee-header">
            <h2>{id ? 'Edit Employee' : 'Add New Employee'}</h2>
            <p>Define item attributes and specifications</p>
          </div>

          {error && <div className="error-message" style={{color: 'red', padding: '10px', marginBottom: '10px'}}>{error}</div>}

          <form onSubmit={handleSubmit}>

            {/* ================= ROW 1 ================= */}
            <div className="grid-2">
              <div className="field">
                <label>Employee ID<span>*</span></label>
                <input 
                  name="employeeId" 
                  value={formData.employeeId} 
                  onChange={handleChange}
                  placeholder="Your Employee Id"
                  required
                />
              </div>

              <div className="field">
                <label>Full Name<span>*</span></label>
                <input 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                />
              </div>
            </div>

            {/* ================= ROW 2 ================= */}
            <div className="grid-2">
              <div className="field">
                <label>Email ID</label>
                <input 
                  type="email"
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="field">
                <label>Phone Number<span>*</span></label>
                <input 
                  type="tel"
                  name="mobileNumber" 
                  value={formData.mobileNumber} 
                  onChange={handleChange}
                  placeholder="XXXX XXXXX"
                  required
                />
              </div>
            </div>

            {/* ================= ROW 3 ================= */}
            <div className="grid-2">
              <div className="field">
                <label>User Type<span>*</span></label>
                <select name="role" value={formData.role} onChange={handleChange} required>
                  <option value="">User</option>
                  <option value="SURVEYOR">Surveyor</option>
                  <option value="LAB_TECHNICIAN">Lab Technician</option>
                  <option value="EMPLOYEE">Employee</option>
                </select>
              </div>

              <div className="field">
                <label>Company Name</label>
                <input 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleChange}
                  placeholder="Company Name"
                />
              </div>
            </div>

            {/* ================= ROW 4 ================= */}
            <div className="grid-2">
              <div className="field">
                <label>Address<span>*</span></label>
                <input 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange}
                  placeholder="Address"
                  required
                />
              </div>

              <div className="field">
                <label>City<span>*</span></label>
                <select name="city" value={formData.city} onChange={handleChange} required>
                  <option value="">Select City</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Pune">Pune</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>
            </div>

            {/* ================= ROW 5 ================= */}
            <div className="grid-2">
              <div className="field">
                <label>Permanent Address<span>*</span></label>
                <input 
                  name="permanentAddress" 
                  value={formData.permanentAddress} 
                  onChange={handleChange}
                  placeholder="Perment Address"
                  required
                />
              </div>

              <div className="field">
                <label>Alt Mobile Number</label>
                <input 
                  type="tel"
                  name="altMobileNumber" 
                  value={formData.altMobileNumber} 
                  onChange={handleChange}
                  placeholder="Alt Mobile Number"
                />
              </div>
            </div>

            {/* ================= ROW 6 ================= */}
            <div className="grid-2">
              <div className="field">
                <label>District<span>*</span></label>
                <input 
                  name="district" 
                  value={formData.district} 
                  onChange={handleChange}
                  placeholder="District Number"
                  required
                />
              </div>

              <div className="field">
                <label>State<span>*</span></label>
                <select name="state" value={formData.state} onChange={handleChange} required>
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
              </div>
            </div>

            {/* ================= ROW 7 ================= */}
            <div className="grid-2">
              <div className="field">
                <label>PF Number</label>
                <input 
                  name="pfNumber" 
                  value={formData.pfNumber} 
                  onChange={handleChange}
                  placeholder="Pf Number"
                />
              </div>

              <div className="field">
                <label>Insurance Number</label>
                <input 
                  name="insuranceNumber" 
                  value={formData.insuranceNumber} 
                  onChange={handleChange}
                  placeholder="Insurance Number"
                />
              </div>
            </div>

            {/* ================= ROW 8 ================= */}
            <div className="grid-2">
              <div className="field">
                <label>Account Number<span>*</span></label>
                <input 
                  name="accountNumber" 
                  value={formData.accountNumber} 
                  onChange={handleChange}
                  placeholder="Account Number"
                  required
                />
              </div>

              <div className="field">
                <label>IFSC Code<span>*</span></label>
                <input 
                  name="ifscCode" 
                  value={formData.ifscCode} 
                  onChange={handleChange}
                  placeholder="IFSC Code"
                  required
                />
              </div>
            </div>

            {/* ================= ROW 9 ================= */}
            <div className="grid-2">
              <div className="field">
                <label>PAN Number</label>
                <input 
                  name="panNumber" 
                  value={formData.panNumber} 
                  onChange={handleChange}
                  placeholder="PAN Number"
                />
              </div>

              <div className="field">
                <label>Vehicle Number</label>
                <input 
                  name="vehicleNumber" 
                  value={formData.vehicleNumber} 
                  onChange={handleChange}
                  placeholder="Vehicle Number"
                />
              </div>
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div className="field full">
              <label>Description</label>
              <textarea 
                rows="4" 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                placeholder="Additional details about the item..."
              />
            </div>

            {/* ================= UPLOAD SECTION ================= */}
            <div className="upload-grid">

              {/* Upload Image */}
              <div className="upload-box">
                <label>Upload Image</label>
                <div className="upload-row">
                  <label className="upload-btn">
                    ⬆ Upload
                    <input type="file" hidden onChange={(e) => handleFileUpload('image', e)} />
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
                    onClick={() => removeFile('image')}
                    disabled={!files.image}
                  >
                    Remove
                  </button>
                </div>
                <p>(You can drop and upload image)</p>
              </div>

              {/* Upload PAN Card */}
              <div className="upload-box">
                <label>Upload PAN Card</label>
                <div className="upload-row">
                  <label className="upload-btn">
                    ⬆ Upload
                    <input type="file" hidden onChange={(e) => handleFileUpload('pan', e)} />
                  </label>
                  <button 
                    type="button" 
                    className="preview-btn"
                    onClick={() => files.pan && window.open(files.pan.preview, '_blank')}
                    disabled={!files.pan}
                  >
                    Preview
                  </button>
                  <button 
                    type="button" 
                    className="remove-btn" 
                    onClick={() => removeFile('pan')}
                    disabled={!files.pan}
                  >
                    Remove
                  </button>
                </div>
                <p>(You can drop and upload PAN)</p>
              </div>

              {/* Upload Aadhaar Card */}
              <div className="upload-box">
                <label>Upload Aadhaar Card</label>
                <div className="upload-row">
                  <label className="upload-btn">
                    ⬆ Upload
                    <input type="file" hidden onChange={(e) => handleFileUpload('aadhaar', e)} />
                  </label>
                  <button 
                    type="button" 
                    className="preview-btn"
                    onClick={() => files.aadhaar && window.open(files.aadhaar.preview, '_blank')}
                    disabled={!files.aadhaar}
                  >
                    Preview
                  </button>
                  <button 
                    type="button" 
                    className="remove-btn" 
                    onClick={() => removeFile('aadhaar')}
                    disabled={!files.aadhaar}
                  >
                    Remove
                  </button>
                </div>
                <p>(You can drop and upload Aadhaar)</p>
              </div>

              {/* Upload Account Passbook */}
              <div className="upload-box">
                <label>Upload Account Passbook</label>
                <div className="upload-row">
                  <label className="upload-btn">
                    ⬆ Upload
                    <input type="file" hidden onChange={(e) => handleFileUpload('passbook', e)} />
                  </label>
                  <button 
                    type="button" 
                    className="preview-btn"
                    onClick={() => files.passbook && window.open(files.passbook.preview, '_blank')}
                    disabled={!files.passbook}
                  >
                    Preview
                  </button>
                  <button 
                    type="button" 
                    className="remove-btn" 
                    onClick={() => removeFile('passbook')}
                    disabled={!files.passbook}
                  >
                    Remove
                  </button>
                </div>
                <p>(You can drop and upload account Passbook)</p>
              </div>

            </div>

            {/* ================= ACTIONS ================= */}
            <div className="form-actions">
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? 'Saving...' : id ? 'Update User' : 'Save User'}
              </button>
              <button type="button" className="cancel-btn" onClick={() => navigate('/admin/employees')}>
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
            {/* MODAL HEADER */}
            <div className="modal-header">
              <h3>NEW USER DETAILS</h3>
              <span className="close" onClick={() => setShowPreview(false)}>×</span>
            </div>

            {/* PROFILE ROW */}
            <div className="profile-row">
              {files.image ? (
                <img src={files.image.preview} alt="profile" />
              ) : (
                <div className="profile-placeholder">No Image</div>
              )}
              <div className="profile-info">
                {formData.employeeId && (
                  <div className="emp-id">Emp ID: {formData.employeeId}</div>
                )}
                <div className="profile-actions">
                  <button 
                    className="edit-btn" 
                    type="button"
                    onClick={() => setShowPreview(false)}
                  >
                    Edit
                  </button>
                  <button className="block-btn" type="button">Block</button>
                </div>
              </div>
            </div>

            {/* DETAILS SECTION */}
            <div className="details-section">
              <div className="details-grid">
                {Object.entries(formData).map(([key, value]) =>
                  value && key !== 'password' ? (
                    <div 
                      key={key} 
                      className={key === 'description' ? 'detail-item full' : 'detail-item'}
                    >
                      <span className="detail-label">{fieldLabels[key] || key}</span>
                      <span className="detail-value">{value}</span>
                    </div>
                  ) : null
                )}
              </div>

              {/* VIEW BUTTONS */}
              {(files.pan || files.aadhaar || files.passbook) && (
                <div className="view-buttons">
                  {files.pan && (
                    <button 
                      className="view-btn" 
                      type="button"
                      onClick={() => window.open(files.pan.preview, '_blank')}
                    >
                      <span>View</span>
                      <span>PAN Number Image</span>
                    </button>
                  )}
                  {files.aadhaar && (
                    <button 
                      className="view-btn" 
                      type="button"
                      onClick={() => window.open(files.aadhaar.preview, '_blank')}
                    >
                      <span>View</span>
                      <span>Aadhaar No. Image</span>
                    </button>
                  )}
                  {files.passbook && (
                    <button 
                      className="view-btn" 
                      type="button"
                      onClick={() => window.open(files.passbook.preview, '_blank')}
                    >
                      <span>View</span>
                      <span>Account Passbook Image</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEditEmployee;