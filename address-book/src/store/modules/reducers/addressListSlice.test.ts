import { AnyAction } from "@reduxjs/toolkit";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import { addressList } from "../../../helpers/mocks";
import localStorageService from "../../../services/localStorageService";
import addressListReducer, {
  addAddress,
  removeAddress,
} from "./addressListSlice";

describe("addressList", () => {
  const mockStore = configureMockStore();
  let store: MockStoreEnhanced<unknown, {}>;
  const initialState = {
    value: [],
  };

  beforeEach(() => {
    store = mockStore({
      addressList: initialState,
    });
  });

  describe("addressList actions", () => {
    it("dispatches addressList/addAddress action and returns data on success", async () => {
      await store.dispatch(addAddress(addressList[0]));
      const actions = store.getActions();
      expect(actions[0].type).toEqual("addressList/addAddress");
      expect(actions[0].payload).toEqual(addressList[0]);
    });
    it("dispatches addressList/removeAddress action and returns data on success", async () => {
      await store.dispatch(removeAddress(addressList[0]));
      const actions = store.getActions();
      expect(actions[0].type).toEqual("addressList/removeAddress");
      expect(actions[0].payload).toEqual(addressList[0]);
    });
  });

  describe("addressList reducer", () => {
    it("returns the initial state when an action type is not passed", async () => {
      const reducer = addressListReducer(undefined, {} as AnyAction);
      expect(reducer).toEqual(initialState);
    });

    it("handles addressList/addAddress as expected", () => {
      const saveItem = jest
        .spyOn(localStorageService, "saveItem")
        .mockImplementation(jest.fn());
      const reducer = addressListReducer(initialState, {
        type: "addressList/addAddress",
        payload: addressList[0],
      });
      expect(reducer).toEqual({ value: [addressList[0]] });
      expect(saveItem).toBeCalled();
    });

    it("handles addressList/removeAddress as expected", () => {
      const replaceElement = jest
        .spyOn(localStorageService, "replaceElement")
        .mockImplementation(jest.fn());
      const reducer = addressListReducer(
        {
          value: addressList,
        },
        {
          type: "addressList/removeAddress",
          payload: addressList[0],
        }
      );
      expect(reducer).toEqual({
        value: addressList.splice(1, 2),
      });
      expect(replaceElement).toBeCalled();
    });
  });
});
