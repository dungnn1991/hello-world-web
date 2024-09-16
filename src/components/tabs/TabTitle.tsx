/* eslint-disable sort-imports */
import React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const TabTitleHeader = styled.div<{ disable?: boolean }>`
  ${({ disable }) => (disable ? tw`cursor-not-allowed` : tw`cursor-pointer`)};
`;

export type TabTitleProps = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  isActive?: boolean;
  disable?: boolean;
};

const TabTitle: React.FC<TabTitleProps> = ({
  index,
  setSelectedTab,
  isActive,
  title,
  disable,
}) => {
  const handleOnClick = useCallback(() => {
    if (!disable) {
      setSelectedTab(index);
    }
  }, [setSelectedTab, index, disable]);

  return (
    <TabTitleHeader
      disable={disable}
      className={`min-w-fit p-3 text-[#767A7F] ${
        isActive ? "!text-[#005AE0] border-b-[2px] border-[#005AE0]" : ""
      }`}
      onClick={handleOnClick}
      id={`tab-${index}`}
    >
      <p className="font-semibold">{title}</p>
    </TabTitleHeader>
  );
};

export default TabTitle;
