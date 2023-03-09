import { createAction } from "@reduxjs/toolkit";
import { InitSubtitle } from "./model";

export const initSubtitle = createAction<InitSubtitle>("app/initSubtitle")
export const setVideoHeight = createAction<number>("app/setVideoHeight")
export const setCurrentTime = createAction<string>("app/setCurrentTime")

