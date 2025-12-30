import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, MoreVertical, Eye, Pencil, Trash2, Plus } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { farmerApi } from '../../api/farmerApi';
import './Farmers.css';

const FarmerList = () => {
  const { data: farmers, loading } = useFetch(() => farmerApi.getAllFarmers());
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // Close floating menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const farmerData = farmers?.content || [];

  const filteredFarmers = farmerData.filter(farmer =>
    (farmer.firstName + ' ' + farmer.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (farmer.village || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="header-top">
        <h2 className="title">Farmer List</h2>
        <Link to="/admin/farmers/add" className="add-btn">
          <Plus size={16} /> Add Farmer
        </Link>
      </div>

      {/* Filter Bar based on reference */}
      <div className="filters-bar">
        <div className="search-box-wrapper">
          <input
            type="text"
            placeholder="User Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} className="search-icon" />
        </div>
        <select className="filter-dropdown"><option>Village</option></select>
        <select className="filter-dropdown"><option>Status</option></select>
        <select className="filter-dropdown"><option>Date</option></select>
        <button className="clear-btn" onClick={() => setSearchTerm('')}>Clear</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th style={{ width: '40px' }}><input type="checkbox" className="custom-checkbox" /></th>
              <th>User ID</th>
              <th>Name</th>
              <th>Village</th>
              <th>Phone</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFarmers.map((farmer) => (
              <tr key={farmer.userId}>
                <td><input type="checkbox" className="custom-checkbox" /></td>
                <td>FMR_{farmer.userId}</td>
                <td>{farmer.firstName} {farmer.lastName}</td>
                <td>{farmer.village || 'N/A'}</td>
                <td>{farmer.mobileNumber}</td>
                <td>
                  <span className="status-active">Active</span>
                </td>
                <td className="action-cell">
                  <div className="dots-trigger" onClick={() => setOpenMenuId(openMenuId === farmer.userId ? null : farmer.userId)}>
                    <MoreVertical size={20} />
                  </div>
                  
                  {/* Floating Action Menu */}
                  {openMenuId === farmer.userId && (
                    <div className="floating-menu" ref={menuRef}>
                      <Link to={`/admin/farmers/${farmer.userId}`} className="menu-item">
                        <Eye size={16} className="purple-icon" /> View
                      </Link>
                      <Link to={`/admin/farmers/edit/${farmer.userId}`} className="menu-item">
                        <Pencil size={16} className="purple-icon" /> Edit
                      </Link>
                      <div className="menu-item delete">
                        <Trash2 size={16} className="purple-icon" /> Delete
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination based on reference */}
      <div className="pagination-wrapper">
        <div className="pagination">
          <button className="page-btn">Pre</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default FarmerList;