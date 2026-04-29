import { configureStore } from "@reduxjs/toolkit";
import buildReducer from "./slices/buildSlice";
import itemsReducer from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    build: buildReducer,
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;