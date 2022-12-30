import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import login from "../../assets/login.jpg";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState("");

  const handleSignUp = (data) => {
    console.log(data);
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User Created Successfully");
        navigate("/");
        const userInfo = {
          displayName: data.name,
          photoURL: data.imageUrl,
        };
        updateUser(userInfo)
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.error(error);
        setSignUpError(error.message);
      });
  };
  return (
    <div className="">
      <div className="hero my-16 grid grid-cols-1">
        <div className="hero-content grid  md:grid-cols-2 flex-col lg:flex-row sm:place-items-center">
          <div className="text-center lg:text-left">
            <img className="lg:pt-16 lg:h-[600px]" src={login} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 p-12 lg:p-12 lg:m-12">
            <h1 className="text-5xl font-bold text-center italic font-serif text-accent">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>

                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder="Name"
                  className="input input-bordered input-info w-full "
                />
                {errors.name && (
                  <p className="text-red-600">{errors.name?.message}</p>
                )}
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Your Image URL</span>
                </label>

                <input
                  type="text"
                  {...register("imageUrl", {
                    required: "ImageURL is required",
                  })}
                  placeholder="Image Url"
                  className="input input-bordered input-info w-full "
                />
                {errors.imageUrl && (
                  <p className="text-red-600">{errors.imageUrl?.message}</p>
                )}
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>

                <input
                  type="text"
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  placeholder="Email"
                  className="input input-bordered input-info w-full "
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email?.message}</p>
                )}
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Enter Password</span>
                </label>

                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 Character or longer",
                    },
                  })}
                  placeholder="Password"
                  className="input input-bordered input-info w-full "
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password?.message}</p>
                )}
                {/* <label className="label">
                  <span className="label-text">Forget Password ?</span>
                </label> */}
              </div>

              <input
                type="submit"
                className="btn btn-outline btn-info font-bold text-xl w-full mt-5"
                value="Sign Up"
              />
              <div>
                {signUpError && <p className="text-red-500">{signUpError}</p>}
              </div>
              {/* <input
                type="submit"
                className="btn btn-outline w-full mt-5"
                value="Login with Google"
              />
              <div>
                {signUpError && <p className="text-red-500">{signUpError}</p>}
              </div> */}
            </form>
            <p className="text-center mb-6">
              Already have an account?{" "}
              <Link className="text-blue-800 font-bold" to="/login">
                Please Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
