import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "@/lib/features/ui/uiSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "@/lib/features/api/api";

const rootReducer = combineReducers({
  ui: uiReducer,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ui", "auth", "api"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
