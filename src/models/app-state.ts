import { onClickPlayInfo } from '@/store/app/model';
import { onClickPlay } from './../store/app/action';
import { Subtitle } from "./subtitle";

export interface AppState {
  subtitleList: Subtitle[]
  videoHeight: number
  currentTime: string
  currentSubtitle: Subtitle
  played: boolean
  editable: boolean
  onClickPlayInfo: onClickPlayInfo
}