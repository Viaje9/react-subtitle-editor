import { configureStore } from '@reduxjs/toolkit'
import { AppReducer } from './app/reducer'

export const store = configureStore({
  reducer: {
    app: AppReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.DEV
})