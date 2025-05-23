import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart.jsx";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axiosIns from "../utils/axios.jsx";
import dropin from "braintree-web-drop-in";

const CartPages = () => {
  const [cart, setCart] = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropinContainerRef = useRef(null);

  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getToken = async () => {
    try {
      const { data } = await axiosIns.get(`/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log("Token error:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  useEffect(() => {
    if (!clientToken || !dropinContainerRef.current || cart.length === 0) return;

    let dropinInstance;

    dropin.create(
      {
        authorization: clientToken,
        container: dropinContainerRef.current,
        paypal: {
          flow: "vault",
        },
      },
      (err, instance) => {
        if (err) {
          console.error("Drop-in Error:", err);
          return;
        }
        setInstance(instance);
        dropinInstance = instance;
      }
    );

    return () => {
      if (dropinInstance) {
        dropinInstance.teardown(() => {
          setInstance(null);
        });
      }
    };
  }, [clientToken, cart]);

  const handlePayment = async () => {
    if (!instance) return;

    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axiosIns.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      setCart([]);
      localStorage.removeItem("cart");
      navigate("/dashboard/user/orders");
      alert("Payment successful!");
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Cart"}>
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-md-12 text-center">
            <h2 className="bg-dark text-light p-3 rounded">
              Hello {auth?.token && <span className="text-warning">{auth?.user?.name}</span>}
            </h2>
            <p className="lead">
              {cart?.length
                ? `You have ${cart.length} item(s) in your cart ${auth?.token ? "" : "- Please login to checkout"}`
                : "Your Cart is empty"}
            </p>
          </div>
        </div>

        <div className="row">
          {/* Left - Cart Items */}
          <div className="col-md-8">
            {cart?.map((p) => (
              <div key={p._id} className="card mb-3 shadow-sm border-0">
                <div className="row g-0 align-items-center">
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="img-fluid rounded-start"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text text-muted">{p.description?.substring(0, 60)}</p>
                      <p className="card-text fw-bold">₹{p.price.toFixed(2)}</p>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Summary & Payment */}
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h3 className="text-center text-success">Cart Summary</h3>
              <hr />
              <p className="text-center">Total Items: <strong>{cart.length}</strong></p>
              <h4 className="text-center text-primary">Total: ₹{totalPrice().toFixed(2)}</h4>

              <hr />

              {auth?.user?.address ? (
                <div className="mb-3 text-center">
                  <h5 className="text-info">Shipping To:</h5>
                  <p>{auth?.user?.address}</p>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3 text-center">
                  {auth?.token ? (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Add Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Login to Checkout
                    </button>
                  )}
                </div>
              )}

              {/* Drop-in Payment */}
              {clientToken && cart.length > 0 && (
                <div className="mt-3">
                  <div ref={dropinContainerRef} className="mb-2"></div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={handlePayment}
                    disabled={!instance || loading}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPages;
