import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostSection from "../PostSection/PostSection";
import PostViewSection from "../PostViewSection/PostViewSection";

const Home = () => {
  // const { data: likeCount = [] } = useQuery({
  //   queryKey: ["likeCount"],
  //   queryFn: async () => {
  //     const res = await fetch("http://localhost:5000/likeCount");
  //     const data = await res.json();
  //     // console.log(data);
  //     return data;
  //   },
  // });
  // console.log(likeCount);

  const { data: homePost = [] } = useQuery({
    queryKey: ["allposts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/home/allposts");
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1  sm:grid-cols-1">
      <PostSection></PostSection>
      <h2 className="text-2xl italic font-serif font-bold text-center">
        Top Three Reacted Post
      </h2>
      {homePost.map((like) => (
        <PostViewSection key={like._id} like={like}></PostViewSection>
      ))}
    </div>
  );
};

export default Home;
