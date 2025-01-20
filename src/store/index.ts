import { configureStore } from "@reduxjs/toolkit";
import catsSlice from "./catsSlice";
import renderSlice from "./renderSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    cats: catsSlice,
    render: renderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppRootState: TypedUseSelectorHook<RootState> = useSelector;
