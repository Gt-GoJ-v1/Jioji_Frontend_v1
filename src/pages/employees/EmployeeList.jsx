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
        setData(employees.filter(emp => emp.id !== id));
      } catch (error) {
        alert('Failed to delete employee');
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

  const employeeData = employees || [
    { id: 1, name: 'Devika', role: 'Admin', email: 'devika@mail.com', status: 'Active', department: 'IT' },
    { id: 2, name: 'Sunil', role: 'Manager', email: 'sunil@mail.com', status: 'Active', department: 'Sales' },
    { id: 3, name: 'Mohini', role: 'Staff', email: 'mohini@mail.com', status: 'Pending', department: 'HR' }
  ];

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
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>
                  <span className={`status-badge ${employee.status.toLowerCase()}`}>
                    {employee.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" onClick={() => handleViewDetails(employee)} title="View">
                      👁️
                    </button>
                    <Link to={`/admin/employees/edit/${employee.id}`} className="btn-icon" title="Edit">
                      ✏️
                    </Link>
                    <button className="btn-icon" onClick={() => handleDelete(employee.id)} title="Delete">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
              <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <div style={{width: '80px', height: '80px', borderRadius: '50%', background: '#ddd', margin: '0 auto 10px', overflow: 'hidden'}}>
                  <img src="/avatar-placeholder.png" alt="Employee" style={{width: '100%', height: '100%'}} />
                </div>
                <h3>{selectedEmployee.name}</h3>
                <p style={{color: '#666'}}>{selectedEmployee.role}</p>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                <div>
                  <strong>Email:</strong><br/>{selectedEmployee.email}
                </div>
                <div>
                  <strong>Phone Number:</strong><br/>+1234567890
                </div>
                <div>
                  <strong>User Type:</strong><br/>{selectedEmployee.role}
                </div>
                <div>
                  <strong>User ID:</strong><br/>EMP_{selectedEmployee.id}
                </div>
                <div>
                  <strong>Working State:</strong><br/>Maharashtra
                </div>
                <div>
                  <strong>Employee ID:</strong><br/>E-{selectedEmployee.id.toString().padStart(6, '0')}
                </div>
                <div>
                  <strong>User Status:</strong><br/>{selectedEmployee.status}
                </div>
                <div>
                  <strong>Department:</strong><br/>{selectedEmployee.department}
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