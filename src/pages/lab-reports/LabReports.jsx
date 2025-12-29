import { useFetch } from '../../hooks/useFetch';
import { labReportApi } from '../../api/labReportApi';

const LabReports = () => {
  const { data: reports, loading } = useFetch(() => labReportApi.getAllReports());

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const reportsData = reports || [];

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
            {reportsData.length > 0 ? (
              reportsData.map((report) => (
                <tr key={report.id}>
                  <td>LR_{report.id}</td>
                  <td>{report.farmerName}</td>
                  <td>{report.village || 'N/A'}</td>
                  <td>{new Date(report.sampleDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${report.status === 'COMPLETED' ? 'delivered' : 'pending'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View">👁️</button>
                      <button className="btn-icon" title="Download">⬇️</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No lab reports found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabReports;