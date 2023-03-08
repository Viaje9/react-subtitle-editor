import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const AppReducer = createReducer(initialState, (builder) => {
  builder.addDefaultCase((state, action) => ({ ...initialState }));
});
