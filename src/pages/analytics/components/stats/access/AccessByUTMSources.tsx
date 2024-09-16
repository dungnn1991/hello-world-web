import React, { useMemo } from "react";
import StatsTitle from "../StatsTitle";
import StackedColumnChart from "@components/chart/StackedColumnChart";
import { useAtom } from "jotai";
import { loadableTrafficByUtmSourcesStats } from "@stores/state";
import { formatDateTimeForChart, stringToColor } from "@utils";

const COLORS = [
  "#f26c44",
  "#ff9b2b",
  "#ffb424",
  "#b3c421",
  "#99a536",
  "#348621",
  "#236d4a",
  "#00b28a",
  "#00cdc9",
  "#00b1e7",
  "#0189bb",
  "#006bba",
  "#596ad4",
  "#8876be",
  "#8c3ca5",
  "#ce7fd0",
  "#c84ebb",
  "#a2467f",
  "#e42e69",
  "#e05467",
];

const AccessByUTMSources: React.FC = () => {
  const [value] = useAtom(loadableTrafficByUtmSourcesStats);

  const categories = useMemo(() => {
    if (value.state !== "hasData") {
      return [];
    }
    return value.data.stats.map((item) => item.time);
  }, [value]);

  const series = useMemo(() => {
    if (value.state !== "hasData") {
      return [];
    }

    return value.data.utmSources
      .map((utmSource, i) => ({
        name: utmSource,
        color: COLORS[i] || stringToColor(utmSource),
        data: value.data.stats.map((item) => item.stats[utmSource] || 0) || [],
      }))
      .reverse();
  }, [value]);

  return (
    <div>
      <div className="p-4 bg-white mt-1">
        <StatsTitle title="Thống kê theo UTM Sources" />
      </div>

      <div className="bg-white">
        <StackedColumnChart
          series={series}
          categories={categories}
          loading={value.state === "loading"}
          minYAxis={0}
          isEmpty={series.length === 0}
          showLegend
          height={400}
          columnWidth={55}
        />
      </div>
    </div>
  );
};

export default AccessByUTMSources;
