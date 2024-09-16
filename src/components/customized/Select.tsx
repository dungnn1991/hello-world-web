import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import ZSelect, { SelectProps } from "zmp-ui/select";

const StyledSelect = styled(ZSelect)`
  &.zaui-input-group-wrapper .zaui-input-group .zaui-input-affix-wrapper {
    ${tw`bg-[#F7F7F8] rounded-xl border-[#E9EBED]`}
  }

  &.zaui-input-affix-wrapper {
    ${tw`bg-[#F7F7F8] rounded-xl border-[#E9EBED]`}
  }
`;
const AppSelect: React.FC<SelectProps> = (props) => {
  return <StyledSelect {...props} />;
};

const { Option } = ZSelect;

export { Option, AppSelect as Select };
