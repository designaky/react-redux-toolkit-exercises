import axios from "axios";
import { Address, ApiAutoCompleteAddress } from "../models/address";
import { v4 as uuidv4 } from "uuid";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const addressService = {
  getAddressByPostCode: async (postcode: string): Promise<Address[]> => {
    if (postcode.length < 1) return [];
    try {
      const response = await api.get(
        `find/${postcode.trim()}?api-key=${
          process.env.REACT_APP_API_KEY
        }&expand=true&fuzzy=true`
      );
      const addressLit: Address[] = response.data.addresses.map(
        (address: Address) => {
          address.uid = uuidv4();
          return address;
        }
      );
      return addressLit;
    } catch (error) {
      throw error;
    }
  },

  getAddressByAutoComplete: async (
    term: string
  ): Promise<ApiAutoCompleteAddress[]> => {
    if (term.length < 3) return [];
    try {
      const response = await api.get(
        `/autocomplete/${term}?api-key=${process.env.REACT_APP_API_KEY}`
      );
      return response.data.suggestions;
    } catch (error) {
      throw error;
    }
  },

  getAddressById: async (addressId: string): Promise<Address> => {
    try {
      const response = await api.get(
        `/get/${addressId}?api-key=${process.env.REACT_APP_API_KEY}`
      );
      response.data.uid = uuidv4();
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  formatAddress: (
    line_1: string,
    line_2: string,
    line_3: string,
    postcode: string,
    country: string,
    town_or_city: string
  ): Address => {
    const formatted_address = [line_1, line_2, line_3];
    const uid = uuidv4();

    return {
      postcode,
      town_or_city,
      country,
      line_1,
      line_2,
      line_3,
      formatted_address,
      uid,
    };
  },
};

export default addressService;
