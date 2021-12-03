import { AnyAction } from "@reduxjs/toolkit";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import apiService from "../services/apiService";
import phoneReducer, {
  setSuggestions,
  addWord,
  keyPressed,
  reset,
  deleteValue,
  getSuggestions,
  saveWord,
  saveNumbers,
  phoneState,
} from "./PhoneSlice";

describe("phone", () => {
  const mockStore = configureMockStore();
  let store: MockStoreEnhanced<unknown, {}>;
  const initialState: phoneState = {
    screenValues: "",
    suggestions: [],
    keypadValues: [],
    saveValue: false,
  };

  beforeEach(() => {
    store = mockStore({
      phone: initialState,
    });
  });

  describe("phone actions", () => {
    it("dispatches phone/setSuggestions action and returns", async () => {
      const suggestions = ["aw", "bb", "oo"];
      await store.dispatch(setSuggestions(suggestions));
      const actions = store.getActions();
      expect(actions[0].type).toEqual("phone/setSuggestions");
      expect(actions[0].payload).toEqual(suggestions);
    });

    it("dispatches phone/addWord action and returns", async () => {
      const word = "word";
      await store.dispatch(addWord(word));
      const actions = store.getActions();
      expect(actions[0].type).toEqual("phone/addWord");
      expect(actions[0].payload).toEqual(word);
    });
    it("dispatches phone/keyPressed action and returns", async () => {
      const key = "1";
      await store.dispatch(keyPressed(key));
      const actions = store.getActions();
      expect(actions[0].type).toEqual("phone/keyPressed");
      expect(actions[0].payload).toEqual(key);
    });

    it("dispatches phone/reset action and returns", async () => {
      await store.dispatch(reset());
      const actions = store.getActions();
      expect(actions[0].type).toEqual("phone/reset");
      expect(actions[0].payload).toEqual(undefined);
    });
    it("dispatches phone/deleteValue action and returns", async () => {
      await store.dispatch(deleteValue());
      const actions = store.getActions();
      expect(actions[0].type).toEqual("phone/deleteValue");
      expect(actions[0].payload).toEqual(undefined);
    });
  });

  describe("phone reducer", () => {
    it("returns the initial state when an action type is not passed", async () => {
      const reducer = phoneReducer(undefined, {} as AnyAction);
      expect(reducer).toEqual(initialState);
    });

    it("handles phone/getSuggestions as expected with less then 20 suggestions", async () => {
      const getConvertedNumbers = jest
        .spyOn(apiService, "getConvertedNumbers")
        .mockImplementation(() => Promise.resolve(["aa", "ab", "ac"]));
      const dispatch = jest.fn();
      await getSuggestions("22")(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        payload: ["aa", "ab", "ac"],
        type: "phone/setSuggestions",
      });
      expect(getConvertedNumbers).toBeCalled();
    });
    it("handles phone/getSuggestions as expected with more then 20 suggestions", async () => {
      const getConvertedNumbers = jest
        .spyOn(apiService, "getConvertedNumbers")
        .mockImplementation(() => Promise.resolve(Array(21).fill("result")));
      const dispatch = jest.fn();
      await getSuggestions("22")(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        payload: Array(10).fill("result"),
        type: "phone/setSuggestions",
      });
      expect(getConvertedNumbers).toBeCalled();
    });

    it("handles phone/saveWord as expected", async () => {
      const dispatch = jest.fn();
      await saveWord("hello")(dispatch);
      expect(dispatch.mock.calls[0][0]).toEqual({
        payload: "hello",
        type: "phone/addWord",
      });
      expect(dispatch.mock.calls[1][0]).toEqual({
        payload: undefined,
        type: "phone/reset",
      });
    });
    it("handles phone/saveNumbers as expected", async () => {
      const mockPhone = {
        phone: initialState,
      };
      const dispatch = jest.fn();
      const getState = jest.fn().mockImplementation(() => mockPhone);
      await saveNumbers("0")(dispatch, getState);
      expect(dispatch.mock.calls[0][0]).toEqual({
        payload: "0",
        type: "phone/keyPressed",
      });
    });
    it("handles phone/saveNumbers as expected for * key", async () => {
      const mockPhone = {
        phone: initialState,
      };
      const dispatch = jest.fn();
      const getState = jest.fn().mockImplementation(() => mockPhone);
      await saveNumbers("*")(dispatch, getState);
      expect(dispatch.mock.calls[0][0]).toEqual({
        payload: undefined,
        type: "phone/deleteValue",
      });
    });

    it("handles phone/setSuggestions as expected", () => {
      const reducer = phoneReducer(initialState, {
        type: "phone/setSuggestions",
        payload: ["aa", "ac", "ab", "bb"],
      });
      expect(reducer.suggestions).toEqual(["aa", "ac", "ab", "bb"]);
    });

    it("handles phone/addWord as expected", () => {
      const reducer = phoneReducer(initialState, {
        type: "phone/addWord",
        payload: "hello",
      });
      expect(reducer.screenValues).toEqual("hello");
      expect(reducer.suggestions).toEqual([]);
    });

    it("handles phone/reset as expected", () => {
      const newInitialState = { ...initialState };
      newInitialState.saveValue = true;
      newInitialState.keypadValues = ["8", "8", "2"];
      const reducer = phoneReducer(newInitialState, {
        type: "phone/reset",
        payload: undefined,
      });
      expect(reducer).toEqual(initialState);
    });

    it("handles phone/deleteValue as expected", () => {
      const newInitialState = { ...initialState };
      newInitialState.screenValues = "hello";
      const reducer = phoneReducer(newInitialState, {
        type: "phone/deleteValue",
        payload: undefined,
      });
      expect(reducer.screenValues).toEqual("hell");
    });

    it("handles phone/keyPressed as expected behaviour for * keypress", () => {
      const newInitialState = { ...initialState };
      newInitialState.keypadValues = ["8", "6", "2", "4"];
      const reducer = phoneReducer(newInitialState, {
        type: "phone/keyPressed",
        payload: "*",
      });
      expect(reducer.keypadValues).toEqual(["8", "6", "2"]);
    });
    it("handles phone/keyPressed as expected behaviour for # keypress", () => {
      const reducer = phoneReducer(initialState, {
        type: "phone/keyPressed",
        payload: "#",
      });
      expect(reducer.saveValue).toEqual(true);
    });
    it("handles phone/keyPressed as expected behaviour for 0 keypress", () => {
      const newInitialState = { ...initialState };
      newInitialState.keypadValues = ["8", "6", "2", "4"];
      const reducer = phoneReducer(newInitialState, {
        type: "phone/keyPressed",
        payload: "0",
      });
      expect(reducer.keypadValues).toEqual(["8", "6", "2", "4", " "]);
      expect(reducer.saveValue).toEqual(true);
    });

    it("handles phone/keyPressed as expected behaviour for any other keypress", () => {
      const reducer = phoneReducer(initialState, {
        type: "phone/keyPressed",
        payload: "3",
      });
      expect(reducer.keypadValues).toEqual(["3"]);
    });
  });
});
