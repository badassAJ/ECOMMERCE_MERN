import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axiosIns from "../../utils/axios";
import moment from "moment";
import { Select } from "antd";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const AdminOrders = () => {
  const [statusList] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axiosIns.get(`/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      await axiosIns.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Admin Orders">
      <div className="container-fluid py-4 px-3">
        <div className="row">
          <div className="col-md-3 mb-4">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center mb-4">All Orders</h2>

            {orders?.map((order, index) => (
              <div key={order._id || index} className="card mb-4 shadow-sm border-0">
                <div className="card-header bg-dark text-white fw-semibold">
                  Order #{index + 1}
                </div>
                <div className="table-responsive">
                  <table className="table table-striped mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Items</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Select
                            value={order?.status}
                            style={{ width: 140 }}
                            onChange={(value) => handleChange(order._id, value)}
                          >
                            {statusList.map((status, idx) => (
                              <Option key={idx} value={status}>
                                {status}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>{order?.payment.success ? "Success" : "Failed"}</td>
                        <td>{order?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="card-body">
                  {order?.products?.map((product, i) => (
                    <div key={product._id || i} className="row mb-3">
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="img-fluid rounded"
                          style={{ height: "200px", objectFit: "contain" }}
                        />
                      </div>
                      <div className="col-md-8">
                        <h5 className="fw-bold">{product.name}</h5>
                        <p className="text-muted mb-1">{product.description?.substring(0, 60)}...</p>
                        <p className="mb-0 fw-semibold">Price: ₹{product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
