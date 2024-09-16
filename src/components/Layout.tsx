import Menu from "@pages/Menu";
import UserOnline from "@pages/UserOnline";
import PreloadApp from "@pages/home/components/PreloadApp";
import { findAccessToken } from "@services/zalo";
import { tokenState } from "@stores/state";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useNavigate from "zmp-ui/useNavigate";
import { PageContainer } from "./container";

const Layout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useAtom(tokenState);

  const navigate = useNavigate();
  const getAccesToken = useCallback(async () => {
    setLoading(true);
    try {
      const accessToken = await findAccessToken();
      if (accessToken) {
        setToken(accessToken);
        setLoading(false);
      }
    } catch (error) {
      navigate("/error", { replace: true, animate: false });
    }
  }, []);

  useEffect(() => {
    if (!token) {
      getAccesToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-[100vh] bg-white" />
      ) : (
        <PageContainer>
          <PreloadApp />
          <UserOnline />
          <Menu />
          <TransitionGroup>
            <CSSTransition
              classNames={"fade"}
              key={location.pathname}
              timeout={0}
            >
              <Outlet />
            </CSSTransition>
          </TransitionGroup>
        </PageContainer>
      )}
    </div>
  );
};

export default Layout;
