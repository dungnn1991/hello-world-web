import React from "react";
import Icon from "zmp-ui/icon";

const ArrowIcon: React.FC<{ value: number }> = ({ value }) => {
  if (value >= 0) {
    return <Icon icon="zi-arrow-up" className="text-[#006AF5]" />;
  }
  return <Icon className="text-red-500" icon="zi-arrow-down" />;
};

export default React.memo(ArrowIcon);
