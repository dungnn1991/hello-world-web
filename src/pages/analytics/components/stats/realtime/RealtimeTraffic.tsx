import AreaChart from "@components/chart/AreaChart";
import { Option, Select } from "@components/customized/Select";
import { loadablePageViewStats, pageviewFilterState } from "@stores/state";
import { format } from "date-fns";
import { useAtom } from "jotai";
import React, { useCallback, useMemo } from "react";
import StatsTitle from "../StatsTitle";

const RealtimeTraffic: React.FC = () => {
  const [value] = useAtom(loadablePageViewStats);

  const [type, setType] = useAtom(pageviewFilterState);

  const { series, categories } = useMemo(() => {
    const series: { name: string; data: number[] }[] = [];
    const data: number[] = [];
    const categories: string[][] = [];

    if (value.state === "hasData") {
      value.data?.pageview.forEach(({ time, count }) => {
        data.push(count);
        const timeInMs = time * 1000;
        categories.push([
          format(timeInMs, "HH:mm"),
          format(timeInMs, "dd-MMM"),
        ]);
      });
      series.push({ name: "", data });
    }
    return { series, categories };
  }, [value]);

  const onChange = useCallback(
    (val: string) => {
      if (val !== type) {
        setType(val);
      }
    },
    [type]
  );

  return (
    <div className="bg-white ">
      <div className=" p-4">
        <StatsTitle title="Lượt truy cập thời gian thực" />

        <Select
          closeOnSelect
          value={type}
          onChange={(val: string) => onChange(val)}
        >
          <Option value={"1"} title="Ngày gần nhất" />
          <Option value={"7"} title="Tuần gần nhất" />
        </Select>
      </div>

      <AreaChart
        loading={value.state === "loading"}
        pointAmount={5}
        chartColors={["blue"]}
        series={series}
        categories={categories}
        minYAxis={0}
      />
    </div>
  );
};

export default RealtimeTraffic;
