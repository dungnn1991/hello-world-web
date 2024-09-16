import React, { ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Button, { ButtonProps } from "zmp-ui/button";

const StyledButton = styled(Button)`
  ${tw`text-white rounded-xl`}
  &.zaui-btn-disabled:disabled {
    ${tw`bg-transparent `}
  }
  &.zaui-btn-medium {
    ${tw`text-sm min-w-10 flex items-center`}
  }
  &.zaui-btn-small {
    ${tw`text-xs min-w-10 flex items-center rounded-lg `}
  }
  &.zaui-btn-secondary {
    ${tw`text-[#36383A] bg-[#F7F7F8] `}
  }
  &.zaui-btn-loading {
    ${tw`text-white`}
  }

  &:focus,
  &:active {
    ${tw` text-white`}
  }
`;

const IconButtonWithLabelWrapper = styled.div`
  ${tw`flex flex-col items-center`}
`;

const Label = styled.div`
  ${tw`text-base text-white mt-2`}
`;

const StyledIconButton = styled(Button)`
  ${tw` font-normal`}
`;

export const IconButtonWithLabel: React.FC<
  {
    icon: ReactElement;
    label: string;
  } & Pick<ButtonProps, "onClick">
> = ({ icon, label, onClick }) => {
  return (
    <IconButtonWithLabelWrapper>
      <StyledIconButton icon={icon} onClick={onClick}></StyledIconButton>
      <Label>{label}</Label>
    </IconButtonWithLabelWrapper>
  );
};

const AppButton: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default AppButton;
