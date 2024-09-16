import { PageContainer } from "@components/container";
import { findAccessToken } from "@services/zalo";
import { tokenState, zAppState } from "@stores/state";
import { useAtom, useAtomValue } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import useNavigate from "zmp-ui/useNavigate";
import Apps from "./components/Apps";
import ZaloApps from "./components/ZaloApps";

const HomePage: React.FunctionComponent = () => {
  const zApp = useAtomValue(zAppState);
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
    <PageContainer>
      {loading ? (
        <div className="flex items-center justify-center h-[100vh] bg-white">
          {/* <Spinner logo={Logo} /> */}
        </div>
      ) : (
        <div className="flex flex-col gap-2 h-full">
          <ZaloApps />
          {zApp ? (
            <Apps />
          ) : (
            <div className="min-h-screen bg-white gap-2 flex flex-col py-4">
              {/* {[...Array(8)].map((item, idx) => (
                <div key={idx} className="p-3 w-full mx-auto">
                  <div className="animate-pulse flex space-x-4 items-center">
                    <div className="rounded-full bg-slate-200 h-14 w-14"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-7 bg-slate-200 rounded"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))} */}
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
};

export default HomePage;
