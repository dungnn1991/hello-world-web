export const WEBVITALS_INDICATORS = [
  "LCP",
  "FCP",
  "FID",
  "CLS",
  "TTFB",
  "PLT",
] as const;

export const WEBVITALS_COLOR = {
  good: "#01A050",
  "needs-improvement": "#FEB100",
  poor: "#F03129",
};

export const WEBVITALS_CONFIG = {
  LCP: {
    bottomValue: 2500,
    topValue: 4000,
    divider: 1000,
    bottomBound: 25,
    topBound: 40,
    unit: "ms",
    avgUnit: "s",
    fullName: "Largest Contentful Paint",
    description:
      "Thước đo thời gian cần để phần tử lớn nhất xuất hiện hoàn toàn trên màn hình.",
    statsDescription: {
      good: "Chỉ số LCP ít hơn 2.5s",
      "needs-improvement": "Chỉ số LCP từ 2.5s đến 4s",
      poor: "Chỉ số LCP lớn hơn 4s",
    },
  },
  FCP: {
    bottomValue: 1800,
    topValue: 3000,
    divider: 1000,
    bottomBound: 18,
    topBound: 30,
    unit: "ms",
    avgUnit: "s",
    fullName: "First Contentful Paint",
    description:
      "Thước đo thời gian cần để phần tử đầu tiên xuất hiện trên màn hình.",
    statsDescription: {
      good: "Chỉ số FCP ít hơn 2.5s",
      "needs-improvement": "Chỉ số FCP từ 2.5s đến 4s",
      poor: "Chỉ số FCP lớn hơn 4s",
    },
  },
  FID: {
    bottomValue: 100,
    topValue: 300,
    divider: 1,
    bottomBound: 10,
    topBound: 30,
    unit: "ms",
    avgUnit: "ms",
    fullName: "First Input Delay",
    description:
      "Thước đo thời gian chờ từ khi bắt đầu tương tác đầu tiên đến khi phản hồi lại.",
    statsDescription: {
      good: "Chỉ số FID ít hơn 100ms",
      "needs-improvement": "Chỉ số FID từ 100ms đến 300ms",
      poor: "Chỉ số FID lớn hơn 300ms",
    },
  },
  CLS: {
    bottomValue: 0.1,
    topValue: 0.25,
    divider: 1,
    bottomBound: 10,
    topBound: 25,
    unit: "",
    avgUnit: "",
    fullName: "Cumulative Layout Shift",
    description:
      "Thước đo đánh giá tính ổn định bằng cách tổng hợp các thay đổi đột ngột về vị trí và kích thước của các phần tử trong suốt thời gian hoạt động.",
    statsDescription: {
      good: "Chỉ số CLS ít hơn 0.1",
      "needs-improvement": "Chỉ số CLS từ 0.1 đến 0.25",
      poor: "Chỉ số CLS lớn hơn 0.25",
    },
  },
  TTFB: {
    bottomValue: 800,
    topValue: 1800,
    divider: 1000,
    bottomBound: 8,
    topBound: 18,
    unit: "ms",
    avgUnit: "s",
    fullName: "Time to First Byte",
    description:
      "Thời gian cần thiết để trình duyệt nhận được phản hồi đầu tiên sau khi yêu cầu tài nguyên từ máy chủ.",
    statsDescription: {
      good: "Chỉ số TTFB ít hơn 0.8s",
      "needs-improvement": "Chỉ số TTFB từ 0.8s đến 1.8s",
      poor: "Chỉ số TTFB lớn hơn 1.8s",
    },
  },
  PLT: {
    bottomValue: 1500,
    topValue: 3000,
    divider: 1000,
    bottomBound: 15,
    topBound: 30,
    unit: "ms",
    avgUnit: "s",
    fullName: "Page Load Time",
    description:
      "Khoảng thời gian ứng dụng mất để tải các tài nguyên cần thiết, và nó được đo từ thời điểm bắt đầu điều hướng (navigation start) đến thời điểm sự kiện tải (load event) của trình duyệt xảy ra.",
    statsDescription: {
      good: "Chỉ số PLT ít hơn 1.5s",
      "needs-improvement": "Chỉ số PLT từ 1.5s đến 3s",
      poor: "Chỉ số PLT lớn hơn 3s",
    },
  },
};

export const calcAvgWebvitals = (name: string, avgValue: number): string => {
  const { divider, avgUnit } =
    WEBVITALS_CONFIG[name as keyof typeof WEBVITALS_CONFIG];
  if (divider > 1) {
    return `${(avgValue / divider).toFixed(1)} ${avgUnit}`;
  }
  if (name === "CLS") {
    return avgValue.toFixed(2);
  }
  return `${avgValue.toFixed(0)} ${avgUnit}`;
};

interface QualifyResult {
  label: string;
  color: string;
  textColor: string;
  description: string;
  statsDescription: string;
}

export const qualify = (name: string, value: number): QualifyResult => {
  const { bottomValue, topValue, description, statsDescription } =
    WEBVITALS_CONFIG[name as keyof typeof WEBVITALS_CONFIG];
  if (value <= bottomValue) {
    return {
      label: "Good",
      color: WEBVITALS_COLOR.good,
      textColor: "#FFFFFF",
      description,
      statsDescription: statsDescription.good,
    };
  }
  if (value <= topValue) {
    return {
      label: "Needs Improvement",
      color: WEBVITALS_COLOR["needs-improvement"],
      textColor: "#000000",
      description,
      statsDescription: statsDescription["needs-improvement"],
    };
  }
  return {
    label: "Poor",
    color: WEBVITALS_COLOR.poor,
    textColor: "#FFFFFF",
    description,
    statsDescription: statsDescription.poor,
  };
};

interface QualifyMiniAppPerformnaceResult {
  label: string;
  textColor: string;
  description: string;
}

export const qualifyMiniAppPerformnace = (
  p60LCP: number,
  p75PLT: number
): QualifyMiniAppPerformnaceResult => {
  if (p60LCP > 4000 || p75PLT > 4000) {
    return {
      label: "Poor",
      textColor: WEBVITALS_COLOR.poor,
      description: "Chỉ số LCP hoặc PLT quá cao (LCP > 4s hoặc PLT > 4s)",
    };
  }
  if (p60LCP > 2500 || p75PLT > 1500) {
    return {
      label: "Needs Improvement",
      textColor: "#C27500",
      description: "Chỉ số LCP hoặc PLT cao (LCP > 2.5s hoặc PLT > 1.5s)",
    };
  }
  return {
    label: "Good",
    textColor: WEBVITALS_COLOR.good,
    description: "Chỉ số LCP và PLT đạt yêu cầu (LCP <= 2.5s, PLT <= 1.5s)",
  };
};
