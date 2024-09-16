import React from "react";
import StatsTitle from "../StatsTitle";
import Summary from "./Summary";
import OverviewStats from "./OverviewStats";

const Overview: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 bg-white p-4 mb-2">
        <StatsTitle title="Tổng quan" />
        <Summary />
      </div>

      <OverviewStats />
    </div>
  );
};

export default Overview;
