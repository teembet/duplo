/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";

import { KeyedMutator } from "swr";

export interface useStepsProps {
  currentStep: number;
  nextStep: () => void;
  isDone: boolean;
  jumpToStep: (v: number) => void;
  previousStep: () => void;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface useCountdownInitializeProps {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface useCountdownProps {
  hoursLeft: string | number;
  isOver: boolean;
  minutesLeft: string | number;
  pause: () => void;
  reset: () => void;
  resume: () => void;
  secondsLeft: string | number;
  start: () => void;
  stop: () => void;
  isRunning: boolean;
}

export type GeoPosition = {
  accuracy?: number;
  latitude?: number;
  longitude?: number;
  timestamp?: number;
  error?: string;
};

export enum FileCompressionStatus {
  pending = "PENDING",
  compressing = "WORKING",
  error = "ERROR",
  done = "DONE",
}

export type FileCompressionResult = [
  (file: File) => Promise<Blob | File>,
  FileCompressionStatus,
];

export type ErrorLogger = (
  error: Error | string | number | Record<string, unknown> | []
) => void;

export interface LocationData {
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
  state: string;
  location: string;
}
export interface INetworkInformation extends EventTarget {
  readonly downlink: number;
  readonly downlinkMax: number;
  readonly effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  readonly rtt: number;
  readonly saveData: boolean;
  readonly type:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "none"
    | "wifi"
    | "wimax"
    | "other"
    | "unknown";

  onChange: (event: Event) => void;
}

export enum NetworkSpeedType {
  VERY_SLOW = "slow-2g",
  SLOW = "2g",
  OKAY = "3g",
  FAST = "4g",
}

export enum NetworkSpeed {
  SLOW = "SLOW",
  FAST = "FAST",
}

export interface IuseAppStorage {
  addToStore: (key: string, value: any) => Promise<boolean | null>;
  getFromStore: (key: string) => Promise<any>;
  getStore: () => Promise<any>;
  removeFromStore: (key: string) => Promise<boolean | null>;
  clearStore: () => Promise<void | null>;
}

export type UseParamsResult = {
  removeParams: (key: string | string[]) => void;
  setParams: (data: { [key: string]: string }) => void;
  getParamsValue: (key: string) => any;
};

export type UseDocumentActionUploadProps = {
  uploadKey: string;
  event: ChangeEvent;
  mutate?: (() => Promise<void>) | KeyedMutator<any>;
  urlProps: {
    customerId?: string;
    opportunityId?: string;
    isEdit?: boolean;
  };
};

export type UseDocumentActionDeleteProps = {
  mutate?: (() => Promise<void>) | KeyedMutator<any>;
  payload: Record<string, any>;
};
