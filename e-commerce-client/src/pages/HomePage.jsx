import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axiosIns from "../utils/axios.jsx";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.jsx";
import toast from "react-hot-toast";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [filteredTotal, setFilteredTotal] = useState(0);

  const getAllCategory = async () => {
    try {
      const { data } = await axiosIns.get(`/api/v1/category/get-category`);
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosIns.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axiosIns.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

   const filterProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axiosIns.post(`/api/v1/product/product-filters`, {
        checked,
        radio,
        page,
      });
      setLoading(false);
      setProducts(data?.products);
      setFilteredTotal(data?.total); // Set filtered total
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axiosIns.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts((prev) => [...prev, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFilter = (checkedValue, categoryId) => {
    let updatedChecked = [...checked];
    if (checkedValue) {
      updatedChecked.push(categoryId);
    } else {
      updatedChecked = updatedChecked.filter((c) => c !== categoryId);
    }
    setChecked(updatedChecked);
    setPage(1);
  };

  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    setPage(1);
    getAllProducts();
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) {
      if (checked.length === 0 && radio.length === 0) {
        getAllProducts();
      } else {
        filterProduct();
      }
    } else {
      loadMore();
    }
  }, [checked, radio, page]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <div
        style={{
          width: "100vw",
          height: "25vh",
          backgroundImage: `url('/images/banner.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          padding: "0 5%",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            gap: "2rem",
          }}
        >
          <div
            style={{
              flex: "0 0 150px",
              height: "100%",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src="/images/ecom.png"
              alt="Ecommerce Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Text */}
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              letterSpacing: "0.1em",
              userSelect: "none",
            }}
          >
            Ecommerce
          </h1>
        </div>
      </div>
      <div className="row mt-4">
        {/* Filter Sidebar */}
        <div
          className="col-md-2 px-4"
          style={{
            background: "#f8f9fa",
            borderRadius: "12px",
            height: "calc(100vh)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            padding: "20px",
            marginLeft: "auto",
            marginRight: "20px",
            overflowY: "auto",
          }}
        >
          <h4
            className="text-center mb-4"
            style={{ fontWeight: "700", color: "#343a40" }}
          >
            Filter By Category
          </h4>
          <div className="d-flex flex-column gap-3">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                checked={checked.includes(c._id)}
                style={{
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: "#495057",
                }}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4
            className="text-center mt-5 mb-4"
            style={{ fontWeight: "700", color: "#343a40" }}
          >
            Filter By Price
          </h4>
          <Radio.Group
            onChange={(e) => {
              setRadio(e.target.value);
              setPage(1);
            }}
            value={radio}
            className="d-flex flex-column gap-3"
          >
            {Prices.map((p) => (
              <Radio
                key={p._id}
                value={p.array}
                style={{
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: "#495057",
                }}
              >
                {p.name}
              </Radio>
            ))}
          </Radio.Group>

          <button
            className="btn btn-outline-danger mt-5 w-100 fw-semibold"
            onClick={resetFilters}
            disabled={loading}
            style={{ borderRadius: "8px", fontSize: "1rem", padding: "10px 0" }}
          >
            RESET FILTERS
          </button>
        </div>

        {/* Products Area */}
        <div className="col-md-9">
          <h1
            className="text-4xl md:text-5xl text-center font-bold mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#212529",
            }}
          >
            All Products
          </h1>

          <div className="d-flex flex-wrap justify-content-center gap-4">
            {products.length === 0 && !loading && (
              <p className="text-muted fs-5">
                No products found with selected filters.
              </p>
            )}

            {products.map((p) => (
              <div
                key={p._id}
                className="card shadow-sm"
                style={{
                  width: "18rem",
                  cursor: "default",
                  borderRadius: "14px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                  }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p
                    className="card-text text-secondary"
                    style={{ minHeight: "48px" }}
                  >
                    {p.description.substring(0, 30)}
                  </p>
                  <p
                    className="card-text fw-bold mb-3"
                    style={{ fontSize: "1.1rem" }}
                  >
                    ₹ {p.price.toFixed(2)}
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary flex-grow-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      style={{ borderRadius: "8px", fontWeight: "600" }}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-outline-secondary flex-grow-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item added to Cart");
                      }}
                      style={{ borderRadius: "8px", fontWeight: "600" }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-5 mb-4">
            {products.length > 0 &&
              ((checked.length === 0 && radio.length === 0 && products.length < total) ||
                ((checked.length > 0 || radio.length > 0) && products.length < filteredTotal)) && (
                <button
                  className="btn btn-warning px-5 py-2 fw-semibold"
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                  style={{ borderRadius: "10px", fontSize: "1.1rem" }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
