import { SubtitleInfo } from "@/models/subtitle";

export interface  InitSubtitle {
  subtitleList: SubtitleInfo[]
}

export interface StartTime {
  startTime: string;
}

export interface onClickPlayInfo {
  pending: boolean
  played: boolean
}

export interface FontInfo {
  left: number
  bottom: number
  fontSize: number
}