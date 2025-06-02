import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "@/lib/theme/themeSlice";
import menuSliceReducer from "@/lib/menu/menuSlice";
import authSliceReducer from "@/lib/auth/authSlice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { baseApi } from "./api/baseApi";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Create noop storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string): Promise<string> {
      return Promise.resolve(value);
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};

// Create storage that works on both server and client
const storage = typeof window !== "undefined" 
  ? createWebStorage("local") 
  : createNoopStorage();

const persistConfig = {
  key: "root",
  storage, 
 
  whitelist: ['theme','menu', 'auth'], 
};

const rootReducer = combineReducers({
  theme: themeSliceReducer,
  menu: menuSliceReducer,
  auth: authSliceReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Create store instance
export const store = makeStore();
export const persistor = persistStore(store);