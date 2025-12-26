import React from 'react';

const LabReports = () => {
  const reports = [
    { id: 'LR-01', farmerName: 'Ramesh Patil', village: 'Molkhi', sampleDate: '10-12', status: 'Completed' },
    { id: 'LR-02', farmerName: 'Michael Kunal', village: 'Boro', sampleDate: '09-12', status: 'Pending' },
    { id: 'LR-03', farmerName: 'Jane Doe', village: 'Rammati', sampleDate: '08-12', status: 'Completed' }
  ];

  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h2>Lab Test Reports</h2>
          <div className="table-actions">
            <input type="text" placeholder="Search..." className="search-box" />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Farmer Name</th>
              <th>Village</th>
              <th>Sample Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.farmerName}</td>
                <td>{report.village}</td>
                <td>{report.sampleDate}</td>
                <td>
                  <span className={`status-badge ${report.status === 'Completed' ? 'delivered' : 'pending'}`}>
                    {report.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="View">👁️</button>
                    <button className="btn-icon" title="Download">⬇️</button>
                    <button className="btn-icon" title="Delete">🗑️</button>
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

export default LabReports;