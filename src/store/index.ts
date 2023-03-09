import { configureStore } from '@reduxjs/toolkit'
import { AppReducer } from './app/reducer'

const store = configureStore({
  reducer: {
    app: AppReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.DEV
})

export type RootState = ReturnType<typeof store.getState>

export default store