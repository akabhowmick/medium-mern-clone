import React from "react";
import ListMain from "./ListMain";
import LandHeader from "../LandingPage/LandHeader";

const Index = ({ userDetails }) => {
  return (
    <div>
      <LandHeader />
      <ListMain userDetails={userDetails} />
    </div>
  );
};

export default Index;
