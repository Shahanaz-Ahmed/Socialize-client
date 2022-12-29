import { useQuery } from "@tanstack/react-query";
import React from "react";

import EachPost from "../EachPost/EachPost";

const Media = () => {
  const { data: allposts = [] } = useQuery({
    queryKey: ["allposts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allposts");
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
    <div className="">
      <h2 className="text-center text-2xl font-serif italic font-bold">
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
