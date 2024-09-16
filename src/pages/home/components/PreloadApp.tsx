import { App, ZApp } from "@dts";
import {
  appState,
  clientState,
  listZAppsState,
  zAppState,
} from "@stores/state";
import { useAtom, useAtomValue } from "jotai";
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useNavigate from "zmp-ui/useNavigate";

const PreloadApp: React.FC = () => {
  const [zApp, setZApp] = useAtom(zAppState);

  const { zAppId, appId } = useParams();

  const [app, setApp] = useAtom(appState);

  const listZApps = useAtomValue(listZAppsState);

  const navigate = useNavigate();

  const api = useAtomValue(clientState);

  const fetchAppInfo = useCallback(async (appId: string) => {
    const { data } = await api.getAppById(appId);
    if (data.data) {
      setApp(data.data as App);
    } else {
      navigate("/forbidden");
    }
  }, []);

  useEffect(() => {
    if (!zApp && listZApps.length > 0) {
      let initZapp: ZApp | undefined;
      if (zAppId) {
        initZapp = listZApps.find((item) => item.id == zAppId);
      }

      if (initZapp) {
        setZApp(initZapp);
      } else {
        navigate("/forbidden");
      }
    }
  }, [zApp, zAppId, listZApps]);

  useEffect(() => {
    if (!app && appId) {
      fetchAppInfo(appId);
    }
  }, [appId]);

  return <></>;
};

export default PreloadApp;
