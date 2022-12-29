import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const menuItems = (
    <React.Fragment>
      <li className="italic font-serif">
        <Link to="/">Home</Link>
      </li>
      <li className="italic font-serif">
        <Link to="/media">Media</Link>
      </li>
      <li className="italic font-serif">
        <Link to="/about">About</Link>
      </li>
      {user?.uid ? (
        <li className="italic font-serif">
          <button onClick={handleLogOut}>Sign Out</button>
        </li>
      ) : (
        <li className="italic font-serif">
          <Link to="/login">Login</Link>
        </li>
      )}
    </React.Fragment>
  );
  return (
    <div>
      <div className="navbar flex mx-auto bg-black text-white lg:pl-52">
        <div className="navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={1}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow  rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl italic font-serif"
          >
            Socialize
          </Link>
        </div>
        {/* laptop device */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal  p-0">{menuItems}</ul>
        </div>
      </div>
      <div>
        <img
          src="https://images.unsplash.com/photo-1554177255-61502b352de3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="lg:w-full h-[300px]"
        />
      </div>
    </div>
  );
};

export default Header;
