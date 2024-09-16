import React, { useCallback, useEffect } from "react";

import OnlineIcon from "@static/icons/online.png";
import { useAtom, useAtomValue } from "jotai";
import { appOnlineState, appState, clientState } from "@stores/state";
import StatisticsNumber from "@components/statistics";
import { UserOnlineResp } from "@dts";

const UserOnline: React.FC = () => {
  const client = useAtomValue(clientState);
  const app = useAtomValue(appState);
  const [online, setOnline] = useAtom(appOnlineState);

  const fetchOnline = useCallback(async (id: string) => {
    const { data } = await client.getCurrentUserOnline(id);
    setOnline(((data?.data || {}) as UserOnlineResp).userOnline);
  }, []);

  useEffect(() => {
    let interval;
    if (app) {
      fetchOnline(app.id);
      interval = setInterval(() => {
        fetchOnline(app.id);
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [app]);

  return (
    <div className="p-4 flex gap-2 bg-white">
      <div className="flex-grow flex flex-col justify-center">
        <div className="font-bold text-4xl">
          <StatisticsNumber value={online} />
        </div>
        <div className="text-base">Người dùng đang online</div>
      </div>

      <div className="mr-0">
        <img src={OnlineIcon} />
      </div>
    </div>
  );
};

export default React.memo(UserOnline);
