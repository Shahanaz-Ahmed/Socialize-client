import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import EditModal from "../EditModal/EditModal";

const About = () => {
  const menuItems = (
    <React.Fragment>
      <li className="italic font-serif">
        <Link to="/">Home</Link>
      </li>
      <li className="italic font-serif">
        <Link to="/media">Media</Link>
      </li>
      <li>
        {/* <button className="btn glass italic font-serif">Edit</button> */}
        <label
          htmlFor="booking-modal"
          className="btn glass italic font-serif w-full"
        >
          Edit
        </label>
      </li>
    </React.Fragment>
  );

  const { data: about = [], isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/about");
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  return (
    <div className="text-center">
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
      <h2 className="font-bold text-2xl font-serif italic">About</h2>
      <h2>Name: {about[0].name}</h2>
      <h2>Email: {about[0].email}</h2>
      <h2>University: {about[0].university}</h2>
      <h2>Address: {about[0].address}</h2>
      <EditModal></EditModal>
    </div>
  );
};

export default About;
