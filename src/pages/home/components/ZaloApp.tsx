import { ZAPP_SELECTED_KEY } from "@constants";
import { ZApp } from "@dts";
import { setDataToStorage } from "@services/zalo";
import { zAppState } from "@stores/state";
import { useSetAtom } from "jotai";
import React from "react";
import Radio from "zmp-ui/radio";

const ZaloApp: React.FC<{
  value: ZApp;
  onClick: () => void;
  className?: string;
}> = ({ value, onClick, className }) => {
  const setZApp = useSetAtom(zAppState);

  return (
    <div
      className={`flex p-4 py-3.5 cursor-pointer ${className}`}
      onClick={() => {
        setZApp(value);
        setDataToStorage({ [ZAPP_SELECTED_KEY]: value.id });
        onClick?.();
      }}
    >
      <div className="w-10 flex items-center justify-start">
        <Radio value={value?.id} />
      </div>
      <div className="flex gap-2">
        <div className="min-w-10 max-w-10 flex items-center">
          <img className="rounded-lg" src={value.logoUrl} />
        </div>

        <div className="flex flex-grow flex-col justify-center gap-1">
          <div className="font-bold">{value?.name}</div>
          <div className="text-[#767A7F] text-sm">ID: {value?.id}</div>
        </div>
      </div>
    </div>
  );
};

export default ZaloApp;
