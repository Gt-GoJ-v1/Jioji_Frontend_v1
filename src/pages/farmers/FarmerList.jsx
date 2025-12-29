import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { farmerApi } from '../../api/farmerApi';

const FarmerList = () => {
  const { data: farmers, loading } = useFetch(() => farmerApi.getAllFarmers());
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const farmerData = farmers?.content || [];

  const filteredFarmers = farmerData.filter(farmer =>
    (farmer.firstName + ' ' + farmer.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (farmer.village || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h2>Farmer List</h2>
          <div className="table-actions">
            <input
              type="text"
              placeholder="Search farmers..."
              className="search-box"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to="/admin/farmers/add" className="btn-success">+ Add Farmer</Link>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Village</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFarmers.length > 0 ? (
              filteredFarmers.map((farmer) => (
                <tr key={farmer.userId}>
                  <td>FMR_{farmer.userId}</td>
                  <td>{farmer.firstName} {farmer.lastName}</td>
                  <td>{farmer.village || 'N/A'}</td>
                  <td>{farmer.mobileNumber}</td>
                  <td>
                    <span className="status-badge active">Active</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/farmers/${farmer.userId}`} className="btn-icon" title="View">
                        👁️
                      </Link>
                      <Link to={`/admin/farmers/edit/${farmer.userId}`} className="btn-icon" title="Edit">
                        ✏️
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No farmers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmerList;