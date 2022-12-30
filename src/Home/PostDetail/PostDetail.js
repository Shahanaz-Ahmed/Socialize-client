import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import love from "../../assets/heart.png";

const PostDetail = () => {
  const postDetail = useLoaderData();
  console.log(postDetail);

  const { _id, name, image, text, totalCount, userPhoto } = postDetail;

  const [count, setCount] = useState(0);
  const handleCount = (count) => {
    // setCount(count + 1);
    count = count;
    count = count + 1;

    setCount(count);
    // console.log(count);
    // console.log(_id);
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
        // console.log(data);
        if (data.modifiedCount > 0) {
          count = count;
          // console.log(count);
        }
      });
  };

  return (
    <div>
      <div className="grid grid-cols-1 mt-8">
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
            <p>{totalCount + count} </p>
          </div>
          <div className="flex justify-between item mr-5"></div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
