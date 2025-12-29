import React, { useState } from 'react';

const LabDashboard = () => {
  const [attendance, setAttendance] = useState({ marked: false, time: null });
  const [reportForm, setReportForm] = useState({ farmerName: '', village: '', pH: '', nitrogen: '', phosphorus: '', potassium: '' });
  const [loading, setLoading] = useState(false);

  const markAttendance = () => {
    setLoading(true);
    // Simulate API/GPS call
    setTimeout(() => {
      setAttendance({ marked: true, time: new Date().toLocaleTimeString() });
      setLoading(false);
    }, 1000);
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    if (!attendance.marked) {
      alert("Please mark attendance first!");
      return;
    }
    alert("Soil Report PDF Generated for " + reportForm.farmerName + ". Downloading...");
    // Future: Use jsPDF here
  };

  return (
    <div className="lab-dashboard">
      <div className="grid-2" style={{ marginBottom: '30px' }}>
        <div className="stat-card blue" style={{ display: 'block', textAlign: 'center' }}>
          <div className="stat-icon" style={{ margin: '0 auto 15px' }}>🔬</div>
          <h2 style={{ color: 'white' }}>Lab Attendance</h2>
          {attendance.marked ? (
            <p style={{ marginTop: '15px' }}>Status: <strong>Present</strong> | {attendance.time}</p>
          ) : (
            <button className="btn-primary" onClick={markAttendance} disabled={loading} style={{ background: 'white', color: 'var(--primary)', marginTop: '15px' }}>
              {loading ? 'Verifying...' : 'Mark Lab Attendance'}
            </button>
          )}
        </div>

        <div className="stat-card orange">
          <div className="stat-info">
            <h3>45</h3>
            <p>Reports Uploaded</p>
          </div>
          <div className="stat-icon">📄</div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h2>Soil Lab Report Generation</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handleGenerateReport}>
            <div className="grid-2">
              <div className="form-group">
                <label>Farmer Name</label>
                <input type="text" value={reportForm.farmerName} onChange={(e) => setReportForm({ ...reportForm, farmerName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Village</label>
                <input type="text" value={reportForm.village} onChange={(e) => setReportForm({ ...reportForm, village: e.target.value })} required />
              </div>
            </div>
            <div style={{ padding: '20px', background: '#f8faf8', borderRadius: 'var(--radius)', marginBottom: '20px' }}>
              <h4>Soil Parameters</h4>
              <div className="grid-2" style={{ marginTop: '15px' }}>
                <div className="form-group">
                  <label>pH Level</label>
                  <input type="number" step="0.1" value={reportForm.pH} onChange={(e) => setReportForm({ ...reportForm, pH: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Nitrogen (N)</label>
                  <input type="number" value={reportForm.nitrogen} onChange={(e) => setReportForm({ ...reportForm, nitrogen: e.target.value })} required />
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Phosphorus (P)</label>
                  <input type="number" value={reportForm.phosphorus} onChange={(e) => setReportForm({ ...reportForm, phosphorus: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Potassium (K)</label>
                  <input type="number" value={reportForm.potassium} onChange={(e) => setReportForm({ ...reportForm, potassium: e.target.value })} required />
                </div>
              </div>
            </div>
            <button type="submit" className="btn-success" style={{ width: '100%' }}>
              Generate & Download Soil Report (PDF)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;
