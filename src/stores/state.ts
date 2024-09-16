import config, { DELAY } from "@constants";
import {
  AccessTrafficStatsResp,
  App,
  AppsResp,
  AvgUsedTimeResp,
  DemographicStatsResp,
  DetailWebvitalsStats,
  OverviewRating,
  OverviewStatsResp,
  PageviewStatsResp,
  PlatformStatsResp,
  RatingFilter,
  TrafficBySourcesResp,
  UsedTimeStatsResp,
  ZApp,
} from "@dts";
import { WEBVITALS_INDICATORS } from "@pages/webvitals/webvitals";
import { Api } from "@services/rest";
import { addDays, isSameDay } from "date-fns";
import { atom } from "jotai";
import { atomWithInfiniteQuery } from "jotai-tanstack-query";
import { loadable } from "jotai/utils";

const A_DAY_IN_MILLIS = 8640000;

const NOW = new Date();
NOW.setHours(0, 0, 0, 0);

export const tokenState = atom<string | null, [string], void>(
  null,
  (get, set, update) => {
    set(tokenState, update);
  }
);

export const clientState = atom((get) => {
  const { api, setSecurityData } = new Api({
    baseURL: config.BASE_URL,
    securityWorker: (accessToken: string | undefined) => ({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  });
  const accessToken = get(tokenState);
  setSecurityData(accessToken);
  return api;
});

export const zAppState = atom<ZApp | null, [ZApp], void>(
  null,
  (get, set, update) => {
    set(zAppState, update);
  }
);

export const listZAppsState = atom(async (get) => {
  const api = get(clientState);
  const { data } = await api.zapps({ pageSize: 100 });
  return data.data?.zapps as ZApp[];
});

export const appState = atom<App | null, [App], void>(
  null,
  (get, set, update: App) => {
    set(appState, update);
  }
);

export const appsFilterState = atom({
  page: 0,
  pageSize: 10,
});

export const appOnlineState = atom(0);

export const appOnlineAsync = atom(async (get) => {
  const api = get(clientState);
});

export const statsState = atom({});

export const statsFilterState = atom({
  time: "30",
  startTime: addDays(NOW, -30),
  endTime: NOW,
});

export const overviewStatsState = atom(async (get) => {
  const rs: OverviewStatsResp = { stats: { A1: [], A7: [], A30: [] } };
  const app = get(appState);

  if (!app) {
    return rs;
  }

  const { startTime: start, endTime: end } = get(statsFilterState);

  const startTime = start.getTime();
  let endTime = end.getTime();

  if (!isSameDay(NOW, end)) {
    endTime += A_DAY_IN_MILLIS;
  }

  const api = get(clientState);

  const { data } = await api.getOverviewStats(app.id, {
    startTime: startTime,
    endTime: endTime,
  });

  if (data.data) {
    const stats = (data.data as OverviewStatsResp).stats;
    rs.stats = stats;
  }

  return rs;
});

export const loadableOverviewStats = loadable(overviewStatsState);

export const avgUsedTimeState = atom(async (get) => {
  const rs: AvgUsedTimeResp = { stats: { A1: [], A7: [], A30: [] } };
  const app = get(appState);

  if (!app) {
    return rs;
  }

  const { startTime: start, endTime: end } = get(statsFilterState);

  const startTime = start.getTime(),
    endTime = end.getTime();

  const api = get(clientState);

  const { data } = await api.getAvgStats(app.id, {
    startTime: startTime,
    endTime: endTime,
  });

  if (data.data) {
    rs["stats"] = (data.data as AvgUsedTimeResp).stats;
  }
  return rs;
});

export const loadableAvgUsedTimeStats = loadable(avgUsedTimeState);

export const overviewSummaryState = atom(async (get) => {});

export const pageviewFilterState = atom("1"); // 1 is day ; 7 is week

export const pageViewStatsState = atom(async (get) => {
  const rs: PageviewStatsResp = { pageview: [] };
  const app = get(appState);

  if (!app) {
    return rs;
  }

  const api = get(clientState);

  const type = get(pageviewFilterState);

  const startTime = addDays(NOW, -parseInt(type));
  const endTime = NOW;

  const { data } = await api.pageViewStats(app.id, {
    startTime: startTime.getTime(),
    endTime: endTime.getTime(),
  });
  if (data.data) {
    return data.data as PageviewStatsResp;
  }

  return rs;
});
export const loadablePageViewStats = loadable(pageViewStatsState);

export const accessTrafficFilterState = atom({
  os: "all",
  utmSource: "all",
  utmMedium: "all",
  utmCampaign: "all",
});

export const accessTrafficState = atom(async (get) => {
  const rs: AccessTrafficStatsResp = { stats: [], utmSources: [] };
  const app = get(appState);

  if (!app) {
    return rs;
  }

  const filter = get(statsFilterState);
  const trafficFilter = get(accessTrafficFilterState);

  const api = get(clientState);

  const { data } = await api.getAccessSourceTraffic(app.id, {
    ...trafficFilter,
    startTime: filter.startTime.getTime(),
    endTime: filter.endTime.getTime(),
  });
  if (data.data) {
    return data.data as AccessTrafficStatsResp;
  }

  return rs;
});

export const loadableAccessTrafficStats = loadable(accessTrafficState);

export const trafficByUtmSourcesState = atom(async (get) => {
  const rs: TrafficBySourcesResp = { stats: [], utmSources: [] };
  const app = get(appState);

  if (!app) {
    return rs;
  }
  const api = get(clientState);

  const { data } = await api.trafficBySources(app.id, {
    startTime: addDays(NOW, -7).getTime(),
    endTime: NOW.getTime(),
  });
  if (data.data) {
    return data.data as TrafficBySourcesResp;
  }

  return rs;
});

export const loadableTrafficByUtmSourcesStats = loadable(
  trafficByUtmSourcesState
);

export const usedTimeState = atom(async (get) => {
  const rs: UsedTimeStatsResp = { stats: {} };
  const app = get(appState);

  if (!app) {
    return rs;
  }
  const api = get(clientState);

  const filter = get(statsFilterState);

  const { data } = await api.getUsedTimeStats(app.id, {
    startTime: filter.startTime.getTime(),
    endTime: filter.endTime.getTime(),
  });
  if (data.data) {
    return data.data as UsedTimeStatsResp;
  }

  return rs;
});

export const loadableUsedTimeStats = loadable(usedTimeState);

export const demographicStatsState = atom(async (get) => {
  const rs: DemographicStatsResp = { stats: { age: [], gender: [] } };
  const app = get(appState);

  if (!app) {
    return rs;
  }
  const api = get(clientState);

  const filter = get(statsFilterState);

  const { data } = await api.getDemographicStats(app.id, {
    startTime: filter.startTime.getTime(),
    endTime: filter.endTime.getTime(),
  });
  if (data.data) {
    return data.data as DemographicStatsResp;
  }

  return rs;
});

export const loadableDemographicStats = loadable(demographicStatsState);

export const platformStatsState = atom(async (get) => {
  const rs: PlatformStatsResp = { stats: [] };
  const app = get(appState);

  if (!app) {
    return rs;
  }
  const api = get(clientState);

  const filter = get(statsFilterState);

  const { data } = await api.getPlatformStats(app.id, {
    startTime: filter.startTime.getTime(),
    endTime: filter.endTime.getTime(),
  });
  if (data.data) {
    return data.data as PlatformStatsResp;
  }

  return rs;
});

export const loadablePlatformStats = loadable(platformStatsState);

export const appsAtom = atomWithInfiniteQuery((get) => {
  const zApp = get(zAppState);
  const api = get(clientState);

  return {
    queryKey: ["apps", zApp?.id],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.apps({
        zappId: zApp?.id || "0",
        page: pageParam as number,
      });
      return data.data as AppsResp;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => lastPage.nextPage,
    initialPageParam: 0,
  };
});

export const detailWebVitalsStatsFilterState = atom(addDays(NOW, -1));

export const detailWebvitalsStatsState = atom(async (get) => {
  type Keys = (typeof WEBVITALS_INDICATORS)[number];

  const rs: { [key in Keys]?: DetailWebvitalsStats } = {};

  const api = get(clientState);

  const app = get(appState);

  if (!app) {
    return rs;
  }

  const startTime = get(detailWebVitalsStatsFilterState).getTime();
  const appId = app.id;
  const allNames = WEBVITALS_INDICATORS.map((name) =>
    api.webVitalsDetailStats(appId, { name, startTime })
  );
  const data = await Promise.all(allNames);
  WEBVITALS_INDICATORS.map((item, index) => {
    rs[item] = data[index].data.data as DetailWebvitalsStats;
  });
  return rs;
});

export const loadableDetailWebvitalsStats = loadable(detailWebvitalsStatsState);

export const overviewRatingState = atom(async (get) => {
  const rs: OverviewRating = {};
  const app = get(appState);

  if (!app) {
    return rs;
  }
  const api = get(clientState);

  const { data } = await api.ratings(app.id);
  if (data.data) {
    return data.data as OverviewRating;
  }
  return rs;
});

export const loadableOverviewRating = loadable(overviewRatingState);

export const ratingTableFilterState = atom<RatingFilter, [RatingFilter], void>(
  { page: 0, pageSize: 5, fieldSort: "CREATED_AT", sort: "DESC", star: 0 },
  (get, set, update) => {
    set(ratingTableFilterState, update);
  }
);

export const ratingTableState = atom(async (get) => {
  const app = get(appState);
  const rs = { total: 0, data: [] };
  if (!app) {
    return rs;
  }
  const filter = get(ratingTableFilterState);
  const api = get(clientState);
  const { data } = await api.listUserRating(app.id, {
    ...filter,
  });
  return data.data || rs;
});

export const loadableRatingTable = loadable(ratingTableState);
