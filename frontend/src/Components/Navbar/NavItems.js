import React from "react";
import { Link } from "react-router-dom";

const NavItems = ({ tokenData, handleLogout }) => {
  return (
    <ul className="navbar-nav">
      {tokenData ? (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {tokenData.role === "customer" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/account">
                  Account
                </Link>
              </li>
            </>
          )}
          {tokenData.role === "shopOwner" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
            </>
          )}
          {tokenData.role === "superAdmin" && (
            <li className="nav-item">
              <Link className="nav-link" to="/totalShops">
                Shops
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/userRegister">
              User Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shopOwnerRegister">
              Owner Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavItems;
