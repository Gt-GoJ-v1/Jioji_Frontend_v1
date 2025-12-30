// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useFetch } from '../../hooks/useFetch';
// import { adminApi } from '../../api/adminApi';

// const Dashboard = () => {
//   const { data: stats, loading: statsLoading } = useFetch(() => adminApi.getDashboardStats());
//   const { data: farmersData, loading: farmersLoading } = useFetch(() => adminApi.getAllFarmers(0, 5));

//   if (statsLoading || farmersLoading) {
//     return <div className="loading"><div className="spinner"></div></div>;
//   }

//   const dashboardStats = stats || {
//     farmers: 0,
//     surveys: 0,
//     pending: 0,
//     employees: 0
//   };

//   const recentFarmers = farmersData?.content?.map(f => ({
//     name: f.farmerName,
//     village: f.village,
//     action: 'SURVEY SUBMITTED',
//     date: new Date(f.createdAt).toLocaleDateString()
//   })) || [];

//   return (
//     <div>
//       <div className="dashboard-stats">
//         <div className="stat-card purple">
//           <div className="stat-info">
//             <h3>{dashboardStats.farmers}</h3>
//             <p>Farmer</p>
//           </div>
//           <div className="stat-icon">👨‍🌾</div>
//         </div>

//         <div className="stat-card green">
//           <div className="stat-info">
//             <h3>{dashboardStats.surveys}</h3>
//             <p>Surveys</p>
//           </div>
//           <div className="stat-icon">📋</div>
//         </div>

//         <div className="stat-card orange">
//           <div className="stat-info">
//             <h3>{dashboardStats.pending}</h3>
//             <p>Pending</p>
//           </div>
//           <div className="stat-icon">⏳</div>
//         </div>

//         <div className="stat-card blue">
//           <div className="stat-info">
//             <h3>{dashboardStats.employees}</h3>
//             <p>Employees</p>
//           </div>
//           <div className="stat-icon">👥</div>
//         </div>
//       </div>

//       <div className="table-container">
//         <div className="table-header">
//           <h2>Recent Farmer</h2>
//           <Link to="/admin/farmers" className="btn-secondary">View All</Link>
//         </div>
//         <table>
//           <thead>
//             <tr>
//               <th>FARMER NAME</th>
//               <th>VILLAGE</th>
//               <th>LAST ACTION</th>
//               <th>DATE</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentFarmers.map((farmer, index) => (
//               <tr key={index}>
//                 <td>{farmer.name}</td>
//                 <td>{farmer.village}</td>
//                 <td>{farmer.action}</td>
//                 <td>{farmer.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="chart-container">
//         <div className="chart-header">
//           <h3>Survey Status Overview</h3>
//         </div>
//         <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
//           <div style={{ textAlign: 'center' }}>
//             <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(135deg, #4CAF50 70%, #7B1FA2 70%)', margin: '0 auto' }}></div>
//             <div style={{ marginTop: '20px' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
//                 <div style={{ width: '15px', height: '15px', background: '#4CAF50' }}></div>
//                 <span>Surveys Assigned</span>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                 <div style={{ width: '15px', height: '15px', background: '#7B1FA2' }}></div>
//                 <span>Pending</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { adminApi } from '../../api/adminApi';
import './styles/AdminDashboards.css';

const Dashboard = () => {
  // Keeping original API integration
  const { data: stats, loading: statsLoading } = useFetch(() => adminApi.getDashboardStats());
  const { data: farmersData, loading: farmersLoading } = useFetch(() => adminApi.getAllFarmers(0, 5));

  if (statsLoading || farmersLoading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const dashboardStats = stats || {
    farmers: "2,543",
    employees: "128",
    products: "847",
    orders: "1,294"
  };

  // Mock data for the graph bars
  const graphData = [
    { label: 'Sale1', actual: 60, plan: 90 },
    { label: 'Sale2', actual: 80, plan: 85 },
    { label: 'Sale3', actual: 40, plan: 95 },
    { label: 'Sale4', actual: 70, plan: 88 },
    { label: 'Sale5', actual: 75, plan: 92 },
    { label: 'Sale6', actual: 65, plan: 80 },
    { label: 'Sale7', actual: 30, plan: 85 },
    { label: 'Sale8', actual: 85, plan: 95 },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* 4 GREEN STAT CARDS */}
      <div className="stats-grid">
        <div className="stat-card-green">
          <div className="stat-main">
            <p>Total Users</p>
            <h3>{dashboardStats.farmers}</h3>
            <span className="stat-change">+12% from last month</span>
          </div>
          <div className="stat-icon-bg">👤</div>
        </div>
        <div className="stat-card-green">
          <div className="stat-main">
            <p>Employees</p>
            <h3>{dashboardStats.employees}</h3>
            <span className="stat-change">+5% from last month</span>
          </div>
          <div className="stat-icon-bg">👩‍💻</div>
        </div>
        <div className="stat-card-green">
          <div className="stat-main">
            <p>Products</p>
            <h3>{dashboardStats.products}</h3>
            <span className="stat-change">+23% from last month</span>
          </div>
          <div className="stat-icon-bg">📦</div>
        </div>
        <div className="stat-card-green">
          <div className="stat-main">
            <p>Total Orders</p>
            <h3>{dashboardStats.orders}</h3>
            <span className="stat-change">+8% from last month</span>
          </div>
          <div className="stat-icon-bg">🛍️</div>
        </div>
      </div>

      {/* ORDERS OVERVIEW */}
      <div className="content-box">
        <div className="box-header">
          <h2>Orders Overview</h2>
        </div>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>STATUS</th>
              <th>ASSIGNED EMPLOYEE</th>
              <th>LAST UPDATE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UIOO281</td>
              <td>ARIAN KHAN</td>
              <td className="status-active">ACTIVE</td>
              <td>R.D. JUNIOR</td>
              <td>DONE</td>
            </tr>
            <tr>
              <td>UIOO281</td>
              <td>ARIAN KHAN</td>
              <td className="status-pending">PENDING</td>
              <td>TOM CRUSE</td>
              <td>PENDING</td>
            </tr>
            <tr>
              <td>UIOO281</td>
              <td>ARIAN KHAN</td>
              <td className="status-done">DONE</td>
              <td>PAUL WALKER</td>
              <td>DONE</td>
            </tr>
          </tbody>
        </table>
        <div className="see-more-link">
          <Link to="/admin/orders">See More&gt;&gt;</Link>
        </div>
      </div>

      {/* GRAPH AND WORK STATS SECTION */}
      <div className="middle-grid">
        <div className="content-box">
          <div className="box-header">
            <h2>Order Track</h2>
            <div className="chart-legend">
              <span className="legend-item"><i className="legend-dot plan"></i> 60% Actual</span>
              <span className="legend-item"><i className="legend-dot actual"></i> 40% Plan</span>
            </div>
          </div>
          
          <div className="graph-container">
            <div className="y-axis">
              <span>80k</span><span>6k</span><span>2k</span><span>0</span>
            </div>
            <div className="bars-wrapper">
              {graphData.map((data, index) => (
                <div key={index} className="bar-group">
                  <div className="bar-stacked">
                    <div className="bar-plan" style={{ height: `${data.plan}%` }}></div>
                    <div className="bar-actual" style={{ height: `${data.actual}%` }}></div>
                  </div>
                  <span className="bar-label">{data.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-footer-months">
            <span>April</span>
            <span>Previous Month</span>
            <span>Current Month</span>
          </div>
        </div>

        <div className="content-box">
          <div className="box-header">
            <h2>Employee Work (day)</h2>
          </div>
          <div className="work-stats-panel">
            <div className="work-row">
              <div className="work-cell">Users: <span className="val">47</span></div>
              <div className="work-cell">TodayWork : <span className="val">35</span></div>
            </div>
            <div className="work-row">
              <div className="work-cell">Performance : <span className="val-green">89%</span></div>
              <div className="work-cell">Overall : <span className="val-green">72%</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM EMPLOYEE TABLE */}
      <div className="content-box">
        <div className="box-header">
          <h2>Visit Employee & Work Orders</h2>
        </div>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Employee ID</th>
              <th>Visit</th>
              <th>Tests</th>
              <th>WorkStatus</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Smith</td>
              <td>UIOO281</td>
              <td className="status-done-txt">Done</td>
              <td className="status-done-txt">Done</td>
              <td>Done</td>
              <td>In Progress</td>
            </tr>
            <tr>
              <td>Jane Doe</td>
              <td>UIOO281</td>
              <td className="status-pending-txt">Pending</td>
              <td className="status-pending-txt">Pending</td>
              <td>Pending</td>
              <td>------</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;