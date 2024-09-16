import React from "react";

const PercentNumber: React.FC<{ value: number }> = ({ value }) => {
  if (value >= 0) {
    return (
      <span className="font-semibold text-[#006AF5]">{value.toFixed(2)}%</span>
    );
  }
  return (
    <span className="font-semibold text-red-500">
      {(value * -1).toFixed(2)}%
    </span>
  );
};

export default PercentNumber;
