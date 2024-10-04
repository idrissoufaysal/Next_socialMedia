import Loader from "@/components/shared/Loader";
import React from "react";

export default function HomePage() {
  const isPostLoading = false;
  const posts = null;

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full"> Home Feed</h2>
          {isPostLoading && !posts ? <Loader /> : 
          <ul className="flex flex-1 flex-col gap-9  w-full">
            Text
             </ul>}
        </div>
      </div>
    </div>
  );
}
