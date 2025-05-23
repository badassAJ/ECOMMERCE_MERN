import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import axiosIns from '../../utils/axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axiosIns.get(`/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Orders">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3 mb-4">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center mb-4">Your Orders</h2>

            {orders?.map((o, i) => (
              <div key={o._id || i} className="card mb-4 shadow-sm border-0">
                <div className="card-header bg-dark text-white fw-semibold">
                  Order #{i + 1}
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
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? 'Success' : 'Failed'}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="card-body">
                  {o?.products?.map((p, idx) => (
                    <div key={p._id || idx} className="row mb-3">
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="img-fluid rounded"
                          style={{ height: '200px', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="col-md-8">
                        <h5 className="fw-bold">{p.name}</h5>
                        <p className="text-muted mb-1">{p.description?.substring(0, 60)}...</p>
                        <p className="mb-0 fw-semibold">Price: ₹{p.price.toFixed(2)}</p>
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

export default Orders;
