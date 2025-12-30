// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useFetch } from '../../hooks/useFetch';
// import { farmerApi } from '../../api/farmerApi';

// const FarmerDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data: farmer, loading } = useFetch(() => farmerApi.getFarmerById(id), [id]);

//   if (loading) {
//     return <div className="loading"><div className="spinner"></div></div>;
//   }

//   if (!farmer) return null;

//   const farmerData = {
//     name: `${farmer.firstName} ${farmer.lastName}`,
//     village: farmer.village || 'N/A',
//     phone: farmer.mobileNumber,
//     email: farmer.email,
//     address: farmer.village || 'N/A', // Using village as placeholder for address
//     survey: 'Completed', // Placeholder
//     lastVisit: 'N/A' // Placeholder
//   };

//   return (
//     <div>
//       <div className="table-container">
//         <div className="modal-header" style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
//           <h2>Farmer Details</h2>
//           <button className="btn-secondary" onClick={() => navigate('/admin/farmers')}>Back</button>
//         </div>

//         <div style={{ padding: '30px' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
//             <div>
//               <h3 style={{ marginBottom: '20px', color: '#333' }}>Personal Information</h3>
//               <div style={{ display: 'grid', gap: '15px' }}>
//                 <div>
//                   <strong>Name:</strong>
//                   <p>{farmerData.name}</p>
//                 </div>
//                 <div>
//                   <strong>Village:</strong>
//                   <p>{farmerData.village}</p>
//                 </div>
//                 <div>
//                   <strong>Phone:</strong>
//                   <p>{farmerData.phone}</p>
//                 </div>
//                 <div>
//                   <strong>Email:</strong>
//                   <p>{farmerData.email}</p>
//                 </div>
//                 <div>
//                   <strong>Address:</strong>
//                   <p>{farmerData.address}</p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 style={{ marginBottom: '20px', color: '#333' }}>Farm Information</h3>
//               <div style={{ display: 'grid', gap: '15px' }}>
//                 <div>
//                   <strong>Farm Size:</strong>
//                   <p>{farmerData.farmSize}</p>
//                 </div>
//                 <div>
//                   <strong>Crops:</strong>
//                   <p>{farmerData.crops}</p>
//                 </div>
//                 <div>
//                   <strong>Survey Status:</strong>
//                   <p>
//                     <span className={`status-badge ${farmerData.survey === 'Completed' ? 'delivered' : 'pending'}`}>
//                       {farmerData.survey}
//                     </span>
//                   </p>
//                 </div>
//                 <div>
//                   <strong>Last Visit:</strong>
//                   <p>{farmerData.lastVisit}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
//             <button className="btn-primary">Update Information</button>
//             <button className="btn-secondary" onClick={() => navigate(`/admin/farmers/${id}/survey`)}>
//               Fill Survey
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerDetail;


// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useFetch } from '../../hooks/useFetch';
// import { farmerApi } from '../../api/farmerApi';

// const FarmerDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data: farmer, loading } = useFetch(() => farmerApi.getFarmerById(id), [id]);

//   if (loading) {
//     return <div className="loading"><div className="spinner"></div></div>;
//   }

//   const farmerData = farmer || {
//     name: 'Ramesh Patil',
//     village: 'Molkhi',
//     phone: '9876543210',
//     email: 'ramesh@mail.com',
//     address: 'Village Molkhi, Maharashtra',
//     farmSize: '5 acres',
//     crops: 'Rice, Wheat',
//     survey: 'Completed',
//     lastVisit: '2024-03-15'
//   };

//   return (
//     <div>
//       <div className="table-container">
//         <div className="modal-header" style={{padding: '20px', borderBottom: '1px solid #eee'}}>
//           <h2>Farmer Details</h2>
//           <button className="btn-secondary" onClick={() => navigate('/admin/farmers')}>Back</button>
//         </div>

//         <div style={{padding: '30px'}}>
//           <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
//             <div>
//               <h3 style={{marginBottom: '20px', color: '#333'}}>Personal Information</h3>
//               <div style={{display: 'grid', gap: '15px'}}>
//                 <div>
//                   <strong>Name:</strong>
//                   <p>{farmerData.name}</p>
//                 </div>
//                 <div>
//                   <strong>Village:</strong>
//                   <p>{farmerData.village}</p>
//                 </div>
//                 <div>
//                   <strong>Phone:</strong>
//                   <p>{farmerData.phone}</p>
//                 </div>
//                 <div>
//                   <strong>Email:</strong>
//                   <p>{farmerData.email}</p>
//                 </div>
//                 <div>
//                   <strong>Address:</strong>
//                   <p>{farmerData.address}</p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 style={{marginBottom: '20px', color: '#333'}}>Farm Information</h3>
//               <div style={{display: 'grid', gap: '15px'}}>
//                 <div>
//                   <strong>Farm Size:</strong>
//                   <p>{farmerData.farmSize}</p>
//                 </div>
//                 <div>
//                   <strong>Crops:</strong>
//                   <p>{farmerData.crops}</p>
//                 </div>
//                 <div>
//                   <strong>Survey Status:</strong>
//                   <p>
//                     <span className={`status-badge ${farmerData.survey === 'Completed' ? 'delivered' : 'pending'}`}>
//                       {farmerData.survey}
//                     </span>
//                   </p>
//                 </div>
//                 <div>
//                   <strong>Last Visit:</strong>
//                   <p>{farmerData.lastVisit}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div style={{marginTop: '30px', display: 'flex', gap: '10px'}}>
//             <button className="btn-primary">Update Information</button>
//             <button className="btn-secondary" onClick={() => navigate(`/admin/farmers/${id}/survey`)}>
//               Fill Survey
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerDetail;
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { farmerApi } from '../../api/farmerApi';
import './FarmersDetails.css';

const FarmerDetail = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(() => farmerApi.getFarmerById(id), [id]);

  if (loading) return <div className="loading-state">Loading...</div>;

  const farmerData = data || {
    feedbackId: 'FB-1021',
    status: 'New',
    name: 'Ramesh Patil',
    userName: 'Ramesh Patil',
    phone: 'XXXXX XXXXX',
    empId: 'XXXXX XXXXX',
    address: 'Village Pune, Maharashtra',
    category: 'Issue',
    rating: 4,
    submittedOn: '12 Mar 2024',
    message: 'The seeds quality was not as expected.\nGermination rate was low compared to last time.',
    orderTime: '12 Mar, 10:30 AM',
    paymentMethod: 'Online',
    paymentStatus: 'Paid',
    transactionId: 'TXN98765',
  };

  return (
    <div className="detail-page-wrapper">
      {/* HEADER SECTION */}
      <div className="detail-header">
        <h3 className="title-green">View Feedback</h3>
        <div className="header-meta">
          <span>Feedback ID: <b>{farmerData.status}</b></span>
          <span>Status: <b>{farmerData.feedbackId}</b></span>
        </div>
      </div>

      {/* FARMER INFO */}
      <div className="detail-section">
        <div className="grey-section-bar">Farmer Information</div>
        <div className="info-grid">
          <div className="info-item"><span>Name</span><span>: {farmerData.name}</span></div>
          <div className="info-item"><span>User Name</span><span>: {farmerData.userName}</span></div>
          <div className="info-item"><span>Phone No</span><span>: {farmerData.phone}</span></div>
          <div className="info-item"><span>Emp ID</span><span>: {farmerData.empId}</span></div>
          <div className="info-item full"><span>Addres</span><span>: {farmerData.address}</span></div>
        </div>
      </div>

      {/* FEEDBACK DETAILS */}
      <div className="detail-section">
        <div className="grey-section-bar">Feedback Details</div>
        <div className="info-grid">
          <div className="info-item"><span>Category</span><span>: {farmerData.category}</span></div>
          <div className="info-item">
            <span>Rating</span>
            <span className="star-rating">: {'★'.repeat(farmerData.rating)}{'☆'.repeat(5 - farmerData.rating)}</span>
          </div>
          <div className="info-item"><span>Submitted On</span><span>: {farmerData.submittedOn}</span></div>
        </div>
        <div className="detail-message-box">
          “{farmerData.message}”
        </div>
      </div>

      {/* ATTACHMENTS */}
      <div className="detail-section">
        <div className="grey-section-bar">Attachments (if any)</div>
        <div className="attachment-group">
          <div className="preview-square">
            <div className="img-placeholder">🖼</div>
            <span className="file-label">(Photo.png)</span>
          </div>
          <button className="grey-outline-btn">Download</button>
        </div>
      </div>

      {/* ORDER STATUS */}
      <div className="detail-section">
        <div className="grey-section-bar">Order Status Timeline</div>
        <div className="timeline-info">
          <span>Order</span>
          <span>: Placed</span>
          <span className="time-stamp">{farmerData.orderTime}</span>
        </div>
        <div className="delivered-tag">
          <span className="check-box">✔</span> Delivered
        </div>
      </div>

      {/* PAYMENT */}
      <div className="payment-summary">
        <div><span>Payment Method</span><span>: {farmerData.paymentMethod}</span></div>
        <div><span>Payment Status</span><span>: {farmerData.paymentStatus}</span></div>
        <div><span>Transaction ID</span><span>: {farmerData.transactionId}</span></div>
      </div>
    </div>
  );
};

export default FarmerDetail;