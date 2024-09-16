import React from "react";
import OverviewStats from "../overview/OverviewStats";
import AccessByUTMSources from "./AccessByUTMSources";
import AvgUsedTime from "./AvgUsedTime";
import SourceOfAccess from "./SourceOfAccess";
import UsedTime from "./UsedTime";

const AccessTrafficStats: React.FC = () => {
  return (
    <div>
      <OverviewStats />
      <SourceOfAccess />
      <AccessByUTMSources />
      <AvgUsedTime />
      <UsedTime />
    </div>
  );
};

export default AccessTrafficStats;
