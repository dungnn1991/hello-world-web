import AnalyticsPage from "@pages/analytics";
import ErrorPage from "@pages/error";
import ForbiddenPage from "@pages/error/ForbiddenPage";
import HomePage from "@pages/home";
import RatingPage from "@pages/review";
import SettingPage from "@pages/setting";
import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "zmp-ui/app";
import SnackbarProvider from "zmp-ui/snackbar-provider";
import ZMPRouter from "zmp-ui/router";

import AppHeader from "./AppHeader";
import Layout from "./Layout";

const MyApp = () => {
  return (
    <App>
      <SnackbarProvider>
        <ZMPRouter>
          <AppHeader />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/error" element={<ErrorPage />}></Route>
            <Route path="/forbidden" element={<ForbiddenPage />}></Route>
            <Route path="/:zAppId/:appId" element={<Layout />}>
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="setting" element={<SettingPage />} />
              <Route path="rating" element={<RatingPage />} />
            </Route>
          </Routes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default MyApp;
