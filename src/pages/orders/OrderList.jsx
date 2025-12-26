import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { adminApi } from '../../api/adminApi';

const OrderList = () => {
  const { data: orders, loading } = useFetch(() => adminApi.getAllOrders());

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const orderData = orders || [
    { id: 'ORD001', customer: 'John Doe', date: '12 Mar 2024', amount: '₹500', payment: 'Paid', status: 'Delivered' },
    { id: 'ORD002', customer: 'Jane Smith', date: '13 Mar 2024', amount: '₹750', payment: 'Paid', status: 'Pending' },
    { id: 'ORD003', customer: 'Mike Johnson', date: '14 Mar 2024', amount: '₹1200', payment: 'Pending', status: 'Processing' }
  ];

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
            {orderData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td>
                  <span className={`status-badge ${order.payment === 'Paid' ? 'delivered' : 'pending'}`}>
                    {order.payment}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${
                    order.status === 'Delivered' ? 'delivered' : 
                    order.status === 'Pending' ? 'pending' : 'active'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/admin/orders/${order.id}`} className="btn-icon" title="View">
                      👁️
                    </Link>
                    <button className="btn-icon" title="Edit">✏️</button>
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

export default OrderList;