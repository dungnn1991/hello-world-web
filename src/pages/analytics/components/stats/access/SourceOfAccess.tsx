import AreaChart from "@components/chart/AreaChart";
import { Button } from "@components/customized";
import { Option, Select } from "@components/customized/Select";
import {
  accessTrafficFilterState,
  loadableAccessTrafficStats,
} from "@stores/state";
import { useAtom } from "jotai";
import React, { useMemo, useState } from "react";
import Input from "zmp-ui/input";
import StatsTitle from "../StatsTitle";

const SourceOfAccess: React.FC = () => {
  const [value] = useAtom(loadableAccessTrafficStats);

  const [trafficFilter, setTrafficFitler] = useAtom(accessTrafficFilterState);
  const [utmCampaign, setUtmCampaign] = useState(trafficFilter.utmCampaign);
  const [utmMedium, setUtmMedium] = useState(trafficFilter.utmMedium);
  const [utmSource, setUtmSource] = useState(trafficFilter.utmSource);
  const [os, setOs] = useState(trafficFilter.os);

  const { utmSources, series, categories } = useMemo(() => {
    const series: { name: string; data: number[] }[] = [];
    const categories: number[] = [];

    if (value.state !== "hasData") {
      return { utmSources: [], series, categories };
    }
    const { utmSources, stats } = value.data;

    const newUsers: number[] = [];
    const totalVists: number[] = [];
    const totalUsers: number[] = [];

    stats.forEach(({ time, newUser, totalUser, totalVisit }) => {
      newUsers.push(newUser);
      totalVists.push(totalVisit);
      totalUsers.push(totalUser);
      categories.push(time);
    });

    series.push({
      name: "Lượng người dùng mới",
      data: newUsers,
    });
    series.push({
      name: "Tổng số lượng người dùng",
      data: totalUsers,
    });
    series.push({
      name: "Tổng số lượng truy cập",
      data: totalVists,
    });

    return { categories, series, utmSources };
  }, [value]);

  const onClick = () => {
    setTrafficFitler({
      os,
      utmCampaign,
      utmMedium,
      utmSource,
    });
  };

  return (
    <div>
      <div className="bg-white p-4 mt-1 flex flex-col gap-2">
        <StatsTitle title="Nguồn truy cập" />

        <div className="grid grid-cols-2 gap-3">
          <Select
            name="os"
            value={os}
            onChange={(value: string) => setOs(value)}
            closeOnSelect
            label="Nền tảng"
          >
            <Option value={"all"} title="Tất cả" />
            <Option value={"1"} title="Android" />
            <Option value={"2"} title="iOS" />
          </Select>

          <Select
            value={utmSource}
            name="source"
            closeOnSelect
            label="Nguồn truy cập"
            onChange={(value: string) => setUtmSource(value)}
          >
            {utmSources?.map((item) => (
              <Option key={item.value} value={item.value} title={item.label} />
            ))}
          </Select>

          <Input
            type="text"
            label="Campaign"
            placeholder="Nhập utm_campaign"
            value={utmCampaign}
            onChange={(e) => setUtmCampaign(e.target.value)}
          />

          <Input
            type="text"
            label="Medium"
            placeholder="Nhập utm_medium"
            value={utmMedium}
            onChange={(e) => setUtmMedium(e.target.value)}
          />
        </div>

        <div>
          <Button onClick={onClick} size="medium">
            Áp dụng
          </Button>
        </div>
      </div>
      <AreaChart
        loading={value.state === "loading"}
        pointAmount={5}
        chartColors={["blue", "red", "green"]}
        series={series}
        categories={categories}
        minYAxis={0}
        type="datetime"
      />
    </div>
  );
};

export default SourceOfAccess;
