import React from "react";
import Demographic from "./Demographic";
import Platform from "./Platform";

const UserStats: React.FC = () => {
  return (
    <div>
      <Demographic />

      <Platform />
    </div>
  );
};

export default UserStats;
