import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "./../Form/SearchInput.jsx";
import useCategory from "../../hooks/useCategory.jsx";
import { useCart } from "../../context/cart.jsx";
import { Badge } from "antd";

const Header = () => {
  const [cart] = useCart();
  const { auth, setAuth } = useAuth();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
          <FaCartShopping className="me-2" />
          E-Commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item w-100 w-lg-auto">
              <SearchInput />
            </li>

            <li className="nav-item">
              <NavLink to="/" className="nav-link fw-semibold">
                Home
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <Link
                to={"/categories"}
                className="nav-link dropdown-toggle fw-semibold"
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id || c.name}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link fw-semibold">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link fw-semibold">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle fw-semibold"
                  data-bs-toggle="dropdown"
                  role="button"
                >
                  {auth?.user?.name}
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}

            <li className="nav-item">
              <NavLink to="/cart" className="nav-link fw-semibold d-flex align-items-center">
                <Badge count={cart?.length} showZero offset={[10, -2]}>
                  <span className="ms-1">Cart</span>
                </Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
