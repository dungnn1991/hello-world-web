import AreaChart from "@components/chart/AreaChart";
import { Option, Select } from "@components/customized/Select";
import { loadableOverviewStats, statsFilterState } from "@stores/state";
import { formatDateTimeForChart } from "@utils";
import { useAtom, useAtomValue } from "jotai";
import React, { useMemo, useState } from "react";
import StatsTitle from "../StatsTitle";
import { OverviewItem } from "@dts";
import { addDays, isSameDay } from "date-fns";

const OverviewStats: React.FC = () => {
  const filter = useAtomValue(statsFilterState);
  const [type, setType] = useState<string>("visitUser");

  const [value] = useAtom(loadableOverviewStats);

  const { series, categories } = useMemo(() => {
    const series: { name: string; data: number[] }[] = [];
    const data: number[] = [];
    const categories: number[] = [];
    const map: Record<number, number> = {};
    if (value.state === "hasData") {
      value.data?.stats.A1.forEach((item) => {
        map[item.time] = item[type] || 0;
      });
      let start = filter.endTime.getTime();

      if (isSameDay(new Date(), start)) {
        start = addDays(start, -1).getTime();
      }

      while (start > filter.startTime.getTime()) {
        data.push(map[start] || 0);
        categories.push(start);
        start = addDays(start, -1).getTime();
      }
      series.push({ name: "", data });
    }
    return { series, categories };
  }, [value, type]);
  return (
    <div>
      <div className="flex flex-col gap-2 bg-white p-4 ">
        <StatsTitle title="Tổng quan về xu hướng" />

        <Select
          value={type}
          closeOnSelect
          onChange={(val: string) => setType(val)}
        >
          <Option value={"visitUser"} title="Số lượng truy cập" />
          <Option value={"activeUser"} title="Số người dùng" />
          <Option value={"newUser"} title="Số người dùng mới" />
        </Select>
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

export default OverviewStats;
