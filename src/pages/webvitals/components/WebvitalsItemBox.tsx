import Icon from "@components/icons";
import { DetailWebvitalsStats } from "@dts";
import React, { useMemo } from "react";
import {
  WEBVITALS_COLOR,
  WEBVITALS_CONFIG,
  calcAvgWebvitals,
  qualify,
} from "../webvitals";

export interface IWebvitalsItemBoxProps {
  loading: boolean;
  name: string;
  data?: DetailWebvitalsStats;
}

export const WebvitalsItemBox: React.FC<IWebvitalsItemBoxProps> = ({
  name,
  loading,
  data,
}) => {
  const { fullName } = useMemo(
    () => WEBVITALS_CONFIG[name as keyof typeof WEBVITALS_CONFIG],
    [name]
  );
  const qualifyResult = qualify(
    name,
    name === "PLT" ? data?.p75 || 0 : data?.p60 || 0
  );
  let value = data?.p60 || 0;
  let left = "58%";
  if (name === "PLT") {
    value = data?.p75 || 0;
    left = "73%";
  }
  return (
    <div className="relative flex flex-col">
      <p
        style={{
          marginBottom: 32,
          display: "flex",
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div
          className="w-[10px] h-[10px] rounded-sm"
          style={{ backgroundColor: qualifyResult.color }}
        />

        {` ${fullName} (${name})`}
      </p>
      {data?.percentStats.good && data?.percentStats.good > 0 && (
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "row",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              left,
              bottom: "-10.3px",
            }}
          >
            <p
              style={{
                color:
                  qualifyResult.color === WEBVITALS_COLOR["needs-improvement"]
                    ? "#C27500"
                    : qualifyResult.color,
              }}
            >
              {calcAvgWebvitals(name, value)}
            </p>
            <Icon.LinePerformance />
          </div>
          <div
            style={{
              flexGrow: (data?.percentStats?.good || 0) / 100,
              height: "6px",
              backgroundColor: WEBVITALS_COLOR.good,
              borderRadius: "2px 0 0 2px",
            }}
          />
          <div
            style={{
              flexGrow: (data?.percentStats?.["needs-improvement"] || 0) / 100,
              height: "6px",
              backgroundColor: WEBVITALS_COLOR["needs-improvement"],
            }}
          />
          <div
            style={{
              flexGrow: (data?.percentStats?.poor || 0) / 100,
              height: "6px",
              backgroundColor: WEBVITALS_COLOR.poor,
              borderRadius: "0 2px 2px 0",
            }}
          />
        </div>
      )}
      {!data?.percentStats.good && (
        <p className="absolute left-5 bottom-[-6px]">No data</p>
      )}
    </div>
  );
};
