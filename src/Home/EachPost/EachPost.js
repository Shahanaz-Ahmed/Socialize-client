import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import love from "../../assets/heart.png";
import { AuthContext } from "../../contexts/AuthProvider";

const EachPost = ({ allpost }) => {
  const { user, loading } = useContext(AuthContext);
  const { _id, userPhoto, name, text, image, totalCount, comment } = allpost;
  //new
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const [count, setCount] = useState(0);
  // const [newComment, setNewComment] = useState("");

  // const [commentcnt, setCommentCnt] = useState(0);
  const handleCount = (count) => {
    // setCount(count + 1);
    count = count;
    count = count + 1;

    setCount(count);
    // console.log(count);
    // console.log(_id);
    //
    fetch(
      ` https://social-media-task-server-eight.vercel.app/allposts/${_id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ count: count + totalCount }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount > 0) {
          count = count;
          // console.log(count);
        }
      });
  };

  //new
  // const { data: allposts = [] } = useQuery({
  //   queryKey: ["allposts"],
  //   queryFn: async () => {
  //     const res = await fetch(" https://social-media-task-server-eight.vercel.app/allposts");
  //     const data = await res.json();
  //     return data;
  //   },
  // });

  // const { totalCount } = allposts;
  // console.log(totalCount);

  // const handleComment = (data) => {
  //   // let comment;
  //   console.log(data);
  //   setNewComment(data.comment);
  //   // const commentcount = data.console.log(commentcount);
  //   fetch(` https://social-media-task-server-eight.vercel.app/allposts/${_id}`, {
  //     method: "PUT",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ comment: [...[data.comment]] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data);
  //       if (data.modifiedCount > 0) {
  //         newComment = data.comment;
  //         // console.log(count);
  //       }
  //     });
  // };
  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  return (
    <div className="grid grid-cols-1">
      <div className="pl-5 py-5 mb-8 shadow-md rounded-md bg-white">
        <div className="flex gap-4 items-center mb-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={userPhoto} alt="" />
            </div>
          </div>
          <p className="text-xl">{name}</p>
          <hr />
        </div>
        <p className="pb-5 italic text-xl">{text}</p>
        <img className="w-full pr-5 h-[350px]" src={image} alt="" />
        <div className="flex gap-3 items-center mt-3">
          <button onClick={() => handleCount(count)} className="">
            <img className="w-8 h-8 hover:bg-red-200" src={love} alt="" />
          </button>
          <p>{totalCount + count}</p>
          <p>{comment}</p>
        </div>
        <div className="flex justify-between item mr-5">
          {/* Comment Section */}
          <div>
            <form onSubmit={handleSubmit()}>
              <input
                className="textarea textarea-bordered  rounded-2xl p-3 mt-3 mr-5"
                placeholder="Add Comment"
                {...register("comment", { required: "Text is required" })}
              />
              <button className="btn btn-accent sm:pt-5">Comment</button>
            </form>
          </div>

          {/* detail Button  */}
          <div>
            {user?.uid ? (
              <Link to={`/postdetail/${_id}`}>
                <button className="btn btn-accent mt-5">Details</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="btn btn-accent mt-5">Details</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachPost;
