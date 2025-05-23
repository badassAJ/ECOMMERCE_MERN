import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout title={"Dashboard - Admin"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div 
            className="col-md-9 d-flex justify-content-center align-items-center"
            style={{ minHeight: "75vh" }}
          >
            <div 
              className="card w-75 p-4 shadow-sm"
              style={{ 
                borderRadius: "12px", 
                backgroundColor: "#f8f9fa",
                transition: "transform 0.3s ease",
                cursor: "default"
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h2 className="mb-4 text-center text-dark" style={{ fontWeight: "700" }}>
                Admin Profile
              </h2>
              <h5 className="mb-3">
                <strong>Name:</strong> {auth?.user?.name}
              </h5>
              <h5 className="mb-3">
                <strong>Email:</strong> {auth?.user?.email}
              </h5>
              <h5 className="mb-3">
                <strong>Contact:</strong> {auth?.user?.phone || "N/A"}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
