import React, { Suspense, useEffect, useState } from "react";
import AccessTrafficStats from "./stats/access";
import Overview from "./stats/overview/Overview";
import RealtimeTraffic from "./stats/realtime/RealtimeTraffic";
import UserStats from "./stats/user";
import WebVitalsPage from "@pages/webvitals";
import { useLocation } from "react-router-dom";
import Tabs from "@components/tabs";
import TabContent from "@components/tabs/TabContent";

const STATS = [
  {
    label: "Tổng quan",
    key: "overview",
    component: <Overview />,
  },
  {
    label: "Thống kê trực tiếp",
    key: "realtime",
    component: <RealtimeTraffic />,
  },
  {
    label: "Lưu lượng truy cập",
    key: "traffic",
    component: <AccessTrafficStats />,
  },
  {
    label: "Người dùng",
    key: "user",
    component: <UserStats />,
  },
  {
    label: "Hiệu suất",
    key: "webvitals",
    component: <WebVitalsPage />,
  },
];

const AnalyticsDetail: React.FC = () => {
  const [tab, setTab] = useState<number>();
  const location = useLocation();
  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const index = STATS.findIndex((item) => item.key === search.get("tab"));
    setTab(index !== -1 ? index : 0);
  }, [location]);

  return (
    <div className="mt-1">
      <Tabs defaultActiveIndex={tab}>
        {STATS.map((item) => (
          <TabContent title={item.label} key={item.key}>
            <Suspense>{item.component}</Suspense>
          </TabContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AnalyticsDetail;
