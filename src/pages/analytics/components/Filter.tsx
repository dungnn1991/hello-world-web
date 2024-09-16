import { Option, Select } from "@components/customized/Select";
import { statsFilterState } from "@stores/state";
import { addDays } from "date-fns";
import { useAtom } from "jotai";
import React, { useCallback, useState } from "react";
import DatePicker from "zmp-ui/date-picker";

const now = new Date();

const Filter: React.FC = () => {
  const [filter, setFilter] = useAtom(statsFilterState);

  const [start, setStart] = useState<Date>(addDays(now, -30));

  const [end, setEnd] = useState<Date>(now);

  const onChangeTime = useCallback(
    (time: string) => {
      if (time == "custom" || filter["time"] == time) {
        return;
      }
      const endTime = new Date();
      endTime.setHours(0, 0, 0, 0);

      const startTime = addDays(endTime, -parseInt(time));

      setEnd(endTime);
      setStart(startTime);
      setFilter({
        ...filter,
        time,
        startTime,
        endTime,
      });
    },
    [filter]
  );

  const onVisibilityChange = useCallback(
    (visible: boolean, field: "startTime" | "endTime", value: Date) => {
      value.setHours(0, 0, 0, 0);
      if (!visible) {
        setFilter({
          ...filter,
          [field]: value,
        });
      }
    },
    [filter]
  );

  return (
    <div className="bg-white p-4 flex flex-col gap-2">
      <div>
        <Select
          label="Thời gian"
          value={filter.time}
          closeOnSelect
          onChange={onChangeTime}
        >
          <Option value={"7"} title="7 ngày qua" />
          <Option value={"30"} title="30 ngày qua" />
          <Option value={"90"} title="3 tháng qua" />
          <Option value={"custom"} title="Tuỳ chỉnh" />
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <DatePicker
          label="Ngày bắt đầu"
          value={start}
          onChange={(date: Date) => setStart(date)}
          onVisibilityChange={(visible: boolean) =>
            onVisibilityChange(visible, "startTime", start)
          }
        />

        <DatePicker
          label="Ngày kết thúc"
          value={end}
          onChange={(date) => setEnd(date)}
          onVisibilityChange={(visible: boolean) =>
            onVisibilityChange(visible, "endTime", end)
          }
          endDate={now}
        />
      </div>
    </div>
  );
};

export default Filter;
