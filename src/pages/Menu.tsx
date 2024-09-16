import {
  DashboardIcon,
  EllipsisIcon,
  SettingIcon,
  StarIcon,
} from "@components/icons/Icon";
import { appState, zAppState } from "@stores/state";
import classNames from "classnames";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import useNavigate from "zmp-ui/useNavigate";

const MENU = [
  {
    title: "Thống kê",
    path: "/analytics",
    icon: <DashboardIcon />,
  },
  {
    title: "Đánh giá & review",
    icon: <StarIcon />,
    path: "/rating",
  },
  {
    title: "Thiết lập chung",
    icon: <SettingIcon />,
    isDeveloping: true,
  },
  {
    title: "Sắp ra mắt",
    icon: <EllipsisIcon />,
    isDeveloping: true,
  },
];

const Menu: React.FC = () => {
  const [activePath, setActivePath] = useState("/analytics");

  const zApp = useAtomValue(zAppState);
  const app = useAtomValue(appState);

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 bg-white p-4 pt-1 border-b">
      {MENU.map((item) => (
        <div
          key={item.title}
          className={classNames(
            "flex flex-col items-center gap-2 cursor-pointer",
            {
              "text-[#A9ADB2]": item.isDeveloping,
            }
          )}
          onClick={() => {
            if (item.path) {
              setActivePath(item.path);
              navigate(`/${zApp?.id}/${app?.id}${item.path}`, {
                animate: false,
                replace: true,
              });
            }
          }}
        >
          <div
            className={classNames(
              "h-14 w-14 rounded-xl flex items-center justify-center bg-[#F4F5F6]",
              {
                "!bg-[#F0F7FF]": activePath === item.path,
              }
            )}
          >
            <div
              className={classNames("text-[#A9ADB2]", {
                "!text-[#006AF5]": activePath === item.path,
              })}
            >
              {item.icon}
            </div>
          </div>
          <div
            className={classNames("text-center", {
              "font-medium text-[#006AF5]": activePath === item.path,
            })}
          >
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Menu);
