import { Subtitle } from "@/models/subtitle";
import { createAction } from "@reduxjs/toolkit";
import { InitSubtitle } from "./model";

export const initSubtitle = createAction<InitSubtitle>("app/initSubtitle")
export const setVideoHeight = createAction<number>("app/setVideoHeight")
export const setCurrentTime = createAction<string>("app/setCurrentTime")
export const setCurrentSubtitle = createAction<Subtitle>("app/Subtitle")
export const editorSubtitle = createAction<Subtitle>("app/editorSubtitle")
export const setPlayed = createAction<boolean>("app/setPlayed")
export const setEditable = createAction<boolean>("app/setEditable")

