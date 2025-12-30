// import { useFetch } from '../../hooks/useFetch';
// import { labReportApi } from '../../api/labReportApi';

// const LabReports = () => {
//   const { data: reports, loading } = useFetch(() => labReportApi.getAllReports());

//   if (loading) {
//     return <div className="loading"><div className="spinner"></div></div>;
//   }

//   const reportsData = reports || [];

//   return (
//     <div>
//       <div className="table-container">
//         <div className="table-header">
//           <h2>Lab Test Reports</h2>
//           <div className="table-actions">
//             <input type="text" placeholder="Search..." className="search-box" />
//           </div>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Report ID</th>
//               <th>Farmer Name</th>
//               <th>Village</th>
//               <th>Sample Date</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reportsData.length > 0 ? (
//               reportsData.map((report) => (
//                 <tr key={report.id}>
//                   <td>LR_{report.id}</td>
//                   <td>{report.farmerName}</td>
//                   <td>{report.village || 'N/A'}</td>
//                   <td>{new Date(report.sampleDate).toLocaleDateString()}</td>
//                   <td>
//                     <span className={`status-badge ${report.status === 'COMPLETED' ? 'delivered' : 'pending'}`}>
//                       {report.status}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="action-buttons">
//                       <button className="btn-icon" title="View">👁️</button>
//                       <button className="btn-icon" title="Download">⬇️</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No lab reports found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LabReports;


import React, { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, Eye, Pencil, Trash2, Download } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { labReportApi } from '../../api/labReportApi';
import './Lab.css';

const LabReports = () => {
  const { data: reports, loading } = useFetch(() => labReportApi.getAllReports());
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // Close action menu when clicking outside
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

  const reportsData = reports || [];

  return (
    <div className="page-container">
      <div className="header-section">
        <h2 className="title">Soils Test Reports</h2>
        <p className="subtitle">This is where admins scan and manage reports.</p>
      </div>

      {/* FILTER BAR */}
      <div className="filters-container">
        <div className="search-wrapper">
          <input type="text" placeholder="User Search" />
          <Search size={18} className="search-icon" />
        </div>
        <select className="filter-select"><option>Date</option></select>
        <select className="filter-select"><option>Farmer</option></select>
        <select className="filter-select"><option>Village</option></select>
        <button className="clear-btn">Clear</button>
      </div>

      {/* TABLE BOX */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th style={{ width: '40px' }}><input type="checkbox" className="custom-checkbox" /></th>
              <th>Report ID</th>
              <th>Farmer Name</th>
              <th>Village</th>
              <th>Sample Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.map((report) => (
              <tr key={report.id}>
                <td><input type="checkbox" className="custom-checkbox" /></td>
                <td>LR-{report.id}</td>
                <td>{report.farmerName}</td>
                <td>{report.village || 'B-21'}</td>
                <td>{new Date(report.sampleDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td>
                <td>
                  <span className={`status-text ${report.status?.toLowerCase()}`}>
                    {report.status || 'Complete'}
                  </span>
                </td>
                <td className="action-cell">
                  <div className="dots-trigger" onClick={() => setOpenMenuId(openMenuId === report.id ? null : report.id)}>
                    <MoreVertical size={20} />
                  </div>
                  
                  {openMenuId === report.id && (
                    <div className="action-menu" ref={menuRef}>
                      <div className="menu-item"><Eye size={16} color="#5a166c" /> View</div>
                      <div className="menu-item"><Pencil size={16} color="#5a166c" /> Edit</div>
                      <div className="menu-item"><Trash2 size={16} color="#5a166c" /> Delete</div>
                      <div className="menu-item"><Download size={16} color="#5a166c" /> Download</div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination-footer">
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

export default LabReports;