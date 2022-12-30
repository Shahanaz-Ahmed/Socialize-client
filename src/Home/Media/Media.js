import { useQuery } from "@tanstack/react-query";
import React from "react";

import EachPost from "../EachPost/EachPost";

const Media = () => {
  const { data: allposts = [] } = useQuery({
    queryKey: ["allposts"],
    queryFn: async () => {
      const res = await fetch(
        " https://social-media-task-server-eight.vercel.app/allposts"
      );
      const data = await res.json();
      return data;
    },
  });
  // const handleReact = () => {
  //   let react = 0;
  //   react++;
  //   console.log(react);
  // };

  return (
    <div className="grid sm:grid-cols-1">
      <h2 className="text-center text-3xl font-serif italic font-bold text-accent my-5">
        Media: {allposts?.length}
      </h2>
      <div className="">
        {allposts.map((allpost, i) => (
          <EachPost allpost={allpost} key={i}></EachPost>
        ))}
      </div>
    </div>
  );
};

export default Media;
