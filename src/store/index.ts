import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { AppReducer } from './app/reducer'
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app']
}


const rootReducer = combineReducers({
  app: AppReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: import.meta.env.DEV
})


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export default store