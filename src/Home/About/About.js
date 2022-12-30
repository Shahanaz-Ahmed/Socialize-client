import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import about1 from "../../assets/about.jpeg";

const About = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
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

  const {
    data: about = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch(
        " https://social-media-task-server-eight.vercel.app/about"
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  const id = about[0]._id;
  const name = about[0].name;
  const email = about[0].email;
  const university = about[0].university;
  const address = about[0].address;
  // console.log("id", id, name, email, university, address);

  const handleAbout = (data, name, email, university, address) => {
    console.log(data);
    console.log(data.name);
    fetch(` https://social-media-task-server-eight.vercel.app/about/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        university: data.university,
        address: data.address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          name = data.name;
          email = data.email;
          university = data.university;
          address = data.address;
          toast.success("Successfully Updated");
          refetch();
          // console.log(name);
        }
      });
  };

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
          src={
            "https://images.unsplash.com/photo-1554177255-61502b352de3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          }
          alt=""
          className="w-full h-[300px] grid lg:grid-cols-1 md:grid-cols-1  sm:grid-cols-1"
        />
      </div>
      {/* About Main */}
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img src={about1} className="lg:w-1/2 rounded-lg shadow-2xl" alt="" />
          <div className="lg:w-1/2 text-2xl">
            <h2 className="font-bold text-2xl font-serif italic text-center">
              About
            </h2>
            <div className="sm:text-left lg:ml-5 :text-center">
              {" "}
              <h2>
                <span className="font-semibold">Name:</span> {name}
              </h2>
              <h2>
                <span className="font-semibold">Email:</span> {email}
              </h2>
              <h2>
                {" "}
                <span className="font-semibold">University:</span> {university}
              </h2>
              <h2>
                {" "}
                <span className="font-semibold">Address:</span> {address}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* <EditModal></EditModal> */}
      {/* Modal */}
      <div>
        <>
          <input type="checkbox" id="booking-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <label
                htmlFor="booking-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-2xl font-serif italic text-accent font-bold mb-3">
                Update About
              </h3>
              <form onSubmit={handleSubmit(handleAbout)}>
                <input
                  type="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder="Name"
                  className="input input-bordered input-info w-full mb-3"
                />
                {errors.name && (
                  <p className="text-red-600">{errors.name?.message}</p>
                )}
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="Email"
                  className="input input-bordered input-info w-full mb-3"
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email?.message}</p>
                )}
                <input
                  type=""
                  {...register("university", {
                    required: "University Name is required",
                  })}
                  placeholder="University Name"
                  className="input input-bordered input-info w-full mb-3"
                />
                {errors.university && (
                  <p className="text-red-600">{errors.university?.message}</p>
                )}
                <input
                  type=""
                  {...register("address", {
                    required: "Address is required",
                  })}
                  placeholder="Address"
                  className="input input-bordered input-info w-full mb-3"
                />
                {errors.address && (
                  <p className="text-red-600">{errors.address?.message}</p>
                )}
                <br />
                <input
                  className="w-full btn btn-info text-xl font-bold"
                  type="submit"
                  value="Save"
                  htmlFor="booking-modal"
                />
                {/* <button className="w-full btn btn-black" type="submit">
                   Edit
                </button> */}
              </form>
            </div>
          </div>
        </>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default About;
