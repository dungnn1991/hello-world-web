import { format } from "date-fns";

export const formatNumber = (value: number | undefined, dot = ","): string => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, dot);
};

export const formatNumberChart = (value: number | undefined): string => {
  if (!value) {
    return "0";
  }
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatAbbreviatedNumber = (value: number) => {
  const val = Math.abs(value);
  if (val >= 1000000000) {
    return `${(val / 1000000000).toFixed(0)}T`;
  }
  if (val >= 1000000) {
    return `${(val / 1000000).toFixed(0)}M`;
  }
  if (val >= 1000) {
    return `${(val / 1000).toFixed(0)}K`;
  }
  return `${Number.isInteger(val) ? val : val.toFixed(2)}`;
};

function hashCode(str: string, shift: number) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << shift) - hash);
  }
  return hash;
}

function intToRGB(i: number) {
  // eslint-disable-next-line no-bitwise
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  const rs = "00000".substring(0, 6 - c.length) + c;
  return `#${rs}`;
}

export const stringToColor = (string: string) => {
  return intToRGB(hashCode(string, 10));
};

export const beginningOfDate = (date: Date) => {
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

export const formatDateTimeForChart = (time: number): string => {
  return format(time, "dd-MMM");
};
