import { AppState } from "@/models/app-state";
import { Subtitle } from "@/models/subtitle";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { initSubtitle, setCurrentSubtitle, setCurrentTime, setVideoHeight } from "./action";
import { InitSubtitle } from "./model";

const initialState: AppState = {
  subtitleList: [],
  videoHeight: 0,
  currentTime: '',
  currentSubtitle: {
    number: 0,
    startTime: '',
    endTime: '',
    text: ''
  }
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
  builder.addDefaultCase(() => ({ ...initialState }));
});
