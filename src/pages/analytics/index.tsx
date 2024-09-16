import React from "react";
import AnalyticsDetail from "./components/AnalyticsDetail";
import Filter from "./components/Filter";

const AnalyticsPage: React.FC = () => {
  return (
    <div>
      <Filter />
      <AnalyticsDetail />
    </div>
  );
};

export default AnalyticsPage;
