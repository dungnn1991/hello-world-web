import React, { useMemo } from "react";
import tw from "twin.macro";

import ReactApexChart from "react-apexcharts";

import { Loading } from "@components/icons/Icon";
import { DASHBOARD_PAGE } from "@constants";
import { formatAbbreviatedNumber, formatNumberChart } from "@utils";
import { ApexOptions } from "apexcharts";

const EmptyData = React.memo(
  tw.div`absolute left-0 top-0 w-full h-full flex items-center justify-center bg-white bg-opacity-40`
);

const AreaChart: React.FC<{
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[][] | string[] | number[];
  chartColors: string[];
  loading: boolean;
  pointAmount?: number;
  minYAxis?: number;
  height?: number;
  type?: "category" | "datetime" | "numeric";
}> = ({
  series,
  categories,
  chartColors,
  loading,
  pointAmount = 10,
  minYAxis,
  height = 300,
  type = "category",
}) => {
  const options: ApexOptions = useMemo(() => {
    return {
      bezierCurve: false,
      chart: {
        toolbar: {
          show: false,
        },
        zoom: { enabled: false },
        width: "100%",
      },

      xaxis: {
        type,
        categories,
        tickAmount: pointAmount,
        labels: {
          rotate: 0,
          datetimeUTC: false,
        },
        tooltip: {
          enabled: false,
        },
      },

      yaxis: {
        labels: {
          formatter: formatAbbreviatedNumber,
        },
        tickAmount: 6,
        forceNiceScale: true,
        min: minYAxis,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.2,
          opacityTo: 0,
          stops: [0, 60, 100],
        },
      },
      colors: chartColors,
      stroke: {
        curve: "smooth",
        width: 2,
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        hideEmptySeries: false,
        y: {
          formatter: formatNumberChart,
          title: {
            formatter: (seriesName) => {
              return seriesName.replace("series-1", "");
            },
          },
        },
        x: {
          format: "dd MMM yyyy",
        },
      },
    };
  }, [categories, chartColors, minYAxis, pointAmount, type]);
  return (
    <div className="bg-white rounded-lg relative px-3">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={height}
        width={"100%"}
      />
      {loading && (
        <EmptyData>
          <Loading />
        </EmptyData>
      )}
      {(!categories || categories?.length === 0) && !loading && (
        <EmptyData>
          <div className="py-1 px-2 shadow-1 bg-white rounded-lg -mt-8">
            {DASHBOARD_PAGE.EMPTY_CHART_DATA}
          </div>
        </EmptyData>
      )}
    </div>
  );
};

export default React.memo(AreaChart);
