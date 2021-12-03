import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Address } from "../../../models/address";
import localStorageService from "../../../services/localStorageService";

const initialState: { value: Address[] } = {
  value: localStorageService.getItems<Address>("addressList"),
};

export const addressListSlice = createSlice({
  name: "addressList",
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state.value = [action.payload, ...state.value];
      localStorageService.saveItem("addressList", action.payload);
    },
    removeAddress: (state, action: PayloadAction<Address>) => {
      const { uid } = action.payload;
      state.value = state.value.filter((address) => address.uid !== uid);
      localStorageService.replaceElement("addressList", state.value);
    },
  },
});

export const selectAddressList = (state: RootState) => state.addressList.value;
const { actions, reducer } = addressListSlice;
export const { addAddress, removeAddress } = actions;
export default reducer;
