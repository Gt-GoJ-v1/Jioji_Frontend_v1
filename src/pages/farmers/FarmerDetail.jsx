import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { farmerApi } from '../../api/farmerApi';

const FarmerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: farmer, loading } = useFetch(() => farmerApi.getFarmerById(id), [id]);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const farmerData = farmer || {
    name: 'Ramesh Patil',
    village: 'Molkhi',
    phone: '9876543210',
    email: 'ramesh@mail.com',
    address: 'Village Molkhi, Maharashtra',
    farmSize: '5 acres',
    crops: 'Rice, Wheat',
    survey: 'Completed',
    lastVisit: '2024-03-15'
  };

  return (
    <div>
      <div className="table-container">
        <div className="modal-header" style={{padding: '20px', borderBottom: '1px solid #eee'}}>
          <h2>Farmer Details</h2>
          <button className="btn-secondary" onClick={() => navigate('/admin/farmers')}>Back</button>
        </div>

        <div style={{padding: '30px'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
            <div>
              <h3 style={{marginBottom: '20px', color: '#333'}}>Personal Information</h3>
              <div style={{display: 'grid', gap: '15px'}}>
                <div>
                  <strong>Name:</strong>
                  <p>{farmerData.name}</p>
                </div>
                <div>
                  <strong>Village:</strong>
                  <p>{farmerData.village}</p>
                </div>
                <div>
                  <strong>Phone:</strong>
                  <p>{farmerData.phone}</p>
                </div>
                <div>
                  <strong>Email:</strong>
                  <p>{farmerData.email}</p>
                </div>
                <div>
                  <strong>Address:</strong>
                  <p>{farmerData.address}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{marginBottom: '20px', color: '#333'}}>Farm Information</h3>
              <div style={{display: 'grid', gap: '15px'}}>
                <div>
                  <strong>Farm Size:</strong>
                  <p>{farmerData.farmSize}</p>
                </div>
                <div>
                  <strong>Crops:</strong>
                  <p>{farmerData.crops}</p>
                </div>
                <div>
                  <strong>Survey Status:</strong>
                  <p>
                    <span className={`status-badge ${farmerData.survey === 'Completed' ? 'delivered' : 'pending'}`}>
                      {farmerData.survey}
                    </span>
                  </p>
                </div>
                <div>
                  <strong>Last Visit:</strong>
                  <p>{farmerData.lastVisit}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{marginTop: '30px', display: 'flex', gap: '10px'}}>
            <button className="btn-primary">Update Information</button>
            <button className="btn-secondary" onClick={() => navigate(`/admin/farmers/${id}/survey`)}>
              Fill Survey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetail;