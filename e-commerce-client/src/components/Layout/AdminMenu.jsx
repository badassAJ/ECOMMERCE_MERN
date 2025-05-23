import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-start px-3">
      <div className="card shadow-sm rounded-3">
        <div className="card-header bg-dark text-white text-center fw-bold">
          Admin Panel
        </div>
        <div className="list-group list-group-flush">
          <NavLink
            to="/dashboard/admin/create-category"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active-custom" : ""
              }`
            }
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active-custom" : ""
              }`
            }
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active-custom" : ""
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active-custom" : ""
              }`
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active-custom" : ""
              }`
            }
          >
            Users
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
