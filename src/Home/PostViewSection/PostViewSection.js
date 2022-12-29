import { useQuery } from "@tanstack/react-query";
import React from "react";

const PostViewSection = () => {
  const { data: allpost } = useQuery({
    queryKey: ["allposts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allposts");
      const data = await res.json();
      return data;
    },
  });

  //   const { totalCount } = allposts;
  console.log(allpost);

  return (
    <div>
      <h2>Post View Section: </h2>
      {/* <h2>{totalCount}</h2> */}
    </div>
  );
};

export default PostViewSection;
