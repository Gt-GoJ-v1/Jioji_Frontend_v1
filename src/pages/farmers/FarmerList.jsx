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

  const farmerData = farmers || [
    { id: 1, name: 'Ramesh Patil', village: 'Molkhi', phone: '9876543210', survey: 'Completed', status: 'Active' },
    { id: 2, name: 'Anita Desai', village: 'Boro', phone: '9876543211', survey: 'Pending', status: 'Active' },
    { id: 3, name: 'Suresh Kumar', village: 'Rammati', phone: '9876543212', survey: 'Completed', status: 'Active' }
  ];

  const filteredFarmers = farmerData.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.village.toLowerCase().includes(searchTerm.toLowerCase())
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
              <th>Name</th>
              <th>Village</th>
              <th>Phone</th>
              <th>Survey Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFarmers.map((farmer) => (
              <tr key={farmer.id}>
                <td>{farmer.name}</td>
                <td>{farmer.village}</td>
                <td>{farmer.phone}</td>
                <td>
                  <span className={`status-badge ${farmer.survey === 'Completed' ? 'delivered' : 'pending'}`}>
                    {farmer.survey}
                  </span>
                </td>
                <td>
                  <span className="status-badge active">{farmer.status}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/admin/farmers/${farmer.id}`} className="btn-icon" title="View">
                      👁️
                    </Link>
                    <Link to={`/admin/farmers/edit/${farmer.id}`} className="btn-icon" title="Edit">
                      ✏️
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmerList;