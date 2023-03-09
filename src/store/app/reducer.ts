import { AppState } from "@/models/app-state";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { initSubtitle } from "./action";
import { InitSubtitle } from "./model";

const initialState: AppState = {
  subtitleList: [],
};

export const AppReducer = createReducer(initialState, (builder) => {
  builder.addCase(initSubtitle, (state, action: PayloadAction<InitSubtitle>) => {
    state.subtitleList = action.payload.subtitleList
  })
  builder.addDefaultCase((state, action) => ({ ...initialState }));
});
