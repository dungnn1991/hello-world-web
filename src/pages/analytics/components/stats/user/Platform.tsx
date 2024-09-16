import React, { useMemo } from "react";
import StatsTitle from "../StatsTitle";
import { useAtom } from "jotai";
import { loadablePlatformStats } from "@stores/state";
import DonutChart from "@components/chart/DonutChart";

const Platform: React.FC = () => {
  const [value] = useAtom(loadablePlatformStats);

  const { series, categories } = useMemo(() => {
    const empty = { series: [], categories: [] };
    if (value.state !== "hasData") {
      return empty;
    }

    const stats = value.data.stats;

    if (!stats || stats.length == 0) {
      return empty;
    }

    const init = { totalIOS: 0, totalAndroid: 0, totalOthers: 0 };
    const categories = ["iOS", "Android", "Others"];

    const { totalAndroid, totalIOS, totalOthers } = stats.reduce(
      (pre, curr) => ({
        totalAndroid: pre.totalAndroid + curr["Android"] || 0,
        totalOthers: pre.totalOthers + curr["Others"] || 0,
        totalIOS: pre.totalIOS + curr["iOS"] || 0,
      }),
      init
    );

    return { categories, series: [totalIOS, totalAndroid, totalOthers] };
  }, [value]);

  return (
    <div className="bg-white mt-1 p-4">
      <StatsTitle title="Hệ điều hành" />

      <DonutChart
        rawSeries={series}
        categories={categories}
        chartColors={["#006AF5", "#ECF5FF", "#01058A"]}
        loading={value.state === "loading"}
        size={300}
      />
    </div>
  );
};

export default Platform;
