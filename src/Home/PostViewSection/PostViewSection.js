import React, { useState } from "react";
import { useForm } from "react-hook-form";
import love from "../../assets/heart.png";

const PostViewSection = ({ like }) => {
  const {
    register,
    // handleSubmit,
    // formState: { errors },
  } = useForm();

  const { _id, totalCount, userPhoto, name, text, image } = like;
  console.log(like);
  // const { totalCount } = like;
  // console.log(totalCount);

  // const { data: likeCount } = useQuery({
  //   queryKey: ["likeCount"],
  //   queryFn: async () => {
  //     const res = await fetch(
  //       `http://localhost:5000/home/allposts?totalCount=${totalCount}`
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //     return data;
  //   },
  // });

  // const { data: homePost } = useQuery({
  //   queryKey: ["allposts"],
  //   queryFn: async () => {
  //     const res = await fetch("http://localhost:5000/home/allposts");
  //     const data = await res.json();
  //     console.log(data);
  //     return data;
  //   },
  // });
  const [count, setCount] = useState(0);
  const handleCount = (count) => {
    // setCount(count + 1);
    count = count;
    count = count + 1;

    setCount(count);
    console.log(count);
    console.log(_id);
    //
    fetch(`http://localhost:5000/allposts/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ count: count + totalCount }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          count = count;
          console.log(count);
        }
      });
  };

  return (
    <div>
      <div className="grid grid-cols-1">
        <div className="pl-5 py-5 mb-8 shadow-md rounded-md bg-white">
          <div className="flex gap-4 items-center mb-3">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={userPhoto} alt="" />
              </div>
            </div>
            <p>{name}</p>
          </div>
          <p className="pb-5 italic text-xl">{text}</p>
          <img className="w-full pr-5 h-[350px]" src={image} alt="" />
          <div className="flex gap-3 items-center mt-3">
            <button onClick={() => handleCount(count)} className="">
              <img className="w-8 h-8 hover:bg-red-200" src={love} alt="" />
            </button>
            <p>{totalCount + count}</p>
            {/* <p>{totalCount}</p> */}
          </div>
          {/* new */}
          <div className="flex justify-between item mr-5">
            <div>
              <input
                className="textarea textarea-bordered  rounded-2xl p-3 mt-3 mr-5"
                placeholder="Add Comment"
                {...register("post", { required: "Text is required" })}
              />
              <button className="btn btn-accent mt">Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostViewSection;
