import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import axiosIns from "../../utils/axios.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axiosIns.get(`/api/v1/product/get-product`);
      if (data?.success) {
        setProducts(data?.products);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid py-4 px-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1
              className="text-center mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: "700",
                fontSize: "2.2rem",
                color: "#212529",
              }}
            >
              All Products List
            </h1>

            <div className="d-flex flex-wrap justify-content-start">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card m-2 shadow-sm"
                    style={{
                      width: "18rem",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ height: "200px", overflow: "hidden" }}>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{ objectFit: "contain", height: "100%" }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-dark">{p.name}</h5>
                      <p className="card-text text-muted">
                        {p.description?.substring(0, 60)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              {products.length === 0 && (
                <p className="text-muted text-center w-100 mt-4">No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
