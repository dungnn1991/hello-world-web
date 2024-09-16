import React, { ReactElement, ReactNode } from "react";

type TabContentProps = {
  title: string | ReactNode;
  children: ReactElement | ReactElement[];
  disable?: boolean;
};

const TabContent: React.FC<TabContentProps> = ({ children }) => {
  return <div className="min-h-[50vh]">{children}</div>;
};

export default TabContent;
