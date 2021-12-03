import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import apiService from "../services/apiService";

export interface phoneState {
  screenValues: string;
  suggestions: string[];
  keypadValues: string[];
  saveValue: boolean;
}

const initialState: phoneState = {
  screenValues: "",
  suggestions: [],
  keypadValues: [],
  saveValue: false,
};

const slice = createSlice({
  name: "phone",
  initialState,
  reducers: {
    setSuggestions(
      state: phoneState,
      { payload: suggestions }: PayloadAction<string[]>
    ) {
      state.suggestions = suggestions;
    },

    addWord(state: phoneState, { payload: word }: PayloadAction<string>) {
      state.screenValues = state.screenValues + word;
      state.suggestions = [];
    },

    keyPressed(state: phoneState, { payload: key }: PayloadAction<string>) {
      if (key === "*") {
        state.keypadValues = state.keypadValues.slice(0, -1);
      } else if (key === "#") {
        state.saveValue = !state.saveValue;
      } else if (key === "0") {
        state.keypadValues = [...state.keypadValues, " "];
        state.saveValue = !state.saveValue;
      } else {
        state.keypadValues = [...state.keypadValues, key];
      }
    },

    reset(state: phoneState) {
      state.keypadValues = initialState.keypadValues;
      state.saveValue = initialState.saveValue;
    },

    deleteValue(state: phoneState) {
      const values = state.screenValues;
      state.screenValues = values.slice(0, -1);
    },
  },
});

export const currentScreenValues = (state: RootState) =>
  state.phone.screenValues;
export const currentSuggestions = (state: RootState) => state.phone.suggestions;
export const currentKeypadValues = (state: RootState) =>
  state.phone.keypadValues;
export const currentSaveValue = (state: RootState) => state.phone.saveValue;
const { actions, reducer } = slice;
export const { setSuggestions, addWord, keyPressed, reset, deleteValue } =
  actions;

export const getSuggestions =
  (numbers: string) =>
  async (dispatch: (arg0: { payload: string[]; type: string }) => void) => {
    try {
      const suggestions = await apiService.getConvertedNumbers(numbers);
      if (suggestions.length > 20) {
        dispatch(setSuggestions(suggestions.slice(0, 10)));
        return;
      }
      dispatch(setSuggestions(suggestions));
    } catch (error) {
      const { message } = error as Error;
      return console.error(message);
    }
  };

export const saveWord =
  (word: string) =>
  (dispatch: (arg0: { payload: string | undefined; type: string }) => void) => {
    dispatch(addWord(word));
    dispatch(reset());
  };

export const saveNumbers =
  (number: string) =>
  (
    dispatch: (arg0: { payload: string | undefined; type: string }) => void,
    getState: () => RootState
  ) => {
    if (currentKeypadValues(getState()).length < 1 && number === "*") {
      dispatch(deleteValue());
    }
    dispatch(keyPressed(number));
  };

export default reducer;
