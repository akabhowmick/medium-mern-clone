import React from "react";
import ListMain from "./ListMain";
import LandHeader from "../LandingPage/LandHeader";

export const Lists = ({ userDetails }) => {
  return (
    <div>
      <LandHeader />
      <ListMain userDetails={userDetails} />
    </div>
  );
};

