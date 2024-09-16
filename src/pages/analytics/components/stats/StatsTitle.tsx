import React from "react";
import Icon from "zmp-ui/icon";

export interface IStatsTitleProps {
  title: string;
}

const StatsTitle: React.FC<IStatsTitleProps> = ({ title }) => {
  return (
    <div className="flex gap-2 items-center">
      <strong className="text-lg">{title}</strong>
      <Icon icon="zi-info-circle" size={17} />
    </div>
  );
};

export default React.memo(StatsTitle);
