import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import TabTitle, { TabTitleProps } from "./TabTitle";

type TabsProps = {
  children: ReactElement<TabTitleProps>[];
  defaultActiveIndex?: number;
};

const Tabs: React.FC<TabsProps> = ({ defaultActiveIndex, children }) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  useEffect(() => {
    setActiveIndex(defaultActiveIndex);
  }, [defaultActiveIndex]);

  useLayoutEffect(() => {
    const el = document.getElementById(`tab-${activeIndex}`);
    if (el && activeIndex !== 0) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);

  return (
    <div>
      <div className="bg-white flex gap-4 overflow-x-auto border-b no-scrollbar px-2">
        {children.map(({ props }, index) => (
          <TabTitle
            key={props.title}
            title={props.title}
            disable={props.disable}
            index={index}
            isActive={index === activeIndex}
            setSelectedTab={setActiveIndex}
          />
        ))}
      </div>

      {activeIndex != undefined && children[activeIndex]}
    </div>
  );
};
export default Tabs;
