import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import login from "../../assets/login.jpg";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const { signIn, provideLogin } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from.pathname || "/";
  const handleLogin = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Logged in Successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    provideLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Logged in Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero my-16 grid grid-cols-1">
      <div className="hero-content grid  md:grid-cols-2 flex-col lg:flex-row sm:place-items-center">
        <div className="text-center lg:text-left">
          <img className="lg:pt-16 lg:h-[600px]" src={login} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 p-12 lg:p-12 lg:m-12">
          <h1 className="text-5xl font-bold text-center italic font-serif text-accent">
            Login
          </h1>
          <form onSubmit={handleSubmit(handleLogin)}>
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
                className="input input-info input-bordered w-full "
              />
              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
              <label className="label">
                <span className="label-text">Forget Password ?</span>
              </label>
            </div>
            <input
              type="submit"
              className="btn btn-outline btn-info font-bold text-xl w-full mt-5"
              value="Login"
            />
            <div>
              {loginError && <p className="text-red-500">{loginError}</p>}
            </div>
          </form>
          <p className="text-center mb-6">
            New to Socialize?{" "}
            <Link className="text-blue-800 font-bold" to="/signup">
              Create New Account
            </Link>
          </p>
          <div className="divider info">OR</div>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-info w-full text-black"
          >
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
