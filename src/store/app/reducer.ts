import { AppState } from "@/models/app-state";
import { Subtitle } from "@/models/subtitle";
import { convertTimeToSeconds } from "@/utils/time-helper";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { addEmptySubtitle, editorSubtitle, initSubtitle, removeSubtitle, setCurrentSubtitle, setCurrentTime, setEditable, setPlayed, setVideoHeight } from "./action";
import { InitSubtitle, StartTime } from "./model";

const initialState: AppState = {
  subtitleList: [],
  videoHeight: 0,
  currentTime: '',
  currentSubtitle: {
    number: 0,
    startTime: '',
    endTime: '',
    text: ''
  },
  played: false,
  editable: false
};

export const AppReducer = createReducer(initialState, (builder) => {
  builder.addCase(initSubtitle, (state, action: PayloadAction<InitSubtitle>) => {
    state.subtitleList = action.payload.subtitleList
  })
  builder.addCase(setVideoHeight, (state, action: PayloadAction<number>) => {
    state.videoHeight = action.payload
  })
  builder.addCase(setCurrentTime, (state, action: PayloadAction<string>) => {
    state.currentTime = action.payload
  })
  builder.addCase(setCurrentSubtitle, (state, action: PayloadAction<Subtitle>) => {
    state.currentSubtitle = action.payload

  })
  builder.addCase(editorSubtitle, (state, action: PayloadAction<Subtitle>) => {
    const newList = state.subtitleList
      .map(subtitle => (subtitle.number === action.payload.number ? { ...action.payload } : subtitle))
      .sort((a, b) => convertTimeToSeconds(a.startTime) - convertTimeToSeconds(b.startTime))
      .map((subtitle, i) => ({ ...subtitle, number: i + 1 }))

    state.subtitleList = newList
  })
  builder.addCase(setPlayed, (state, action: PayloadAction<boolean>) => {
    state.played = action.payload
  })
  builder.addCase(setEditable, (state, action: PayloadAction<boolean>) => {
    state.editable = action.payload
  })
  builder.addCase(addEmptySubtitle, (state, action: PayloadAction<StartTime>) => {
    const subtitleItem: Subtitle = {
      number: 999999,
      startTime: action.payload.startTime + 1,
      endTime: action.payload.startTime + 2,
      text: '',
    }
    const newList = [...state.subtitleList, subtitleItem]
      .sort((a, b) => convertTimeToSeconds(a.startTime) - convertTimeToSeconds(b.startTime))
      .map((subtitle, i) => ({ ...subtitle, number: i + 1 }))
    state.subtitleList = newList
  })
  builder.addCase(removeSubtitle, (state, action: PayloadAction<number>) => {
    state.subtitleList = state.subtitleList.filter(({ number }) => number !== action.payload)
  })

  builder.addDefaultCase(() => initialState);
});
