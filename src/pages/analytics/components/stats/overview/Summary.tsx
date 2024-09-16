import { Button } from "@components/customized";
import { ClockIcon, GroupIcon, HandIcon } from "@components/icons/Icon";
import {
  AvgUsedTimeData,
  Diff,
  OverviewItem,
  OverviewStatsData,
  SummaryData,
  SummaryItem,
} from "@dts";
import {
  loadableAvgUsedTimeStats,
  loadableOverviewStats,
  statsFilterState,
} from "@stores/state";
import { beginningOfDate } from "@utils";
import {
  EndOfWeekOptions,
  addDays,
  addMonths,
  differenceInDays,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  getWeek,
  getYear,
  isSameDay,
  lastDayOfMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useAtom, useAtomValue } from "jotai";
import React, { useMemo, useState } from "react";
import SummaryCard from "./SummaryCard";

enum OverviewDurationType {
  DAILY = 1,
  WEEKLY = 7,
  MONTHLY = 30,
}

const WEEK_START_ON_MONDAY = 1;

const DD_MM_YYY_FORMAT = "dd/MM/yyyy";

const FNS_OPTIONS: EndOfWeekOptions = { weekStartsOn: WEEK_START_ON_MONDAY };

const LENGTH_OF_WEEK = 7;

const BUTTONS = [
  {
    name: "Ngày",
    key: OverviewDurationType.DAILY,
    showWhenMinimumDiffDaysIs: 1,
  },
  {
    name: "Tuần",
    key: OverviewDurationType.WEEKLY,
    showWhenMinimumDiffDaysIs: 14,
  },
  {
    name: "Tháng",
    key: OverviewDurationType.MONTHLY,
    showWhenMinimumDiffDaysIs: 60,
  },
];

const defaultValue: SummaryData = {
  activeUser: { value: 0 },
  newUser: { value: 0 },
  visitUser: { value: 0 },
};

const defaultOverviewItem: OverviewItem = {
  activeUser: 0,
  newUser: 0,
  time: 0,
  visitUser: 0,
};

const getWeekLabel = (date: Date): string => {
  return `Tuần ${getWeek(date, FNS_OPTIONS)} năm ${getYear(date)}`;
};

const getMonthLabel = (date: Date): string => {
  return `Tháng ${format(date, "MM/yyyy")}`;
};

function safeGetMap<T>(map: Record<number, T>, key: Date, defaultValue: T): T {
  return (
    map[beginningOfDate(key)] ||
    map[beginningOfDate(key) / 1000] ||
    defaultValue
  );
}

const getAvgSummary = (
  data: AvgUsedTimeData,
  duration: OverviewDurationType,
  numberOfDiff: number,
  endTime: Date
): SummaryItem => {
  let date = new Date(endTime);

  // current day has no data, start from previous day
  if (isSameDay(new Date(), endTime)) {
    date = addDays(date, -1);
  }
  const map: Record<number, number> = {};

  const diff: Diff[] = [];
  let avgUsedTime = 0;

  switch (duration) {
    case OverviewDurationType.DAILY:
      data.A1.forEach((item) => (map[item.time] = item.count));
      avgUsedTime = safeGetMap(map, date, 0);
      for (let i = 1; i <= numberOfDiff; i++) {
        const diffDate = addDays(date, -i);
        const val = safeGetMap(map, diffDate, 0);
        const label = `${format(diffDate, DD_MM_YYY_FORMAT)}`;

        const diffItem = {
          value: getDiffValuePercent(val, avgUsedTime),
          label,
        };
        diff.push(diffItem);
      }

      break;
    case OverviewDurationType.WEEKLY:
      let previousEndOfWeek = endOfWeek(
        addDays(endTime, -LENGTH_OF_WEEK),
        FNS_OPTIONS
      );
      data.A7.forEach((item) => (map[item.time] = item.count));

      avgUsedTime = safeGetMap(map, previousEndOfWeek, 0);

      for (let i = 0; i < numberOfDiff; i++) {
        previousEndOfWeek = endOfWeek(
          addDays(previousEndOfWeek, -LENGTH_OF_WEEK),
          FNS_OPTIONS
        );
        const label = getWeekLabel(previousEndOfWeek);
        const val = safeGetMap(map, previousEndOfWeek, 0);
        const diffItem = {
          value: getDiffValuePercent(val, avgUsedTime),
          label,
        };
        diff.push(diffItem);
      }

      break;
    case OverviewDurationType.MONTHLY:
      data.A30.forEach((item) => (map[item.time] = item.count));

      let prevMonth = new Date(endTime);
      prevMonth = lastDayOfMonth(addMonths(prevMonth, -1));
      avgUsedTime = safeGetMap(map, prevMonth, 0);

      for (let i = 0; i < numberOfDiff; i++) {
        prevMonth = addMonths(prevMonth, -1);
        const label = getMonthLabel(prevMonth);

        const val = safeGetMap(map, prevMonth, 0);
        const diffItem = {
          value: getDiffValuePercent(val, avgUsedTime),
          label,
        };
        diff.push(diffItem);
      }

      break;

    default:
      return { value: 0 };
  }

  return {
    value: avgUsedTime,
    diff,
  };
};

const getDiffValuePercent = (pre: number, after: number) => {
  return ((after - pre) / pre) * 100;
};

const getSummaryData = (
  overviewData: OverviewStatsData,
  duration: OverviewDurationType,
  numberOfDiff: number,
  endTime: Date
): SummaryData => {
  const rs: SummaryData = { ...defaultValue };
  const map: Record<number, OverviewItem> = {};
  let date = new Date(endTime);

  if (isSameDay(new Date(), endTime)) {
    date = addDays(date, -1);
  }
  const activeDiff: Diff[] = [];
  const newDiff: Diff[] = [];
  const visitDiff: Diff[] = [];

  switch (duration) {
    case OverviewDurationType.DAILY:
      overviewData.A1.forEach((item) => (map[item.time] = item));

      const overviewItem = safeGetMap(map, date, defaultOverviewItem);

      const { activeUser, newUser, visitUser } = overviewItem;

      for (let i = 1; i <= numberOfDiff; i++) {
        const diffDate = addDays(date, -i);
        const overviewAtDate = safeGetMap(map, diffDate, defaultOverviewItem);

        const {
          activeUser: diffActiveUser,
          newUser: diffNewUser,
          visitUser: diffVisitUser,
        } = overviewAtDate;

        const label = `${format(diffDate, DD_MM_YYY_FORMAT)}`;

        const activeDiffItem: Diff = {
          value: getDiffValuePercent(diffActiveUser, activeUser),
          label,
        };
        activeDiff.push(activeDiffItem);

        const newDiffItem: Diff = {
          value: getDiffValuePercent(diffNewUser, newUser),
          label,
        };
        newDiff.push(newDiffItem);

        const visitDiffItem: Diff = {
          value: getDiffValuePercent(diffVisitUser, visitUser),
          label,
        };
        visitDiff.push(visitDiffItem);
      }
      return {
        newUser: {
          value: newUser,
          diff: newDiff,
        },
        visitUser: {
          value: visitUser,
          diff: visitDiff,
        },
        activeUser: {
          value: activeUser,
          diff: activeDiff,
        },
      };
    case OverviewDurationType.WEEKLY:
      overviewData.A7.forEach((item) => (map[item.time] = item));

      let previousEndOfWeek = endOfWeek(
        addDays(endTime, -LENGTH_OF_WEEK),
        FNS_OPTIONS
      );

      const {
        visitUser: totalVistUserOfWeek,
        newUser: totalNewUserOfWeek,
        activeUser: totalActiveUserOfWeek,
      } = safeGetMap(map, previousEndOfWeek, defaultOverviewItem);

      for (let i = 0; i < numberOfDiff; i++) {
        previousEndOfWeek = endOfWeek(
          addDays(previousEndOfWeek, -LENGTH_OF_WEEK),
          FNS_OPTIONS
        );
        const {
          visitUser: totalVisitOfDiffWeek,
          newUser: totalNewOfDiffWeek,
          activeUser: totalActiveOfDiffWeek,
        } = safeGetMap(map, previousEndOfWeek, defaultOverviewItem);

        const label = getWeekLabel(previousEndOfWeek);

        const activeDiffItem: Diff = {
          value: getDiffValuePercent(
            totalActiveOfDiffWeek,
            totalActiveUserOfWeek
          ),
          label,
        };
        activeDiff.push(activeDiffItem);

        const newDiffItem: Diff = {
          value: getDiffValuePercent(totalNewOfDiffWeek, totalNewUserOfWeek),
          label,
        };
        newDiff.push(newDiffItem);

        const visitDiffItem: Diff = {
          value: getDiffValuePercent(totalVisitOfDiffWeek, totalVistUserOfWeek),
          label,
        };
        visitDiff.push(visitDiffItem);
      }

      return {
        newUser: {
          value: totalNewUserOfWeek,
          diff: newDiff,
        },
        visitUser: {
          value: totalVistUserOfWeek,
          diff: visitDiff,
        },
        activeUser: {
          value: totalActiveUserOfWeek,
          diff: activeDiff,
        },
      };
    case OverviewDurationType.MONTHLY:
      overviewData.A30.forEach((item) => (map[item.time] = item));

      let prevMonth = new Date(endTime);
      prevMonth = lastDayOfMonth(addMonths(prevMonth, -1));
      const {
        visitUser: totalVistUserOfMonth,
        newUser: totalNewUserOfMonth,
        activeUser: totalActiveUserOfMonth,
      } = safeGetMap(map, prevMonth, defaultOverviewItem);

      for (let i = 0; i < numberOfDiff; i++) {
        prevMonth = addMonths(prevMonth, -1);
        const {
          visitUser: totalVisitOfDiffMonth,
          newUser: totalNewOfDiffMonth,
          activeUser: totalActiveOfDiffMonth,
        } = safeGetMap(map, prevMonth, defaultOverviewItem);

        const label = getMonthLabel(prevMonth);

        const activeDiffItem: Diff = {
          value: getDiffValuePercent(
            totalActiveOfDiffMonth,
            totalActiveUserOfMonth
          ),
          label,
        };
        activeDiff.push(activeDiffItem);

        const newDiffItem: Diff = {
          value: getDiffValuePercent(totalNewOfDiffMonth, totalNewUserOfMonth),
          label,
        };
        newDiff.push(newDiffItem);

        const visitDiffItem: Diff = {
          value: getDiffValuePercent(
            totalVisitOfDiffMonth,
            totalVistUserOfMonth
          ),
          label,
        };
        visitDiff.push(visitDiffItem);
      }

      return {
        newUser: {
          value: totalNewUserOfMonth,
          diff: newDiff,
        },
        visitUser: {
          value: totalVistUserOfMonth,
          diff: visitDiff,
        },
        activeUser: {
          value: totalActiveUserOfMonth,
          diff: activeDiff,
        },
      };
    default:
      break;
  }
  return rs;
};

const getDurationLabel = (
  durationType: OverviewDurationType,
  endTime: Date
) => {
  let date = new Date(endTime);

  if (isSameDay(date, new Date())) {
    date = addDays(date, -1);
  }

  switch (durationType) {
    case OverviewDurationType.DAILY:
      return format(date, DD_MM_YYY_FORMAT);
    case OverviewDurationType.WEEKLY:
      const prevWeek = addDays(date, -7);

      return `Tuần ${getWeek(prevWeek, FNS_OPTIONS)} (${format(
        startOfWeek(prevWeek, FNS_OPTIONS),
        DD_MM_YYY_FORMAT
      )} - ${format(endOfWeek(prevWeek, FNS_OPTIONS), DD_MM_YYY_FORMAT)})`;
    case OverviewDurationType.MONTHLY:
      date.setMonth(date.getMonth() - 1);

      return `Tháng ${getMonth(date) + 1} (${format(
        startOfMonth(date),
        DD_MM_YYY_FORMAT
      )} - ${format(endOfMonth(date), DD_MM_YYY_FORMAT)})`;

    default:
      break;
  }
  return "";
};

const Summary: React.FC = () => {
  const filter = useAtomValue(statsFilterState);

  const [value] = useAtom(loadableOverviewStats);

  const [avgValue] = useAtom(loadableAvgUsedTimeStats);

  const [durationType, setDurationType] = useState<OverviewDurationType>(
    OverviewDurationType.DAILY
  );

  const summary = useMemo(() => {
    if (value.state === "hasData") {
      return getSummaryData(value.data.stats, durationType, 1, filter.endTime);
    }
    return defaultValue;
  }, [value, durationType, filter]);

  const avgSummary: SummaryItem = useMemo(() => {
    if (avgValue.state === "hasData") {
      return getAvgSummary(
        avgValue.data.stats,
        durationType,
        1,
        filter.endTime
      );
    }
    return {
      value: 0,
    };
  }, [avgValue, durationType, filter]);

  const loading = useMemo(() => value.state === "loading", [value]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          {BUTTONS.map(({ key, name, showWhenMinimumDiffDaysIs }) => (
            <Button
              disabled={
                differenceInDays(filter.endTime, filter.startTime) <
                showWhenMinimumDiffDaysIs + 1
              }
              key={key}
              onClick={() => setDurationType(key)}
              size="small"
              variant={key === durationType ? "primary" : "secondary"}
            >
              {name}
            </Button>
          ))}
        </div>
        <div className="mt-2 text-sm">
          {getDurationLabel(durationType, filter.endTime)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <SummaryCard
          loading={loading}
          label="Người dùng hoạt động"
          icon={<GroupIcon />}
          value={summary?.activeUser.value}
          diff={summary?.activeUser.diff}
          tooltip="Số người dùng (unique) truy cập Mini App"
        />
        <SummaryCard
          loading={loading}
          label="Người dùng mới"
          icon={<GroupIcon />}
          value={summary?.newUser.value}
          diff={summary?.newUser.diff}
          tooltip="Số người dùng mới truy cập lần đầu kể từ khi Mini App phát hành"
          tooltipPosition="left"
        />
        <SummaryCard
          loading={loading}
          label="Lượt truy cập"
          icon={<HandIcon />}
          value={summary?.visitUser.value}
          diff={summary?.visitUser.diff}
          tooltip="Số lượt truy cập Mini App của người dùng"
        />
        <SummaryCard
          loading={avgValue.state === "loading"}
          label="Thời gian sử dụng (avg)"
          icon={<ClockIcon />}
          value={avgSummary?.value}
          diff={avgSummary?.diff}
          tooltip="Thời gian trung bình của mỗi lần truy cập vào Mini App (giây). Được tính bằng cách chia Thời gian sử dụng cho Lượt truy cập"
          tooltipPosition="left"
        />
      </div>
    </>
  );
};

export default Summary;
