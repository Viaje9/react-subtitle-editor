import { onClickPlay } from './action';
import { Subtitle } from "@/models/subtitle";

export interface  InitSubtitle {
  subtitleList: Subtitle[]
}

export interface StartTime {
  startTime: string;
}

export interface onClickPlayInfo {
  pending: boolean
  played: boolean
}