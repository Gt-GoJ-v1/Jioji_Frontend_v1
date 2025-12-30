// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useFetch } from '../../hooks/useFetch';
// import { adminApi } from '../../api/adminApi';
// import '../orders/Order.css';

// const OrderDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data: order, loading } = useFetch(() => adminApi.getOrderById(id), [id]);

//   if (loading) {
//     return <div className="loading"><div className="spinner"></div></div>;
//   }

//   if (!order) return null;

//   const orderData = {
//     id: `ORD_${order.id}`,
//     customer: order.customerName,
//     phone: 'N/A', // Not in OrderDto, could be added if needed
//     email: 'N/A',
//     address: 'N/A',
//     date: new Date(order.orderDate).toLocaleDateString(),
//     items: order.items?.map(item => ({
//       name: item.productName,
//       quantity: item.quantity,
//       price: `₹${item.priceAtOrder}`,
//       total: `₹${item.totalPrice}`
//     })) || [],
//     subtotal: `₹${order.totalAmount}`,
//     tax: `₹${(order.totalAmount * 0.18).toFixed(2)}`,
//     total: `₹${(order.totalAmount * 1.18).toFixed(2)}`,
//     paymentMethod: 'Online',
//     paymentStatus: order.paymentStatus,
//     orderStatus: order.orderStatus,
//     trackingNumber: `TRK_${order.id}`
//   };

//   return (
//     <div>
//       <div className="table-container">
//         <div className="modal-header" style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
//           <h2>Order Details</h2>
//           <button className="btn-secondary" onClick={() => navigate('/admin/orders')}>Back</button>
//         </div>

//         <div style={{ padding: '30px' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '30px' }}>
//             <div>
//               <h3 style={{ marginBottom: '15px' }}>Customer Information</h3>
//               <div style={{ display: 'grid', gap: '10px' }}>
//                 <div><strong>Name:</strong> {orderData.customer}</div>
//                 <div><strong>Phone:</strong> {orderData.phone}</div>
//                 <div><strong>Email:</strong> {orderData.email}</div>
//                 <div><strong>Address:</strong> {orderData.address}</div>
//               </div>
//             </div>

//             <div>
//               <h3 style={{ marginBottom: '15px' }}>Order Information</h3>
//               <div style={{ display: 'grid', gap: '10px' }}>
//                 <div><strong>Order ID:</strong> {orderData.id}</div>
//                 <div><strong>Date:</strong> {orderData.date}</div>
//                 <div><strong>Payment Method:</strong> {orderData.paymentMethod}</div>
//                 <div><strong>Tracking:</strong> {orderData.trackingNumber}</div>
//               </div>
//             </div>
//           </div>

//           <h3 style={{ marginBottom: '15px' }}>Order Items</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Product Name</th>
//                 <th>Qty</th>
//                 <th>Price</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderData.items.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.name}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.price}</td>
//                   <td>{item.total}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div style={{ marginTop: '20px', textAlign: 'right', paddingRight: '20px' }}>
//             <div style={{ marginBottom: '10px' }}>Subtotal: {orderData.subtotal}</div>
//             <div style={{ marginBottom: '10px' }}>Tax: {orderData.tax}</div>
//             <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Total: {orderData.total}</div>
//           </div>

//           <div style={{ marginTop: '30px' }}>
//             <h3 style={{ marginBottom: '15px' }}>Payment Details</h3>
//             <div style={{ display: 'grid', gap: '10px' }}>
//               <div><strong>Payment Method:</strong> {orderData.paymentMethod}</div>
//               <div><strong>Payment Status:</strong> <span className="status-badge delivered">{orderData.paymentStatus}</span></div>
//               <div><strong>Transaction ID:</strong> TXN{orderData.id}</div>
//             </div>
//           </div>

//           <div style={{ marginTop: '30px' }}>
//             <h3 style={{ marginBottom: '15px' }}>Order Status Timeline</h3>
//             <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
//               <div style={{ textAlign: 'center' }}>
//                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>✓</div>
//                 <div>Placed</div>
//               </div>
//               <div style={{ flex: 1, height: '2px', background: '#4CAF50' }}></div>
//               <div style={{ textAlign: 'center' }}>
//                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>✓</div>
//                 <div>Confirmed</div>
//               </div>
//               <div style={{ flex: 1, height: '2px', background: '#4CAF50' }}></div>
//               <div style={{ textAlign: 'center' }}>
//                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>✓</div>
//                 <div>Delivered</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;



// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useFetch } from '../../hooks/useFetch';
// import { adminApi } from '../../api/adminApi';

// const OrderDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data: order, loading } = useFetch(() => adminApi.getOrderById(id), [id]);

//   if (loading) {
//     return <div className="loading"><div className="spinner"></div></div>;
//   }

//   const orderData = order || {
//     id: 'ORD001',
//     customer: 'Ramesh Patil',
//     phone: '9876543210',
//     email: 'ramesh@mail.com',
//     address: 'Village Molkhi, Maharashtra',
//     date: '12 Mar 2024',
//     items: [
//       { name: 'Tomato Seed', quantity: 10, price: '₹100', total: '₹1000' },
//       { name: 'Wheat', quantity: 50, price: '₹50', total: '₹2500' }
//     ],
//     subtotal: '₹3500',
//     tax: '₹350',
//     total: '₹3850',
//     paymentMethod: 'Online',
//     paymentStatus: 'Paid',
//     orderStatus: 'Delivered',
//     trackingNumber: 'TRK123456789'
//   };

//   return (
//     <div>
//       <div className="table-container">
//         <div className="modal-header" style={{padding: '20px', borderBottom: '1px solid #eee'}}>
//           <h2>Order Details</h2>
//           <button className="btn-secondary" onClick={() => navigate('/admin/orders')}>Back</button>
//         </div>

//         <div style={{padding: '30px'}}>
//           <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '30px'}}>
//             <div>
//               <h3 style={{marginBottom: '15px'}}>Customer Information</h3>
//               <div style={{display: 'grid', gap: '10px'}}>
//                 <div><strong>Name:</strong> {orderData.customer}</div>
//                 <div><strong>Phone:</strong> {orderData.phone}</div>
//                 <div><strong>Email:</strong> {orderData.email}</div>
//                 <div><strong>Address:</strong> {orderData.address}</div>
//               </div>
//             </div>

//             <div>
//               <h3 style={{marginBottom: '15px'}}>Order Information</h3>
//               <div style={{display: 'grid', gap: '10px'}}>
//                 <div><strong>Order ID:</strong> {orderData.id}</div>
//                 <div><strong>Date:</strong> {orderData.date}</div>
//                 <div><strong>Payment Method:</strong> {orderData.paymentMethod}</div>
//                 <div><strong>Tracking:</strong> {orderData.trackingNumber}</div>
//               </div>
//             </div>
//           </div>

//           <h3 style={{marginBottom: '15px'}}>Order Items</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Product Name</th>
//                 <th>Qty</th>
//                 <th>Price</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderData.items.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.name}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.price}</td>
//                   <td>{item.total}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div style={{marginTop: '20px', textAlign: 'right', paddingRight: '20px'}}>
//             <div style={{marginBottom: '10px'}}>Subtotal: {orderData.subtotal}</div>
//             <div style={{marginBottom: '10px'}}>Tax: {orderData.tax}</div>
//             <div style={{fontSize: '18px', fontWeight: 'bold'}}>Total: {orderData.total}</div>
//           </div>

//           <div style={{marginTop: '30px'}}>
//             <h3 style={{marginBottom: '15px'}}>Payment Details</h3>
//             <div style={{display: 'grid', gap: '10px'}}>
//               <div><strong>Payment Method:</strong> {orderData.paymentMethod}</div>
//               <div><strong>Payment Status:</strong> <span className="status-badge delivered">{orderData.paymentStatus}</span></div>
//               <div><strong>Transaction ID:</strong> TXN{orderData.id}</div>
//             </div>
//           </div>

//           <div style={{marginTop: '30px'}}>
//             <h3 style={{marginBottom: '15px'}}>Order Status Timeline</h3>
//             <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
//               <div style={{textAlign: 'center'}}>
//                 <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'}}>✓</div>
//                 <div>Placed</div>
//               </div>
//               <div style={{flex: 1, height: '2px', background: '#4CAF50'}}></div>
//               <div style={{textAlign: 'center'}}>
//                 <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'}}>✓</div>
//                 <div>Confirmed</div>
//               </div>
//               <div style={{flex: 1, height: '2px', background: '#4CAF50'}}></div>
//               <div style={{textAlign: 'center'}}>
//                 <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'}}>✓</div>
//                 <div>Delivered</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;



import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { adminApi } from '../../api/adminApi';
import './OrdersDetails.css';

const OrderDetail = () => {
  const { id } = useParams();
  const { data: order, loading } = useFetch(
    () => adminApi.getOrderById(id),
    [id]
  );

  if (loading) return <div className="loading">Loading...</div>;

  // Use API data or fallback to the provided static example for UI matching
  const data = order || {
    name: 'Ramesh Patil',
    userName: 'Ramesh Patil',
    phone: 'XXXXX XXXXX',
    empId: 'XXXXX XXXXX',
    address: 'Village Pune, Maharashtra',
    paymentMethod: 'Online',
    paymentStatus: 'Paid',
    transactionId: 'TXN98765',
    placedDate: '12 Mar, 10:30 AM',
    items: [
      { name: 'Tomato Seeds', qty: '02', price: 120, total: 240 },
      { name: 'Wheat Grain', qty: '5kg', price: 122, total: 610 },
      { name: 'Tomato Seeds', qty: '02', price: 120, total: 240 },
      { name: 'Wheat Grain', qty: '5kg', price: 122, total: 610 },
      { name: 'Tomato Seeds', qty: '02', price: 120, total: 240 },
      { name: 'Wheat Grain', qty: '5kg', price: 122, total: 610 },
    ]
  };

  return (
    <div className="order-details-wrapper">
      <h3 className="page-title">Order Details</h3>

      {/* ===== CUSTOMER INFORMATION ===== */}
      <div className="section">
        <div className="section-bar">Customer Information</div>
        <div className="kv-grid">
          <div className="kv-item"><span>Name</span><span>: {data.name}</span></div>
          <div className="kv-item"><span>User Name</span><span>: {data.userName}</span></div>
          <div className="kv-item"><span>Phone No</span><span>: {data.phone}</span></div>
          <div className="kv-item"><span>Emp ID</span><span>: {data.empId}</span></div>
          <div className="kv-item full"><span>Addres</span><span>: {data.address}</span></div>
        </div>
      </div>

      {/* ===== ORDER ITEMS TABLE ===== */}
      <div className="section">
        <div className="section-bar">Order Items</div>
        <div className="table-container">
          <table className="items-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== PAYMENT DETAILS ===== */}
      <div className="section">
        <div className="section-bar">Payment Details</div>
        <div className="kv-grid">
          <div className="kv-item"><span>Payment Method</span><span>: {data.paymentMethod}</span></div>
          <div className="kv-item full"><span>Payment Status</span><span className="bold">: {data.paymentStatus}</span></div>
          <div className="kv-item"><span>Transaction ID</span><span>: {data.transactionId}</span></div>
        </div>
      </div>

      {/* ===== ORDER STATUS TIMELINE ===== */}
      <div className="section">
        <div className="section-bar">Order Status Timeline</div>
        <div className="timeline">
          <div className="timeline-row">
            <span className="label">Order</span>
            <span className="separator">:</span>
            <span className="status-text">Placed</span>
            <span className="timestamp">{data.placedDate}</span>
          </div>
          <div className="timeline-row status-delivered">
            <div className="check-box">
               <span className="check-icon">✓</span>
            </div>
            <span className="delivered-text">Delivered</span>
          </div>
        </div>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="action-footer">
        <button className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default OrderDetail;