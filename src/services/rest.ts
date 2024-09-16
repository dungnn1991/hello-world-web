/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiMessageResponseListZaloAppResponse {
  /** @format int32 */
  error?: number;
  message?: string;
  data?: ListZaloAppResponse;
  apiMessageCode?:
    | "SUCCESS"
    | "FAILED"
    | "CALL_FAIL"
    | "UPDATE_FAIL"
    | "INVALID_DATA"
    | "MISSING_PARAM"
    | "EXCEPTION"
    | "NOT_EXIST"
    | "NOT_LOGIN"
    | "AUTHEN_FAILED"
    | "NON_PERMISSION"
    | "EXCEEDED_RATE_LIMIT"
    | "BOARD_REGISTERED"
    | "TIME_INVALID"
    | "CHALLENGE_EXISTED"
    | "NO_ENOUGH_POINT"
    | "CHALLENGE_STATUS_INVALID"
    | "TOKEN_EXPIRED";
}

export interface ListZaloAppResponse {
  /** @format int32 */
  total?: number;
  zapps?: ZAppDto[];
}

export interface ZAppDto {
  id?: string;
  name?: string;
  logoUrl?: string;
  /** @format int32 */
  totalActiveApps?: number;
  /** @format int32 */
  limitNumberApps?: number;
}

export interface ApiMessageResponseObject {
  /** @format int32 */
  error?: number;
  message?: string;
  data?: object;
  apiMessageCode?:
    | "SUCCESS"
    | "FAILED"
    | "CALL_FAIL"
    | "UPDATE_FAIL"
    | "INVALID_DATA"
    | "MISSING_PARAM"
    | "EXCEPTION"
    | "NOT_EXIST"
    | "NOT_LOGIN"
    | "AUTHEN_FAILED"
    | "NON_PERMISSION"
    | "EXCEEDED_RATE_LIMIT"
    | "BOARD_REGISTERED"
    | "TIME_INVALID"
    | "CHALLENGE_EXISTED"
    | "NO_ENOUGH_POINT"
    | "CHALLENGE_STATUS_INVALID"
    | "TOKEN_EXPIRED";
}

export interface ApiMessageResponseRatingResponse {
  /** @format int32 */
  error?: number;
  message?: string;
  data?: RatingResponse;
  apiMessageCode?:
    | "SUCCESS"
    | "FAILED"
    | "CALL_FAIL"
    | "UPDATE_FAIL"
    | "INVALID_DATA"
    | "MISSING_PARAM"
    | "EXCEPTION"
    | "NOT_EXIST"
    | "NOT_LOGIN"
    | "AUTHEN_FAILED"
    | "NON_PERMISSION"
    | "EXCEEDED_RATE_LIMIT"
    | "BOARD_REGISTERED"
    | "TIME_INVALID"
    | "CHALLENGE_EXISTED"
    | "NO_ENOUGH_POINT"
    | "CHALLENGE_STATUS_INVALID"
    | "TOKEN_EXPIRED";
}

export interface RatingResponse {
  /** @format double */
  rating?: number;
  ratings?: Record<string, number>;
  /** @format int32 */
  total?: number;
}

export interface ApiMessageResponsePagingWrapperUserRatingResponse {
  /** @format int32 */
  error?: number;
  message?: string;
  data?: PagingWrapperUserRatingResponse;
  apiMessageCode?:
    | "SUCCESS"
    | "FAILED"
    | "CALL_FAIL"
    | "UPDATE_FAIL"
    | "INVALID_DATA"
    | "MISSING_PARAM"
    | "EXCEPTION"
    | "NOT_EXIST"
    | "NOT_LOGIN"
    | "AUTHEN_FAILED"
    | "NON_PERMISSION"
    | "EXCEEDED_RATE_LIMIT"
    | "BOARD_REGISTERED"
    | "TIME_INVALID"
    | "CHALLENGE_EXISTED"
    | "NO_ENOUGH_POINT"
    | "CHALLENGE_STATUS_INVALID"
    | "TOKEN_EXPIRED";
}

export interface PagingWrapperUserRatingResponse {
  data?: UserRatingResponse[];
  /** @format int32 */
  total?: number;
}

export interface UserRatingResponse {
  /** @format int32 */
  id?: number;
  avatar?: string;
  comment?: string;
  name?: string;
  /** @format int32 */
  rating?: number;
  /** @format int64 */
  updatedAt?: number;
}

export interface ApiMessageResponseListMiniAppResponse {
  /** @format int32 */
  error?: number;
  message?: string;
  data?: ListMiniAppResponse;
  apiMessageCode?:
    | "SUCCESS"
    | "FAILED"
    | "CALL_FAIL"
    | "UPDATE_FAIL"
    | "INVALID_DATA"
    | "MISSING_PARAM"
    | "EXCEPTION"
    | "NOT_EXIST"
    | "NOT_LOGIN"
    | "AUTHEN_FAILED"
    | "NON_PERMISSION"
    | "EXCEEDED_RATE_LIMIT"
    | "BOARD_REGISTERED"
    | "TIME_INVALID"
    | "CHALLENGE_EXISTED"
    | "NO_ENOUGH_POINT"
    | "CHALLENGE_STATUS_INVALID"
    | "TOKEN_EXPIRED";
}

export interface AppDto {
  id?: string;
  name?: string;
  logoUrl?: string;
  status?: "DISABLE" | "ENABLE";
  category?:
    | "UNDEFINED"
    | "SERVICE"
    | "VIDEO"
    | "ECOMMERCE"
    | "GAME"
    | "TRAVELING"
    | "EDUCATION"
    | "HEALTH"
    | "FINANCE"
    | "GOVERNMENT"
    | "BUSINESS"
    | "TOOLS"
    | "IMAGES"
    | "NEWS"
    | "SOUND"
    | "SOCIAL"
    | "OFFLINE_SALE"
    | "OFFLINE_STORE"
    | "OTHERS"
    | "UTILITIES"
    | "DEMO"
    | "LEAD_FORM";
  description?: string;
  zappId?: string;
}

export interface ListMiniAppResponse {
  /** @format int32 */
  total?: number;
  data?: AppDto[];
  /** @format int32 */
  nextPage?: number;
}

export interface ApiMessageResponseAppDto {
  /** @format int32 */
  error?: number;
  message?: string;
  data?: AppDto;
  apiMessageCode?:
    | "SUCCESS"
    | "FAILED"
    | "CALL_FAIL"
    | "UPDATE_FAIL"
    | "INVALID_DATA"
    | "MISSING_PARAM"
    | "EXCEPTION"
    | "NOT_EXIST"
    | "NOT_LOGIN"
    | "AUTHEN_FAILED"
    | "NON_PERMISSION"
    | "EXCEEDED_RATE_LIMIT"
    | "BOARD_REGISTERED"
    | "TIME_INVALID"
    | "CHALLENGE_EXISTED"
    | "NO_ENOUGH_POINT"
    | "CHALLENGE_STATUS_INVALID"
    | "TOKEN_EXPIRED";
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://dev-miniapp-analytics.api.zalo.me",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title ZaloMiniAppAnalyticsAPI - REST API
 * @version 1.0
 * @baseUrl http://dev-miniapp-analytics.api.zalo.me
 * @contact Sanglq3 <sanglq3@vng.com.vn>
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags app-controller
     * @name Zapps
     * @request GET:/api/zapps
     * @secure
     */
    zapps: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * @format int32
         * @default 20
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseListZaloAppResponse, any>({
        path: `/api/zapps`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name WebVitalsOverviewStats
     * @request GET:/api/stats/{appId}/webvitals-overview
     * @secure
     */
    webVitalsOverviewStats: (
      appId: string,
      query: {
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
        /**
         * @format int64
         * @min 0
         */
        endTime: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/webvitals-overview`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name WebVitalsLrStats
     * @request GET:/api/stats/{appId}/webvitals-lr
     * @secure
     */
    webVitalsLrStats: (
      appId: string,
      query: {
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
        /**
         * @format int64
         * @min 0
         */
        endTime: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/webvitals-lr`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name WebVitalsDetailStats
     * @request GET:/api/stats/{appId}/webvitals-detail
     * @secure
     */
    webVitalsDetailStats: (
      appId: string,
      query: {
        name: string;
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/webvitals-detail`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name GetCurrentUserOnline
     * @request GET:/api/stats/{appId}/user-online
     * @secure
     */
    getCurrentUserOnline: (appId: string, params: RequestParams = {}) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/user-online`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name GetUsedTimeStats
     * @request GET:/api/stats/{appId}/used-time
     * @secure
     */
    getUsedTimeStats: (
      appId: string,
      query: {
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
        /**
         * @format int64
         * @min 0
         */
        endTime: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/used-time`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name TrafficBySources
     * @request GET:/api/stats/{appId}/traffic-by-sources
     * @secure
     */
    trafficBySources: (
      appId: string,
      query: {
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
        /**
         * @format int64
         * @min 0
         */
        endTime: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/traffic-by-sources`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name GetPlatformStats
     * @request GET:/api/stats/{appId}/platform
     * @secure
     */
    getPlatformStats: (
      appId: string,
      query: {
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
        /**
         * @format int64
         * @min 0
         */
        endTime: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/platform`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name PageViewStats
     * @request GET:/api/stats/{appId}/page-view
     * @secure
     */
    pageViewStats: (
      appId: string,
      query: {
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
        /**
         * @format int64
         * @min 0
         */
        endTime: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/page-view`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name GetOverviewStats
     * @request GET:/api/stats/{appId}/overview
     * @secure
     */
    getOverviewStats: (
      appId: string,
      query: {
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
        /**
         * @format int64
         * @min 0
         */
        endTime: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/overview`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name GetDemographicStats
     * @request GET:/api/stats/{appId}/demographic
     * @secure
     */
    getDemographicStats: (
      appId: string,
      query: {
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
        /**
         * @format int64
         * @min 0
         */
        endTime: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/demographic`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name GetAvgStats
     * @request GET:/api/stats/{appId}/avg-used-time
     * @secure
     */
    getAvgStats: (
      appId: string,
      query: {
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
        /**
         * @format int64
         * @min 0
         */
        endTime: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/avg-used-time`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name GetActiveUserStats
     * @request GET:/api/stats/{appId}/active-users
     * @secure
     */
    getActiveUserStats: (
      appId: string,
      query: {
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
        /**
         * @format int64
         * @min 0
         */
        endTime: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/active-users`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats-controller
     * @name GetAccessSourceTraffic
     * @request GET:/api/stats/{appId}/access-traffic
     * @secure
     */
    getAccessSourceTraffic: (
      appId: string,
      query: {
        /**
         * @format int64
         * @min 0
         */
        startTime: number;
        /**
         * @format int64
         * @min 0
         */
        endTime: number;
        /** @default "all" */
        os?: string;
        /** @default "all" */
        utmSource?: string;
        /** @default "all" */
        utmMedium?: string;
        /** @default "all" */
        utmCampaign?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseObject, any>({
        path: `/api/stats/${appId}/access-traffic`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags app-controller
     * @name Ratings
     * @request GET:/api/ratings/{appId}/overview
     * @secure
     */
    ratings: (appId: string, params: RequestParams = {}) =>
      this.request<ApiMessageResponseRatingResponse, any>({
        path: `/api/ratings/${appId}/overview`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags app-controller
     * @name ListUserRating
     * @request GET:/api/ratings/{appId}/list
     * @secure
     */
    listUserRating: (
      appId: string,
      query?: {
        /** @default "CREATED_AT" */
        fieldSort?: string;
        /** @default "DESC" */
        sort?: string;
        /**
         * @format int32
         * @default 0
         */
        star?: number;
        /**
         * @format int32
         * @default 0
         */
        startReply?: number;
        /**
         * @format int32
         * @default 3
         */
        countReply?: number;
        hasReview?: boolean;
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * @format int32
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponsePagingWrapperUserRatingResponse, any>({
        path: `/api/ratings/${appId}/list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags app-controller
     * @name Apps
     * @request GET:/api/apps
     * @secure
     */
    apps: (
      query: {
        zappId: string;
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * @format int32
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiMessageResponseListMiniAppResponse, any>({
        path: `/api/apps`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags app-controller
     * @name GetAppById
     * @request GET:/api/apps/{appId}
     * @secure
     */
    getAppById: (appId: string, params: RequestParams = {}) =>
      this.request<ApiMessageResponseAppDto, any>({
        path: `/api/apps/${appId}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
