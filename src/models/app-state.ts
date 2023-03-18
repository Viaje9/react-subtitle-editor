import { FontInfo, onClickPlayInfo } from '@/store/app/model';
import { onClickPlay } from './../store/app/action';
import { SubtitleInfo } from "./subtitle";

export interface AppState {
  subtitleList: SubtitleInfo[]
  videoHeight: number
  currentTime: string
  currentSubtitle: SubtitleInfo
  played: boolean
  editable: boolean
  onClickPlayInfo: onClickPlayInfo
  fontInfo: FontInfo
}