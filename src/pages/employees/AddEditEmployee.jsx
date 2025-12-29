import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';

const AddEditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: '',
    email: '',
    mobileNumber: '',
    role: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const data = await adminApi.getEmployeeById(id);
        setFormData({
          ...data,
          password: '' // Don't load password
        });
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

  return (
    <div className="table-container">
      <div className="modal-header" style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
        <h2>{id ? 'Edit Employee' : 'Add New Employee'}</h2>
      </div>

      <div style={{ padding: '20px' }}>
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
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="SURVEYOR">Surveyor</option>
                <option value="LAB_TECHNICIAN">Lab Technician</option>
                <option value="EMPLOYEE">General Employee</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
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
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter Mobile"
                required
              />
            </div>
          </div>

          {!id && (
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Initial Password"
                required={!id}
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
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
