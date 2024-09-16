import { Loading } from "@components/icons/Icon";
import { DetailWebvitalsStats } from "@dts";
import React from "react";
import { WEBVITALS_CONFIG, calcAvgWebvitals, qualify } from "../webvitals";

export interface IPLTBadgeProps {
  data?: DetailWebvitalsStats;
  loading: boolean;
}

const PLTBadge: React.FC<IPLTBadgeProps> = ({ data, loading }) => {
  const value = data?.p75 || 0;

  const qualifyResult = qualify("PLT", value);

  return (
    <div className="flex flex-col gap-2 relative flex-none border-b mb-4 pb-4">
      {loading && (
        <div className="absolute h-[50%] w-full flex items-center justify-center">
          <Loading />
        </div>
      )}
      <div
        className="rounded-lg flex flex-col gap-6 py-3 px-4"
        style={{
          backgroundColor: qualifyResult.color,
          color: qualifyResult.textColor,
        }}
      >
        <p className="font-medium text-base">Page Load Time</p>
        <p className="font-bold text-4xl">
          {!value ? "No data" : calcAvgWebvitals("PLT", value)}
        </p>
      </div>
      <p className="leading-6">{WEBVITALS_CONFIG.PLT.description}</p>
    </div>
  );
};

export default PLTBadge;
