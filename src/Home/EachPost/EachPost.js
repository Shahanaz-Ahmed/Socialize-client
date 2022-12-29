import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import love from "../../assets/heart.png";
import like from "../../assets/thumb-up.png";
import { AuthContext } from "../../contexts/AuthProvider";

const EachPost = ({ allpost }) => {
  const { user } = useContext(AuthContext);
  //new
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [count, setCount] = useState(0);
  return (
    <div>
      <div className="pl-5 py-5 mb-8 shadow-md rounded-md bg-white">
        <div className="flex gap-4 items-center mb-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={allpost.userPhoto} alt="" />
            </div>
          </div>
          <p>{allpost.name}</p>
        </div>
        <p className="pb-5 italic text-xl">{allpost.text}</p>
        <img className="w-full pr-5 h-[350px]" src={allpost.image} alt="" />
        <div className="flex gap-3 items-center mt-3">
          <button onClick={() => setCount(count + 1)} className="">
            <img className="w-8 h-8 hover:bg-sky-200" src={like} alt="" />
          </button>
          <button onClick={() => setCount(count + 1)} className="">
            <img className="w-8 h-8 hover:bg-red-200" src={love} alt="" />
          </button>
          <p>{count}</p>
        </div>
        {/* new */}
        <input
          className="textarea textarea-bordered  rounded-2xl p-3 mt-3 mr-5"
          placeholder="Add Comment"
          {...register("post", { required: "Text is required" })}
        />
        {/* <button className="btn btn-accent mt-5">Details</button> */}
        {user?.uid ? (
          <Link to="/postdetail">
            <button className="btn btn-accent mt-5">Details</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="btn btn-accent mt-5">Details</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EachPost;
