import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { adminApi } from '../../api/adminApi';

const OrderList = () => {
  const { data: orders, loading } = useFetch(() => adminApi.getAllOrders());

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const orderData = orders || [];

  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h2>Order Tracking</h2>
          <div className="table-actions">
            <input type="text" placeholder="Search orders..." className="search-box" />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderData.length > 0 ? (
              orderData.map((order) => (
                <tr key={order.id}>
                  <td>ORD_{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <span className={`status-badge ${order.paymentStatus === 'PAID' ? 'delivered' : 'pending'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${order.orderStatus === 'DELIVERED' ? 'delivered' :
                        order.orderStatus === 'PENDING' ? 'pending' : 'active'
                      }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/orders/${order.id}`} className="btn-icon" title="View">
                        👁️
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;