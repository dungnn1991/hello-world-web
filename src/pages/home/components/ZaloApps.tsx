import { Collapse } from "@components/collapse";
import { ZApp } from "@dts";
import { listZAppsState, zAppState } from "@stores/state";
import { useAtom, useAtomValue } from "jotai";
import React, { useCallback, useEffect, useRef } from "react";
import Radio from "zmp-ui/radio";
import ZaloApp from "./ZaloApp";
import classNames from "classnames";
import { getDataFromStorage } from "@services/zalo";
import { ZAPP_SELECTED_KEY } from "@constants";

const SelectedZApp: React.FC<{ value: ZApp | null }> = ({ value }) => {
  return (
    <div className="p-4 py-3.5">
      <div className="flex flex-col justify-center gap-1">
        <div className="font-bold">Zalo App: {value?.name}</div>
        <div className="text-[#767A7F] text-sm">ID: {value?.id}</div>
      </div>
    </div>
  );
};

const ZaloApps: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [zApp, setZApp] = useAtom(zAppState);

  const listZApps = useAtomValue(listZAppsState);

  const setDefaultZapp = useCallback(async () => {
    const val = await getDataFromStorage(ZAPP_SELECTED_KEY);
    const defaultZApp =
      listZApps.find((item) => item.id == val) || listZApps[0];
    setZApp(defaultZApp);
  }, [zApp, listZApps]);

  useEffect(() => {
    if (!zApp && listZApps?.length > 0) {
      setDefaultZapp();
    }
  }, [zApp, listZApps]);

  const collapseListZApp = useCallback(() => {
    ref?.current?.click();
  }, [ref]);

  return (
    <div className="bg-white">
      {!listZApps || listZApps.length == 0 ? (
        <div className="flex justify-center items-center min-h-[100vh]">
          <p>Bạn chưa có ứng dụng nào</p>
        </div>
      ) : (
        <Collapse ref={ref} title={<SelectedZApp value={zApp} />}>
          <Radio.Group name="zapp" value={zApp?.id}>
            {listZApps?.map((item, idx) => (
              <ZaloApp
                className={classNames({ "pt-0": idx === 0 })}
                onClick={collapseListZApp}
                value={item}
                key={item.id}
              />
            ))}
          </Radio.Group>
        </Collapse>
      )}
    </div>
  );
};

export default ZaloApps;
