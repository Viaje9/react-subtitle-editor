import { SubtitleInfo } from "@/models/subtitle";
import { createAction } from "@reduxjs/toolkit";
import { FontInfo, InitSubtitle, onClickPlayInfo, StartTime } from "./model";

export const initSubtitle = createAction<InitSubtitle>("app/initSubtitle")
export const setVideoHeight = createAction<number>("app/setVideoHeight")
export const setCurrentTime = createAction<string>("app/setCurrentTime")
export const setCurrentSubtitle = createAction<SubtitleInfo>("app/Subtitle")
export const editorSubtitle = createAction<SubtitleInfo>("app/editorSubtitle")
export const setPlayed = createAction<boolean>("app/setPlayed")
export const setEditable = createAction<boolean>("app/setEditable")
export const addEmptySubtitle = createAction<StartTime>("app/addEmptySubtitle")
export const removeSubtitle = createAction<number>("app/removeSubtitle")
export const onClickPlay = createAction<onClickPlayInfo>("app/onClickPlay")
export const changeSubtitleInfoEditable = createAction<SubtitleInfo>("app/changeSubtitleInfoEditable")
export const editorFontInfo = createAction<FontInfo>("app/editorFontInfo")

