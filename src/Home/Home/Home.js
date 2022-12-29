import React from "react";
import PostSection from "../PostSection/PostSection";
import PostViewSection from "../PostViewSection/PostViewSection";

const Home = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1  sm:grid-cols-1">
      <PostSection></PostSection>
      <PostViewSection></PostViewSection>
    </div>
  );
};

export default Home;
