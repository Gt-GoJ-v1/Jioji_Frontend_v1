import React, { useState, useEffect } from 'react';

const EmployeeDashboard = () => {
  const [attendance, setAttendance] = useState({ marked: false, time: null, location: null });
  const [survey, setSurvey] = useState({ farmerName: '', contact: '', village: '', crop: '', acreage: '', photos: [] });
  const [loading, setLoading] = useState(false);

  const markAttendance = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setAttendance({
          marked: true,
          time: new Date().toLocaleTimeString(),
          location: `${position.coords.latitude}, ${position.coords.longitude}`
        });
        setLoading(false);
      }, (error) => {
        alert("Error getting location: " + error.message);
        setLoading(false);
      });
    } else {
      alert("Geolocation not supported");
      setLoading(false);
    }
  };

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    if (!attendance.marked) {
      alert("Please mark attendance first!");
      return;
    }
    alert("Survey for " + survey.farmerName + " submitted successfully!");
    setSurvey({ farmerName: '', contact: '', village: '', crop: '', acreage: '', photos: [] });
  };

  return (
    <div className="employee-dashboard">
      <div className="grid-2">
        {/* Attendance Card */}
        <div className="stat-card green" style={{ display: 'block', textAlign: 'center' }}>
          <div className="stat-icon" style={{ margin: '0 auto 15px' }}>📍</div>
          <h2 style={{ color: 'white' }}>Daily Attendance</h2>
          {attendance.marked ? (
            <div style={{ marginTop: '15px' }}>
              <p>Status: <strong>Marked</strong></p>
              <p>Time: {attendance.time}</p>
              <p style={{ fontSize: '12px' }}>Loc: {attendance.location}</p>
            </div>
          ) : (
            <button className="btn-primary" onClick={markAttendance} disabled={loading} style={{ background: 'white', color: 'var(--primary)', marginTop: '15px' }}>
              {loading ? 'Getting Location...' : 'Mark Attendance'}
            </button>
          )}
        </div>

        {/* Stats Card */}
        <div className="stat-card purple">
          <div className="stat-info">
            <h3>12</h3>
            <p>Surveys Done Today</p>
          </div>
          <div className="stat-icon">📈</div>
        </div>
      </div>

      <div className="table-container" style={{ marginTop: '30px' }}>
        <div className="table-header">
          <h2>Create New Field Survey</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSurveySubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label>Farmer Name</label>
                <input type="text" value={survey.farmerName} onChange={(e) => setSurvey({ ...survey, farmerName: e.target.value })} placeholder="Full Name" required />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="tel" value={survey.contact} onChange={(e) => setSurvey({ ...survey, contact: e.target.value })} placeholder="+91" required />
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Village / Area</label>
                <input type="text" value={survey.village} onChange={(e) => setSurvey({ ...survey, village: e.target.value })} placeholder="Location" required />
              </div>
              <div className="form-group">
                <label>Crop Interest</label>
                <select value={survey.crop} onChange={(e) => setSurvey({ ...survey, crop: e.target.value })} required>
                  <option value="">Select Product</option>
                  <option value="Tomato">Mac Tomato</option>
                  <option value="Chilli">Green Chilli</option>
                  <option value="Watermelon">Hybrid Watermelon</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Field Photo (Farmer with Field)</label>
              <div className="file-upload" style={{ border: '2px dashed var(--border-color)', padding: '40px', textAlign: 'center', borderRadius: 'var(--radius)' }}>
                <input type="file" multiple accept="image/*" style={{ display: 'none' }} id="survey-photos" />
                <label htmlFor="survey-photos" style={{ cursor: 'pointer' }}>
                  <div style={{ fontSize: '30px' }}>📸</div>
                  <div>Click to upload photo</div>
                </label>
              </div>
            </div>
            <button type="submit" className="btn-success" style={{ width: '100%', marginTop: '20px' }}>
              Submit Survey Record
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
