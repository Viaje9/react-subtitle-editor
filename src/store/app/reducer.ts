import { AppState } from "@/models/app-state";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { initSubtitle, setVideoHeight } from "./action";
import { InitSubtitle } from "./model";

const initialState: AppState = {
  subtitleList: [],
  videoHeight: 0
};

export const AppReducer = createReducer(initialState, (builder) => {
  builder.addCase(initSubtitle, (state, action: PayloadAction<InitSubtitle>) => {
    state.subtitleList = action.payload.subtitleList
  })
  builder.addCase(setVideoHeight, (state, action: PayloadAction<number>) => {
    state.videoHeight = action.payload
  })
  builder.addDefaultCase((state, action) => ({ ...initialState }));
});
