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
import storage from "./storage";
import { baseApi } from "./api/baseApi";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  theme: themeSliceReducer,
  menu: menuSliceReducer,
  auth: authSliceReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });

export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;
export const persistor = persistStore(makeStore);
