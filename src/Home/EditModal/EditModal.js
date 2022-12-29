import React from "react";
import { useForm } from "react-hook-form";

const EditModal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleAbout = (data) => {
    console.log(data);
  };
  return (
    <div>
      <>
        <input type="checkbox" id="booking-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="booking-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold mb-3">Update About</h3>
            <form onSubmit={handleSubmit(handleAbout)}>
              <input
                type="name"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="Name"
                className="input input-bordered w-full mb-3"
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
                className="input input-bordered w-full mb-3"
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
                className="input input-bordered w-full mb-3"
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
                className="input input-bordered w-full mb-3"
              />
              {errors.address && (
                <p className="text-red-600">{errors.address?.message}</p>
              )}
              <br />
              <input
                className="w-full btn btn-black"
                type="submit"
                value="Edit"
              />
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default EditModal;
