import React, { useMemo } from "react";
import StatsTitle from "../StatsTitle";
import DonutChart from "@components/chart/DonutChart";
import { useAtom } from "jotai";
import { loadableDemographicStats } from "@stores/state";
import HistogramChart from "@components/chart/HistogramChart";

const Demographic: React.FC = () => {
  const [value] = useAtom(loadableDemographicStats);

  const loading = useMemo(() => {
    return value.state === "loading";
  }, [value]);

  const { genderData, ageData, genderCate } = useMemo(() => {
    const empty = { genderData: [], ageData: [], genderCate: [] };
    if (value.state !== "hasData") {
      return empty;
    }
    const { stats } = value.data;
    if (!stats || (stats.age.length == 0 && stats.gender.length == 0)) {
      return empty;
    }

    const { age, gender } = stats;

    const { male, female } = gender.reduce(
      (pre, curr) => ({
        male: pre.male + curr.male || 0,
        female: pre.female + curr.female || 0,
      }),
      { male: 0, female: 0 }
    );

    const init: { [key: string]: number } = {};

    const sumByAgeRangeObject = age.reduce((result, entry) => {
      Object.keys(entry).forEach((key) => {
        if (key !== "time") {
          result[key] = (result[key] || 0) + entry[key];
        }
      });

      return result;
    }, init);

    const sortedSumByAgeRange = Object.keys(sumByAgeRangeObject).sort();

    const ageData = sortedSumByAgeRange.map((ageRange) => ({
      label: ageRange,
      value: sumByAgeRangeObject[ageRange],
    }));

    return {
      genderCate: ["Nam", "Nữ"],
      genderData: [male, female],
      ageData,
    };
  }, [value]);

  return (
    <div className="bg-white p-4 pb-0">
      <StatsTitle title="Giới tính & Tuổi" />

      <div className="flex flex-col gap-2">
        <DonutChart
          rawSeries={genderData}
          categories={genderCate}
          chartColors={["#006AF5", "#ECF5FF"]}
          loading={loading}
          size={300}
          name="Giới tính"
        />

        <HistogramChart data={ageData} loading={loading} label="Tuổi" />
      </div>
    </div>
  );
};

export default Demographic;
