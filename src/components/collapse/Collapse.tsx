import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Icon from "zmp-ui/icon";
interface CollapseProps {
  defaultVisible?: boolean;
  children?: React.ReactNode;
  title?: string | React.ReactNode;
}
const Wrapper = styled.div`
  ${tw`last:border-b last:border-b`}
`;

const SectionTrigger = styled.div`
  ${tw` relative flex items-center w-full cursor-pointer justify-between border-t border-t pr-4`}
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
`;

const ArrowIcon = styled(Icon)`
  ${tw``}
`;

const ContentContainer = styled.div<{
  $visible?: string;
}>`
  ${tw`transition-all duration-500 overflow-hidden`}
  ${({ $visible: visible }) =>
    visible === "true" ? tw`max-h-[1000vh] pt-0` : tw`max-h-0`}
`;

type Ref = HTMLDivElement;

const Collapse = forwardRef<Ref, CollapseProps>((props, ref) => {
  const { defaultVisible, children, title } = props;
  const [visible, setVisible] = useState<boolean>(!!defaultVisible);
  const iconContent = visible ? "zi-chevron-up" : "zi-chevron-down";
  return (
    <Wrapper>
      <SectionTrigger
        ref={ref}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {typeof title === "string" ? <span>{title}</span> : title}
        <ArrowIcon icon={iconContent} />
      </SectionTrigger>
      <ContentContainer $visible={visible.toString()}>
        {children}
      </ContentContainer>
    </Wrapper>
  );
});

export default Collapse;
