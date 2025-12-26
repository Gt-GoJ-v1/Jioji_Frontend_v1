import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { farmerApi } from '../../api/farmerApi';
import { formatDate } from '../../utils/formatDate';

const SurveyHistory = () => {
  const { data: surveys, loading } = useFetch(() => farmerApi.getSurveyHistory());

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const surveyData = surveys || [
    { id: 1, farmerName: 'Ramesh Patil', village: 'Molkhi', date: '2024-03-15', status: 'Completed' },
    { id: 2, farmerName: 'Anita Desai', village: 'Boro', date: '2024-03-14', status: 'Pending' },
    { id: 3, farmerName: 'Suresh Kumar', village: 'Rammati', date: '2024-03-13', status: 'Completed' }
  ];

  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h2>Pervious History of Farmer's Form</h2>
          <input type="text" placeholder="Search..." className="search-box" />
        </div>

        <table>
          <thead>
            <tr>
              <th>Survey ID</th>
              <th>Farmer Name</th>
              <th>Village</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {surveyData.map((survey) => (
              <tr key={survey.id}>
                <td>#{survey.id}</td>
                <td>{survey.farmerName}</td>
                <td>{survey.village}</td>
                <td>{survey.date}</td>
                <td>
                  <span className={`status-badge ${survey.status === 'Completed' ? 'delivered' : 'pending'}`}>
                    {survey.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="View">👁️</button>
                    <button className="btn-icon" title="Download">⬇️</button>
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

export default SurveyHistory;