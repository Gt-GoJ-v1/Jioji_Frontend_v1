import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { adminApi } from '../../api/adminApi';

const EmployeeList = () => {
  const { data: employees, loading, setData } = useFetch(() => adminApi.getAllEmployees());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await adminApi.deleteEmployee(id);
        if (employees && employees.content) {
          setData({
            ...employees,
            content: employees.content.filter(emp => emp.userId !== id)
          });
        }
      } catch (error) {
        alert('Failed to delete employee: ' + error.message);
      }
    }
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const employeeData = employees?.content || [];

  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h2>Employee Management</h2>
          <div className="table-actions">
            <input type="text" placeholder="Search..." className="search-box" />
            <Link to="/admin/employees/add" className="btn-success">+ Add New Employee</Link>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Role</th>
              <th>Email/Username</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.length > 0 ? (
              employeeData.map((employee) => (
                <tr key={employee.userId}>
                  <td>EMP_{employee.userId}</td>
                  <td>{employee.role}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobileNumber}</td>
                  <td>
                    <span className="status-badge active">
                      Active
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" onClick={() => handleViewDetails(employee)} title="View">
                        👁️
                      </button>
                      <Link to={`/admin/employees/edit/${employee.userId}`} className="btn-icon" title="Edit">
                        ✏️
                      </Link>
                      <button className="btn-icon" onClick={() => handleDelete(employee.userId)} title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>NEW USER DETAILS</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ddd', margin: '0 auto 10px', overflow: 'hidden' }}>
                  <img src="https://ui-avatars.com/api/?name=Employee&background=random" alt="Employee" style={{ width: '100%', height: '100%' }} />
                </div>
                <h3>{selectedEmployee.email}</h3>
                <p style={{ color: '#666' }}>{selectedEmployee.role}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <strong>Email/Username:</strong><br />{selectedEmployee.email}
                </div>
                <div>
                  <strong>Phone Number:</strong><br />{selectedEmployee.mobileNumber}
                </div>
                <div>
                  <strong>User Type:</strong><br />{selectedEmployee.role}
                </div>
                <div>
                  <strong>Database ID:</strong><br />{selectedEmployee.userId}
                </div>
                <div>
                  <strong>Employee ID:</strong><br />{selectedEmployee.employeeId || 'N/A'}
                </div>
                <div>
                  <strong>Account Status:</strong><br />Active
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;