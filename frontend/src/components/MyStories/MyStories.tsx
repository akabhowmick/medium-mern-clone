import React from "react";
import LandHeader from "../LandingPage/LandHeader";
import StoriesMain from "./StoriesMain";

export const MyStories = ({ userDetails }) => {
  return (
    <div>
      <LandHeader />
      <StoriesMain userDetails={userDetails} />
    </div>
  );
};
