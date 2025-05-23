import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-start px-3">
      <div className="card shadow-sm rounded-3">
        <div className="card-header bg-dark text-white text-center fw-bold">
          User Dashboard
        </div>
        <div className="list-group list-group-flush">
          <NavLink
            to="/dashboard/user/profile"
             className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active-custom" : ""
              }`
            }
            
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
             className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "active-custom" : ""
              }`
            }
            
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
