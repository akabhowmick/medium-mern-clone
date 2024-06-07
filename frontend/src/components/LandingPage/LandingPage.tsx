import React from "react";
import LandHeader from "./LandHeader";
import LandingMainPage from "./LandingMainPage";

export const LandingPage = ({userDetails}) => {
  return (
    <div>
      <LandHeader />
      <main>
        <LandingMainPage userDetails = {userDetails} />
      </main>
    </div>
  );
};