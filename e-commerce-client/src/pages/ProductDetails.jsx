import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axiosIns from "../utils/axios.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.jsx";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axiosIns.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axiosIns.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row mt-2">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "300px",
              backgroundColor: "#f8f9fa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {product._id && (
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="img-fluid"
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
        </div>

        <div className="col-md-6">
          <h1
            className="text-center mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#343a40",
            }}
          >
            Product Details
          </h1>

          <div className="px-3">
            <h6 className="mb-3">
              <strong>Name:</strong> {product?.name}
            </h6>
            <h6 className="mb-3">
              <strong>Description:</strong> {product?.description}
            </h6>
            <h6 className="mb-3">
              <strong>Price:</strong>{" "}
              <span className="text-success" style={{ fontWeight: "600" }}>
                ₹ {product?.price}
              </span>
            </h6>
            <h6 className="mb-4">
              <strong>Category:</strong> {product?.category?.name}
            </h6>

            <div className="text-center">
              <button
                className="btn btn-dark px-4 py-2"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Item added to Cart");
                }}
              >
                <i className="bi bi-cart-plus me-2"></i>ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap mt-4">
          {relatedProducts?.map((p) => (
            <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
              {/* Image wrapper with fixed dimensions */}
              <div
                style={{ width: "100%", height: "200px", overflow: "hidden" }}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // fills completely, crops if needed
                  }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}</p>
                <p className="card-text">₹ {p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item added to Cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
