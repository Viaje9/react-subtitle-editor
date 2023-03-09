import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { InitSubtitle } from "./model";

export const initSubtitle = createAction<InitSubtitle>("app/initSubtitle")
export const setVideoHeight = createAction<number>("app/setVideoHeight")

