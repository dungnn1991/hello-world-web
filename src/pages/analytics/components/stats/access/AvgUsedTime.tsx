import AreaChart from "@components/chart/AreaChart";
import { loadableAvgUsedTimeStats } from "@stores/state";
import { isSameDay } from "date-fns";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import StatsTitle from "../StatsTitle";

const AvgUsedTime: React.FC = () => {
  const [value] = useAtom(loadableAvgUsedTimeStats);

  const { categories, series } = useMemo(() => {
    if (value.state !== "hasData") {
      return { categories: [], series: [] };
    }

    const stats = value.data.stats;

    const categories: number[] = [];
    const series: { name: string; data: number[] }[] = [];
    const data: number[] = [];
    const now = new Date();
    stats.A1.forEach(({ time, count }) => {
      const timeInMs = time * 1000;
      if (!isSameDay(now, timeInMs)) {
        data.push(count);
        categories.push(timeInMs);
      }
    });
    series.push({ name: "", data });
    return { series, categories };
  }, [value]);

  return (
    <div>
      <div className="p-4 bg-white mt-1">
        <StatsTitle title="Avg Used Time" />
      </div>

      <AreaChart
        loading={value.state === "loading"}
        pointAmount={5}
        chartColors={["blue"]}
        series={series}
        categories={categories}
        minYAxis={0}
        type="datetime"
      />
    </div>
  );
};

export default AvgUsedTime;
