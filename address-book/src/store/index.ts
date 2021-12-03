import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import addressListReducer from "./modules/reducers/addressListSlice";
import notificationReducer from "./modules/reducers/notificationSlice";

const store = configureStore({
  reducer: {
    addressList: addressListReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
