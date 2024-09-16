import { Loading } from "@components/icons/Icon";
import { DASHBOARD_PAGE } from "@constants";
import { formatNumber } from "@utils";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import tw from "twin.macro";

const EmptyData = React.memo(
  tw.div` left-0 top-0 w-full h-full flex items-center justify-center bg-white bg-opacity-40`
);

const ChartColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 26px;
  height: 100%;
  background: #ecf5ff;
  border-radius: 4px;
  justify-content: flex-end;
  overflow: hidden;

  & .more-info {
    display: none;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    width: auto;
    max-width: 100%;
    border-radius: 4px;
    color: white;
    z-index: 1;
    padding: 8px 16px;
    text-align: left;
  }

  &:hover .more-info {
    display: block;
  }
`;
interface chartItemType {
  label: string;
  value: number;
}

const HistogramChart: React.FC<{
  data: chartItemType[];
  style?: Record<string, unknown>;
  loading: boolean;
  heightChart?: number;
  label: string;
}> = ({ data, style = {}, loading, heightChart = 400, label }) => {
  const parentRef = useRef(null);
  const total = useMemo(() => {
    return data.reduce((sum: number, item: chartItemType) => {
      sum += item.value;
      return sum;
    }, 0);
  }, [data]);

  return (
    <div className="flex flex-col w-full   px-2 py-4 relative transition-all">
      <div style={style} className="flex-1">
        {loading && (
          <EmptyData>
            <div className=" text-neutral-500 h-full my-8">
              <Loading />
            </div>
          </EmptyData>
        )}
        {data?.length > 0 && !loading && (
          <div
            className="flex justify-between items-center h-[100%] relative"
            ref={parentRef}
          >
            {data.map((item: chartItemType, index: number) => {
              return (
                <div
                  key={`${item.label}-${item.value}`}
                  className="flex flex-col items-center w-[100%] h-48"
                >
                  <ChartColumnCpn
                    item={item}
                    index={index}
                    total={total}
                    dataLength={data?.length}
                    heightChart={heightChart}
                    parentRef={parentRef}
                  />
                  <p className="mt-6 text-[#767A7F] font-normal text-[12px] leading-[16px]">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        {!loading && (!data || data?.length === 0) && (
          <div className="flex items-center justify-center  w-full 	h-48">
            {DASHBOARD_PAGE.EMPTY_CHART_DATA}
          </div>
        )}
      </div>
      <p className="mt-6 text-center font-medium text-[#36383A] text-sm ">
        {label}
      </p>
    </div>
  );
};

const ChartColumnCpn: React.FC<{
  item: chartItemType;
  index: number;
  total: number;
  dataLength: number;
  heightChart: number;
  parentRef: RefObject<HTMLDivElement>;
}> = ({ item, index, total, dataLength, heightChart, parentRef }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const elmRef = useRef<HTMLDivElement | null>(null);

  const valueHover = useMemo(
    () => (
      <div className="text-[15px] leading-[20px]">
        <p className="font-bold">{item.label}</p>
        <p>
          Tỷ lệ: {((item.value / total) * 100).toFixed(2).replace(".", ",")}%
        </p>
        <p>Số lượng: {formatNumber(item.value, ".")}</p>
      </div>
    ),
    [item.label, item.value, total]
  );

  useEffect(() => {
    if (!elmRef || !elmRef.current) return;
    elmRef.current.addEventListener("mousemove", (e: MouseEvent) => {
      if (!parentRef || !parentRef.current) return;
      const rect = parentRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPosition((_) => ({
        x,
        y,
      }));
    });
  }, [parentRef]);

  return (
    <ChartColumn className="chart-column">
      <div ref={elmRef} className="h-full flex flex-col justify-end">
        <div
          className="bg-[#006AF5] rounded animation-scale-y"
          style={{
            height: `${(item.value / total) * heightChart}px`,
          }}
        />
      </div>
      <div
        className="more-info"
        style={{
          top: `${position.y}px`,
          left:
            index === dataLength - 1 || index === dataLength - 2
              ? `${position.x - 160}px`
              : `${position.x + 20}px`,
        }}
      >
        {valueHover}
      </div>
    </ChartColumn>
  );
};
export default HistogramChart;
