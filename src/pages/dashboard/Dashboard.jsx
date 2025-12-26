import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { adminApi } from '../../api/adminApi';

const Dashboard = () => {
  const { data: stats, loading } = useFetch(() => adminApi.getDashboardStats());

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const dashboardStats = stats || {
    farmers: 42,
    surveys: 18,
    pending: 6,
    employees: 12
  };

  const recentFarmers = [
    { name: 'RAMESH', village: 'MOLKHI', action: 'SURVEY FILLED', date: 'TODAY' },
    { name: 'ANITA', village: 'BORO', action: 'DATA UPDATED', date: 'YESTERDAY' },
    { name: 'SURESH', village: 'RAMMATI', action: 'SURVEY FILLED', date: '2 DAYS AGO' }
  ];

  return (
    <div>
      <div className="dashboard-stats">
        <div className="stat-card purple">
          <div className="stat-info">
            <h3>{dashboardStats.farmers}</h3>
            <p>Farmer</p>
          </div>
          <div className="stat-icon">👨‍🌾</div>
        </div>

        <div className="stat-card green">
          <div className="stat-info">
            <h3>{dashboardStats.surveys}</h3>
            <p>Surveys</p>
          </div>
          <div className="stat-icon">📋</div>
        </div>

        <div className="stat-card orange">
          <div className="stat-info">
            <h3>{dashboardStats.pending}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-icon">⏳</div>
        </div>

        <div className="stat-card blue">
          <div className="stat-info">
            <h3>{dashboardStats.employees}</h3>
            <p>Employees</p>
          </div>
          <div className="stat-icon">👥</div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h2>Recent Farmer</h2>
          <Link to="/admin/farmers" className="btn-secondary">View All</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>FARMER NAME</th>
              <th>VILLAGE</th>
              <th>LAST ACTION</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {recentFarmers.map((farmer, index) => (
              <tr key={index}>
                <td>{farmer.name}</td>
                <td>{farmer.village}</td>
                <td>{farmer.action}</td>
                <td>{farmer.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="chart-container">
        <div className="chart-header">
          <h3>Survey Status Overview</h3>
        </div>
        <div style={{display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', padding: '40px'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(135deg, #4CAF50 70%, #7B1FA2 70%)', margin: '0 auto'}}></div>
            <div style={{marginTop: '20px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px'}}>
                <div style={{width: '15px', height: '15px', background: '#4CAF50'}}></div>
                <span>Surveys Assigned</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div style={{width: '15px', height: '15px', background: '#7B1FA2'}}></div>
                <span>Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;