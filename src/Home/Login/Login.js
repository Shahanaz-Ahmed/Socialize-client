import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

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
    <div className="w-full">
      <div className="hero my-16 grid grid-cols-1">
        <div className="hero-content grid  md:grid-cols-2 flex-col lg:flex-row sm:place-items-center">
          <div className="text-center lg:text-left">
            <img
              className=""
              src="https://media.istockphoto.com/id/170093859/photo/young-girl-and-social-networks.jpg?b=1&s=170667a&w=0&k=20&c=om7FduowD9ZuqfJ5CPCW27Bv8QCQqXx4ZO42wd2I4_8="
              alt=""
            />
          </div>
          <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 lg:p-12 lg:m-12">
            <h1 className="text-5xl font-bold text-center">Login</h1>
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
                  className="input input-bordered w-full "
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
                  className="input input-bordered w-full "
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
                className="btn btn-black w-full mt-5"
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
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full text-black"
            >
              CONTINUE WITH GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
