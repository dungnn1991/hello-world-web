import React, { useMemo } from "react";
import tw from "twin.macro";

import ReactApexChart from "react-apexcharts";

import { Loading } from "@components/icons/Icon";
import { DASHBOARD_PAGE } from "@constants";
import { formatNumber } from "@utils";
import { ApexOptions } from "apexcharts";

const MINIMUM_PERCENT = 1;

const EmptyData = React.memo(
  tw.div`absolute left-0 top-0 w-full h-full flex items-center justify-center bg-white bg-opacity-40`
);

const DonutChart: React.FC<{
  rawSeries: number[];
  categories?: string[] | undefined;
  chartColors?: string[];
  loading: boolean;
  size?: number;
  labelColors?: string[];
  name?: string;
}> = ({
  rawSeries,
  categories,
  chartColors,
  loading,
  size = 300,
  labelColors,
  name,
}) => {
  const total = rawSeries?.reduce((a, v) => a + v, 0);
  const accuracyPercentage = rawSeries?.map((v) => (v / total) * 100);
  const roundUpPercentage = accuracyPercentage?.map((percent) =>
    percent === 0 ? 0 : Math.max(percent, MINIMUM_PERCENT)
  );
  const options: ApexOptions = useMemo(() => {
    return {
      bezierCurve: false,
      labels: categories,
      chart: {
        toolbar: {
          show: false,
        },
        type: "donut",
        zoom: { enabled: false },
        height: size,
        width: "100%",
      },
      dataLabels: {
        enabled: true,
        formatter(_, { seriesIndex }) {
          const val = roundUpPercentage[seriesIndex];
          if (val) {
            return `${val.toFixed(2).replace(".", ",")}%`;
          }
          return "";
        },
        style: {
          colors: labelColors || ["#fff", "#000"],
          fontSize: "12.5px",
          fontWeight: 500,
        },
      },
      tooltip: {
        custom({ seriesIndex }) {
          return (
            `${
              "<div class='px-4 py-2'>" +
              `<p><b>${categories && categories[seriesIndex]}</b>`
            }  <p>Tỷ lệ: ${accuracyPercentage[seriesIndex]
              ?.toFixed(2)
              .replace(".", ",")}% </p>` +
            `<p>Số lượng: ${formatNumber(
              rawSeries[seriesIndex],
              "."
            )} </p> </div>`
          );
        },
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: 320,
            },
          },
        },
      ],

      legend: {
        show: true,
        onItemClick: {
          toggleDataSeries: false,
        },
        onItemHover: {
          highlightDataSeries: false,
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "48px",
          },
        },
      },
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
        active: {
          filter: {
            type: "none",
          },
        },
      },
      colors: chartColors,
    };
  }, [
    categories,
    chartColors,
    labelColors,
    rawSeries,
    size,
    roundUpPercentage,
    accuracyPercentage,
  ]);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center  ">
      <ReactApexChart
        options={options}
        series={roundUpPercentage}
        type="donut"
        height={size}
      />
      {name && (
        <div>
          <p className="mt-2 text-center font-medium text-[#36383A] text-sm">
            {name}
          </p>
        </div>
      )}

      {loading && (
        <EmptyData>
          <div className="mt-8 text-neutral-500">
            <Loading />
          </div>
        </EmptyData>
      )}
      {categories?.length === 0 && !loading && (
        <EmptyData>
          <div className="py-1 px-2 shadow-1 bg-white rounded-lg">
            {DASHBOARD_PAGE.EMPTY_CHART_DATA}
          </div>
        </EmptyData>
      )}
    </div>
  );
};

export default DonutChart;
