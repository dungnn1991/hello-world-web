import React from "react";

import { formatAbbreviatedNumber } from "@utils";
import { ApexOptions } from "apexcharts";
import { useMemo } from "react";

import { Loading } from "@components/icons/Icon";
import { DASHBOARD_PAGE } from "@constants";
import ReactApexChart from "react-apexcharts";
import tw from "twin.macro";

const EmptyData = tw.div`absolute left-0 top-0 w-full h-full flex items-center justify-center bg-white bg-opacity-40`;
interface Props {
  series: {
    name: string;
    color: string;
    data: number[];
  }[];
  categories: string[] | number[];
  loading: boolean;
  borderRadius?: number;
  borderRadiusWhenStacked?: "all" | "last";
  minYAxis: number;
  isEmpty: boolean;
  showLegend?: boolean;
  height?: number;
  columnWidth?: number;
}

const StackedColumnChart: React.FC<Props> = ({
  series,
  categories,
  loading,
  borderRadius,
  borderRadiusWhenStacked = "last",
  minYAxis,
  isEmpty,
  showLegend = false,
  height = 450,
  columnWidth = 90,
}) => {
  const options = useMemo<ApexOptions>(() => {
    return {
      chart: {
        type: "bar",
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: { enabled: false },
      },
      xaxis: {
        type: "datetime",
        categories,
        tickAmount: 3,
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
        forceNiceScale: true,
        min: minYAxis,
      },
      legend: {
        showForSingleSeries: true,
        show: showLegend,
        position: "top",
        horizontalAlign: "left",
      },
      dataLabels: {
        enabled: false,
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
      plotOptions: {
        bar: {
          borderRadius: borderRadius || 0,
          borderRadiusWhenStacked,
          columnWidth: `${columnWidth}%`,
        },
      },
      tooltip: {
        hideEmptySeries: false,

        x: {
          format: "dd MMM yyyy",
        },
      },
    };
  }, [borderRadius, categories, minYAxis, showLegend, columnWidth]);
  return (
    <div className="rounded-lg px-3 relative ">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={height}
      />
      {loading && (
        <EmptyData>
          <Loading tw="-mt-8 text-neutral-500 " />
        </EmptyData>
      )}
      {isEmpty && !loading && (
        <EmptyData>
          <div className="py-1 px-2 shadow-1 bg-white rounded-lg -mt-8">
            {DASHBOARD_PAGE.EMPTY_CHART_DATA}
          </div>
        </EmptyData>
      )}
    </div>
  );
};
export default StackedColumnChart;
