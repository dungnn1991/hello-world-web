import {
  detailWebVitalsStatsFilterState,
  loadableDetailWebvitalsStats,
} from "@stores/state";
import { addDays } from "date-fns";
import { useAtom } from "jotai";
import React, { useCallback, useMemo, useState } from "react";
import DatePicker from "zmp-ui/date-picker";
import Icon from "zmp-ui/icon";
import Note from "./components/Note";
import PLTBadge from "./components/PLTBadge";
import { WebvitalsItemBox } from "./components/WebvitalsItemBox";
import { qualifyMiniAppPerformnace } from "./webvitals";

const WebVitalsPage: React.FC = () => {
  const [value] = useAtom(loadableDetailWebvitalsStats);
  const [time, setTime] = useState(addDays(new Date(), -1));
  const [filter, setFilter] = useAtom(detailWebVitalsStatsFilterState);

  const { LCP, FCP, FID, CLS, TTFB, PLT } = useMemo(() => {
    if (value.state === "hasData") {
      return value.data;
    }
    return {};
  }, [value]);

  const qualifyMiniAppPerformanceResult = useMemo(
    () => qualifyMiniAppPerformnace(LCP?.p60 || 0, PLT?.p75 || 0),
    [PLT, LCP]
  );

  const onVisibilityChange = useCallback(
    (visible: boolean) => {
      time.setHours(0, 0, 0, 0);
      if (!visible) {
        setFilter(time);
      }
    },
    [filter, time]
  );

  const loading = useMemo(() => {
    return value.state === "loading";
  }, [value]);

  return (
    <div className=" bg-white">
      <div className=" border-b p-4 relative">
        <div className="flex ">
          <p className="flex-grow text-lg font-medium">
            Bài đánh giá các chỉ số quan trọng về Mini App.&nbsp;
            <span style={{ color: qualifyMiniAppPerformanceResult.textColor }}>
              {qualifyMiniAppPerformanceResult.label}
            </span>
          </p>

          <div className="group  flex items-center">
            <Icon icon="zi-info-circle" size={17} />
            <div className="absolute scale-0 right-4 bottom-[7rem] group-hover:scale-100 w-48  transition-all duration-300 z-10 p-4 text-sm bg-[rgba(0,0,0,0.8)] text-white rounded-xl">
              {qualifyMiniAppPerformanceResult.description}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <DatePicker
            endDate={addDays(new Date(), -1)}
            value={time}
            onChange={(date) => setTime(date)}
            onVisibilityChange={onVisibilityChange}
          />
        </div>
      </div>

      <div className="p-4 ">
        <PLTBadge data={PLT} loading={loading} />

        <div className="">
          <div className="flex flex-col gap-6 ">
            <WebvitalsItemBox data={LCP} loading={loading} name="LCP" />
            <WebvitalsItemBox data={FID} loading={loading} name="FID" />
            <WebvitalsItemBox data={CLS} loading={loading} name="CLS" />
          </div>

          <div className="my-5 border-t pt-4">
            <p className="  text-base">Các chỉ số đáng chú ý khác</p>
          </div>
          <div className="flex flex-col gap-4">
            <WebvitalsItemBox data={FCP} loading={loading} name="FCP" />
            <WebvitalsItemBox data={TTFB} loading={loading} name="TTFB" />
            <WebvitalsItemBox data={PLT} loading={loading} name="PLT" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <Note date={time} />
      </div>
    </div>
  );
};

export default WebVitalsPage;
