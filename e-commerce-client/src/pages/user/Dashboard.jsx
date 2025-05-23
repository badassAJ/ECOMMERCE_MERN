import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
  const { auth } = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce"}>
      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card shadow-lg rounded-4 border-0 p-4 bg-light">
              <div className="card-body">
                <h2 className="mb-4 text-primary fw-bold">User Information</h2>
                <hr className="mb-4" />
                <div className="mb-3">
                  <h5 className="text-muted">Name:</h5>
                  <p className="fs-5 fw-semibold">{auth?.user?.name}</p>
                </div>
                <div className="mb-3">
                  <h5 className="text-muted">Email:</h5>
                  <p className="fs-5 fw-semibold">{auth?.user?.email}</p>
                </div>
                <div>
                  <h5 className="text-muted">Address:</h5>
                  <p className="fs-5 fw-semibold">{auth?.user?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
