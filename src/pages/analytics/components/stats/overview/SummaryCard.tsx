import { Loading } from "@components/icons/Icon";
import StatisticsNumber from "@components/statistics";
import { Diff } from "@dts";
import classNames from "classnames";
import React from "react";
import Icon from "zmp-ui/icon";
import ArrowIcon from "./ArrowIcon";
import PercentNumber from "./PercentNumber";

export interface ISummaryCardProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  diff?: Diff[];
  loading: boolean;
  tooltip?: string;
  tooltipPosition?: "left" | "right";
}

const SummaryCard: React.FC<ISummaryCardProps> = (props) => {
  const {
    icon,
    value,
    diff,
    label,
    loading,
    tooltip,
    tooltipPosition = "right",
  } = props;

  return (
    <div className="bg-[#F5F7FA] p-4 rounded-lg flex flex-col gap-2 ">
      <div className="flex flex-col gap-3">
        {icon}
        <div className="flex gap-2 items-start justify-center min-h-10">
          <p className="flex-grow text-[#6F7071]">{label}</p>
          <div className="group relative">
            <Icon className="mr-0" icon="zi-info-circle" size={17} />
            {tooltip && (
              <div
                className={classNames(
                  "absolute bottom-5 scale-0   group-hover:scale-100 w-48  transition-all duration-300 z-10 p-4 text-sm bg-[rgba(0,0,0,0.8)] text-white rounded-xl",
                  {
                    "right-[-5]": tooltipPosition === "right",
                  },
                  {
                    "right-0": tooltipPosition === "left",
                  }
                )}
              >
                {tooltip}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="text-2xl font-bold">
            <StatisticsNumber value={value} />
          </div>

          <div className="flex flex-col gap-2">
            {diff
              ?.filter(
                (item) => ![null, undefined, Infinity, NaN].includes(item.value)
              )
              .map((item, index) => (
                <div className="flex gap-2" key={`${label}Diff${index}`}>
                  <ArrowIcon value={item.value} />
                  <p>
                    <PercentNumber value={item.value} />
                    &nbsp;vs {item.label}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
