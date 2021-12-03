import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export enum NotificationType {
  error = "error",
  success = "success",
}

const initialState = {
  status: "",
  show: false,
  message: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<{
        message: string;
        notificationType: NotificationType;
      }>
    ) => {
      state.status = action.payload.notificationType;
      state.message = action.payload.message;
      state.show = true;
    },
    removeNotification: (state) => {
      state.status = "";
      state.message = "";
      state.show = false;
    },
  },
});

export const notificationMessage = (state: RootState) =>
  state.notification.message;
export const showNotification = (state: RootState) => state.notification.show;
export const notificationStatus = (state: RootState) =>
  state.notification.status;
const { actions, reducer } = notificationSlice;
export const { addNotification, removeNotification } = actions;
export default reducer;
