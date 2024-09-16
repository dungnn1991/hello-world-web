import AreaChart from "@components/chart/AreaChart";
import { Button } from "@components/customized";
import { loadableUsedTimeStats } from "@stores/state";
import { isSameDay } from "date-fns";
import { useAtom } from "jotai";
import React, { useMemo, useState } from "react";
import StatsTitle from "../StatsTitle";

const DURATIONS = [
  {
    label: "0-30s",
    value: "030",
  },
  {
    label: "30-60s",
    value: "3060",
  },
  {
    label: "60-180s",
    value: "60180",
  },
  {
    label: "180+",
    value: "180",
  },
];

const UsedTime: React.FC = () => {
  const [value] = useAtom(loadableUsedTimeStats);

  const [duration, setDuration] = useState("030");

  const { series, categories } = useMemo(() => {
    if (value.state !== "hasData") {
      return { series: [], categories: [] };
    }

    const categories: number[] = [];
    const series: { name: string; data: number[] }[] = [];
    const data: number[] = [];
    const now = new Date();
    value.data.stats?.[duration]?.forEach(({ time, count }) => {
      const timeInMs = time * 1000;
      if (!isSameDay(now, timeInMs)) {
        data.push(count);
        categories.push(timeInMs);
      }
    });
    series.push({ name: "", data });
    return { series, categories };
  }, [value, duration]);

  return (
    <div className=" bg-white mt-1">
      <div className="p-4">
        <StatsTitle title="Used Time" />
      </div>

      <div className="flex justify-center gap-2 my-2">
        {DURATIONS.map(({ label, value }) => (
          <Button
            size="small"
            key={value}
            variant={value === duration ? "primary" : "secondary"}
            value={value}
            onClick={() => setDuration(value)}
          >
            {label}
          </Button>
        ))}
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

export default UsedTime;
