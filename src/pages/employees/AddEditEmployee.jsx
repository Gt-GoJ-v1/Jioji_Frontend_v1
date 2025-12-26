import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';

const AddEditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: '',
    surname: '',
    email: '',
    phoneNo: '',
    userType: '',
    designation: '',
    department: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const data = await adminApi.getEmployeeById(id);
        setFormData(data);
      } catch (err) {
        setError('Failed to load employee');
      }
    };

    if (id) {
      loadEmployee();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (id) {
        await adminApi.updateEmployee(id, formData);
      } else {
        await adminApi.createEmployee(formData);
      }
      navigate('/admin/employees');
    } catch (err) {
      setError(err.message || 'Failed to save employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-container">
      <div className="modal-header" style={{padding: '20px', borderBottom: '1px solid #eee'}}>
        <h2>{id ? 'Edit Employee' : 'Add New Employee'}</h2>
      </div>

      <div style={{padding: '20px'}}>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="Enter Employee ID"
                required
              />
            </div>

            <div className="form-group">
              <label>Surname</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Enter Surname"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone No.</label>
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Enter Phone"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>User Type</label>
              <select name="userType" value={formData.userType} onChange={handleChange} required>
                <option value="">Select User Type</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
              </select>
            </div>

            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter Designation"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter Department"
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="Administrator">Administrator</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <div className="file-upload">
              <p>📁 Upload</p>
              <input type="file" accept="image/*" style={{display: 'none'}} id="imageUpload" />
              <label htmlFor="imageUpload" style={{cursor: 'pointer', color: '#7B1FA2'}}>
                Choose file or drag & drop here
              </label>
            </div>
          </div>

          <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
            <button type="button" className="btn-cancel" onClick={() => navigate('/admin/employees')}>
              Cancel
            </button>
            <button type="submit" className="btn-success" disabled={loading}>
              {loading ? 'Saving...' : id ? 'Update' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditEmployee;