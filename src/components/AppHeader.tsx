import { appState } from "@stores/state";
import { useAtomValue } from "jotai";
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "zmp-ui/header";
import Icon from "zmp-ui/icon";
import useNavigate from "zmp-ui/useNavigate";

const AppHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = useMemo(() => {
    return (
      location.pathname === "/" ||
      location.pathname === "" ||
      location.pathname === "/error" ||
      location.pathname === "/forbidden"
    );
  }, [location.pathname]);

  const app = useAtomValue(appState);

  return (
    <Header
      backIcon={isHomePage ? null : <Icon icon="zi-arrow-left" />}
      title={isHomePage ? "Analytics" : app?.name}
      showBackIcon={!isHomePage}
      onBackClick={() => navigate("/", { replace: true })}
    />
  );
};

export default AppHeader;
