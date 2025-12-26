import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { adminApi } from '../../api/adminApi';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, loading } = useFetch(() => adminApi.getOrderById(id), [id]);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const orderData = order || {
    id: 'ORD001',
    customer: 'Ramesh Patil',
    phone: '9876543210',
    email: 'ramesh@mail.com',
    address: 'Village Molkhi, Maharashtra',
    date: '12 Mar 2024',
    items: [
      { name: 'Tomato Seed', quantity: 10, price: '₹100', total: '₹1000' },
      { name: 'Wheat', quantity: 50, price: '₹50', total: '₹2500' }
    ],
    subtotal: '₹3500',
    tax: '₹350',
    total: '₹3850',
    paymentMethod: 'Online',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    trackingNumber: 'TRK123456789'
  };

  return (
    <div>
      <div className="table-container">
        <div className="modal-header" style={{padding: '20px', borderBottom: '1px solid #eee'}}>
          <h2>Order Details</h2>
          <button className="btn-secondary" onClick={() => navigate('/admin/orders')}>Back</button>
        </div>

        <div style={{padding: '30px'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '30px'}}>
            <div>
              <h3 style={{marginBottom: '15px'}}>Customer Information</h3>
              <div style={{display: 'grid', gap: '10px'}}>
                <div><strong>Name:</strong> {orderData.customer}</div>
                <div><strong>Phone:</strong> {orderData.phone}</div>
                <div><strong>Email:</strong> {orderData.email}</div>
                <div><strong>Address:</strong> {orderData.address}</div>
              </div>
            </div>

            <div>
              <h3 style={{marginBottom: '15px'}}>Order Information</h3>
              <div style={{display: 'grid', gap: '10px'}}>
                <div><strong>Order ID:</strong> {orderData.id}</div>
                <div><strong>Date:</strong> {orderData.date}</div>
                <div><strong>Payment Method:</strong> {orderData.paymentMethod}</div>
                <div><strong>Tracking:</strong> {orderData.trackingNumber}</div>
              </div>
            </div>
          </div>

          <h3 style={{marginBottom: '15px'}}>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{marginTop: '20px', textAlign: 'right', paddingRight: '20px'}}>
            <div style={{marginBottom: '10px'}}>Subtotal: {orderData.subtotal}</div>
            <div style={{marginBottom: '10px'}}>Tax: {orderData.tax}</div>
            <div style={{fontSize: '18px', fontWeight: 'bold'}}>Total: {orderData.total}</div>
          </div>

          <div style={{marginTop: '30px'}}>
            <h3 style={{marginBottom: '15px'}}>Payment Details</h3>
            <div style={{display: 'grid', gap: '10px'}}>
              <div><strong>Payment Method:</strong> {orderData.paymentMethod}</div>
              <div><strong>Payment Status:</strong> <span className="status-badge delivered">{orderData.paymentStatus}</span></div>
              <div><strong>Transaction ID:</strong> TXN{orderData.id}</div>
            </div>
          </div>

          <div style={{marginTop: '30px'}}>
            <h3 style={{marginBottom: '15px'}}>Order Status Timeline</h3>
            <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'}}>✓</div>
                <div>Placed</div>
              </div>
              <div style={{flex: 1, height: '2px', background: '#4CAF50'}}></div>
              <div style={{textAlign: 'center'}}>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'}}>✓</div>
                <div>Confirmed</div>
              </div>
              <div style={{flex: 1, height: '2px', background: '#4CAF50'}}></div>
              <div style={{textAlign: 'center'}}>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'}}>✓</div>
                <div>Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;