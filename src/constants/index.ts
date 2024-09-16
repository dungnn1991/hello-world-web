export const DASHBOARD_PAGE = {
  CHART: {
    loadtime: "Thời gian tải trang",
    pageview: "Lượt xem trang",
    user: "Tổng số người dùng",
    rendertime: "Thời gian render",
    networktime: "Thời gian kết nối",
    duration: "Thời gian hoạt động",
    duration_user: "Thời gian hoạt động",
    a1: "Thống kê lưu lượng truy cập",
  },
  EMPTY_CHART_DATA: "Hiện chưa có dữ liệu thống kê.",
  STAT_UNIT: {
    loadtime: "miliseconds (ms)",
    pageview: "lượt xem",
    user: "người dùng",
    rendertime: "miliseconds (ms)",
    networktime: "miliseconds (ms)",
    duration: "giây/session",
    duration_user: "giây/người dùng",
    a1: "",
  },
};

export const IS_DEVELOPING =
  import.meta.env.DEV || new URLSearchParams(location.search).has("env");

export const ZAPP_SELECTED_KEY = "selected-zappid";

const config = {
  ENV: import.meta.env.MODE,
  BASE_URL: IS_DEVELOPING
    ? "https://mapp-analytics.mini.zalo.me/"
    : "https://mapp-analytics.mini.zalo.me/",
  PAGE_LIMIT: 20,
};

export default config;

export const DELAY = 500; // ms
