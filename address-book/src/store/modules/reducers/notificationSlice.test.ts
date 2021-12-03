import { AnyAction } from "@reduxjs/toolkit";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import notificationReducer, {
  addNotification,
  NotificationType,
  removeNotification,
} from "./notificationSlice";

describe("Notification", () => {
  const mockStore = configureMockStore();
  let store: MockStoreEnhanced<unknown, {}>;
  const initialState = {
    status: "",
    show: false,
    message: "",
  };

  beforeEach(() => {
    store = mockStore({
      notification: initialState,
    });
  });

  describe("notification actions", () => {
    it("dispatches notification/addNotification action and returns data on success", async () => {
      await store.dispatch(
        addNotification({
          message: "Address Added",
          notificationType: NotificationType.success,
        })
      );
      const actions = store.getActions();
      expect(actions[0].type).toEqual("notification/addNotification");
      expect(actions[0].payload).toEqual({
        message: "Address Added",
        notificationType: "success",
      });
    });
    it("dispatches notification/removeNotification action and returns data on success", async () => {
      await store.dispatch(removeNotification());
      const actions = store.getActions();
      expect(actions[0].type).toEqual("notification/removeNotification");
      expect(actions[0].payload).toEqual(undefined);
    });
  });

  describe("notification reducer", () => {
    it("returns the initial state when an action type is not passed", async () => {
      const reducer = notificationReducer(undefined, {} as AnyAction);
      expect(reducer).toEqual(initialState);
    });

    it("handles notification/addNotification as expected", () => {
      const reducer = notificationReducer(initialState, {
        type: "notification/addNotification",
        payload: {
          message: "Address Added",
          notificationType: NotificationType.success,
        },
      });
      expect(reducer).toEqual({
        message: "Address Added",
        show: true,
        status: "success",
      });
    });

    it("handles notification/removeNotification as expected", () => {
      const reducer = notificationReducer(
        {
          message: "Address Added",
          show: true,
          status: "success",
        },
        {
          type: "notification/removeNotification",
        }
      );
      expect(reducer).toEqual(initialState);
    });
  });
});
