import React, {
  useLayoutEffect,
  useRef,
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

type Props = Omit<HTMLAttributes<HTMLDivElement>, "onScroll"> & {
  id?: string;
  disableInsetBottom?: boolean;
};

export const PageContainer: FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useLayoutEffect(() => {
    const key = props.id ?? location.key;

    const el = ref.current;
    if (el) {
      const storedStr = sessionStorage.getItem("__scroll_restoration__");
      const stored = storedStr ? JSON.parse(storedStr) : {};

      const scrollY = stored[key];
      if (scrollY) {
        setTimeout(() => {
          el.scrollTo(0, parseInt(scrollY));
        }, 100);
      } else {
        el.scrollTo(0, 0);
      }
    }
    return () => {
      if (el) {
        const storedStr = sessionStorage.getItem("__scroll_restoration__");
        const stored = storedStr ? JSON.parse(storedStr) : {};
        stored[key] = el.scrollTop;
        sessionStorage.setItem(
          "__scroll_restoration__",
          JSON.stringify(stored)
        );
      }
    };
  }, [location.key, props.id]);

  return (
    <PageContainerElement {...props} ref={ref}>
      {children}
    </PageContainerElement>
  );
};

export const PageContainerElement = styled.div<Props>`
  box-sizing: border-box;
  height: 100vh;
  overflow-y: auto;
  --inset-top: var(--zaui-safe-area-inset-top);
  --inset-bottom: var(--zaui-safe-area-inset-bottom);
  padding-top: calc(var(--inset-top) + 47px);
  padding-bottom: calc(var(--inset-bottom) + 0px);

  &::-webkit-scrollbar {
    display: none;
  }
`;
