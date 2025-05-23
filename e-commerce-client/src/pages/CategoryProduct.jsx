import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axiosIns from "../utils/axios.jsx";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  const getProductByCat = async () => {
    try {
      const { data } = await axiosIns.get(`/api/v1/product/product-category/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4 mb-5">
        <h1
          className="text-center mb-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "700",
            fontSize: "2.3rem",
            color: "#212529",
          }}
        >
          Category: {category?.name}
        </h1>
        <h6 className="text-center text-muted mb-4">
          {products?.length} result{products.length !== 1 ? "s" : ""} found
        </h6>

        <div className="row">
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div key={p._id} className="card m-3 shadow-sm" style={{ width: "18rem", borderRadius: "12px" }}>
                <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="card-img-top"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted">{p.description.substring(0, 50)}</p>
                  <p className="card-text fw-semibold">₹ {p.price}</p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary w-100 mb-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-outline-secondary w-100">ADD TO CART</button>
                  </div>
                </div>
              </div>
            ))}
            {products?.length === 0 && (
              <p className="text-center mt-5 text-muted">No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
