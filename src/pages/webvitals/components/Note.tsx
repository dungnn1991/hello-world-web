import { format } from "date-fns";
import React from "react";
import Icon from "zmp-ui/icon";
import { MiniApps, Phone, PieStats } from "@components/icons/Icon";

const Note: React.FC<{ date: Date }> = ({ date }) => {
  return (
    <div className=" flex flex-col rounded-lg bg-[#F7F7F8] p-4 gap-4">
      <div className="flex  gap-2 items-center">
        <Icon icon="zi-calendar" size={24} />
        <p>Khoảng thời gian thu thập - {format(date, "dd/MM/yyyy")}</p>
      </div>
      <div className="flex  gap-2 items-center">
        <Icon icon="zi-clock-2" />
        <p>Toàn bộ thời lượng truy cập</p>
      </div>
      <div className="flex  gap-2 items-center">
        <Phone />
        <p>Nhiều thiết bị di động</p>
      </div>
      <div className="flex  gap-2 items-center">
        <Icon icon="zi-wifi" />
        <p>Nhiều kết nối mạng</p>
      </div>
      <div className="flex  gap-2 items-center">
        <PieStats />
        <p>Nhiều mẫu</p>
      </div>
      <div className="flex  gap-2 items-center">
        <MiniApps size={16} />
        <p>Tất cả các phiên bản Mini App</p>
      </div>
    </div>
  );
};

export default Note;
