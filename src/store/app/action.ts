import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { InitSubtitle } from "./model";

export const initSubtitle = createAction<InitSubtitle>("app/initSubtitle")

