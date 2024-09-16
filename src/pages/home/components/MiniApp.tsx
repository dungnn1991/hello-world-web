import { App } from "@dts";
import { appState, zAppState } from "@stores/state";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import useNavigate from "zmp-ui/useNavigate";
import Icon from "zmp-ui/icon";

const MiniApp: React.FC<{ value: App }> = ({ value }) => {
  const zApp = useAtomValue(zAppState);
  const setApp = useSetAtom(appState);

  const navigate = useNavigate();

  return (
    <div
      id={`app-${value.id}`}
      className="flex p-4 py-3.5 gap-3 cursor-pointer app-item"
      onClick={() => {
        setApp(value);
        navigate(`/${zApp?.id}/${value.id}/analytics`);
      }}
    >
      <div className="min-w-11 max-w-11 max-h-11 min-h-11  flex items-center">
        <img
          alt="mini app logo"
          loading="lazy"
          className="rounded-lg"
          src={value.logoUrl}
        />
      </div>
      <div className="flex flex-grow flex-col gap-1 justify-center h-10">
        <div className="font-medium overflow-hidden line-clamp-1">
          {value.name}
        </div>
        <p className="text-[#767A7F] overflow-hidden line-clamp-1">
          {value.description}
        </p>
      </div>

      <div className="mr-0 flex items-center">
        <Icon icon="zi-chevron-right" />
      </div>
    </div>
  );
};

export default MiniApp;
