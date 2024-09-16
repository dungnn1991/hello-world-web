export type User = {
  id: string;
  name: string;
  avatar: string;
  idByOA?: string;
};

export type ResData<T> = {
  data?: T;
  err: number;
  message: string;
};

export interface App {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
}

export interface UserOnlineResp {
  userOnline: number;
}

export interface OverviewItem {
  activeUser: number;
  newUser: number;
  time: number;
  visitUser: number;
}

export interface OverviewStatsData {
  A1: OverviewItem[];
  A7: OverviewItem[];
  A30: OverviewItem[];
}

export interface OverviewStatsResp {
  stats: OverviewStatsData;
}

interface AvgUsedItem {
  count: number;
  time: number;
}

export interface AvgUsedTimeData {
  A1: AvgUsedItem[];
  A7: AvgUsedItem[];
  A30: AvgUsedItem[];
}

export interface AvgUsedTimeResp {
  stats: AvgUsedTimeData;
}

export interface MapOverviewStats {
  [key: number]: OverviewItem;
}

export type ZApp = Omit<App, "desc"> & {
  limitNumberApps: number;
  totalActiveApps: number;
};

export interface PageviewStatsResp {
  pageview: { time: number; count: number }[];
}
interface DetailSourceStats {
  count: number;
  stats: {
    [key: string]: number;
  };
  time: number;
}

export interface TrafficBySourcesResp {
  utmSources: string[];
  stats: DetailSourceStats[];
}

interface AccessTrafficItem {
  newUser: number;
  totalVisit: number;
  totalUser: number;
  time: number;
}

export interface AccessTrafficStatsResp {
  stats: AccessTrafficItem[];
  utmSources: {
    label: string;
    value: string;
  }[];
}

export interface UsedTimeStatsResp {
  stats: {
    [key: string]: AvgUsedItem[];
  };
}

export interface DemographicStatsResp {
  stats: {
    age: {
      [key: number]: number;
      time: number;
    }[];
    gender: {
      male: number;
      female: number;
      time: number;
    }[];
  };
}

export interface PlatformStatsResp {
  stats: {
    time: number;
    Others: number;
    Android: number;
    iOS: number;
  }[];
}

export interface AppsResp {
  nextPage?: number;
  data: App[];
  total: number;
}

export interface Diff {
  value: number;
  label: string;
}

export interface SummaryItem {
  value: number;
  diff?: Diff[];
}

export interface SummaryData {
  activeUser: SummaryItem;
  newUser: SummaryItem;
  visitUser: SummaryItem;
}

export interface AppWebvitalsStats {
  good: number;
  "needs-improvement": number;
  poor: number;
}

export interface DetailWebvitalsStats {
  name: string;
  avgValue: number;
  count: number;
  percentStats: AppWebvitalsStats;
  rangeStats: {
    range: string;
    count: number;
  }[];
  p60: number;
  p75: number;
}

export interface OverviewRating {
  rating?: number;
  ratings?: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
  total?: number;
}

export interface RatingFilter {
  star?: number;
  page?: number;
  pageSize?: number;
  sort?: string;
  fieldSort?: string; // "VALUE" | "CREATED_AT";
  hasReview?: boolean;
}
