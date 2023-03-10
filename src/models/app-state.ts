import { Subtitle } from "./subtitle";

export interface AppState {
  subtitleList: Subtitle[]
  videoHeight: number
  currentTime: string
  currentSubtitle: Subtitle
}