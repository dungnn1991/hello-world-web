import React, { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";

export interface IStatisticNumber {
  value: number;
  suffix?: string;
}

const StatisticsNumber: React.FC<IStatisticNumber> = ({
  value,
  suffix = "",
}) => {
  const countUpRef = useRef<HTMLDivElement>(null);

  const { update } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: value,
    duration: 1,
    separator: ",",
    decimal: "2",
    suffix,
    startOnMount: false,
  });

  useEffect(() => {
    update(value);
  }, [value]);

  return <h2 ref={countUpRef} />;
};

export default StatisticsNumber;
