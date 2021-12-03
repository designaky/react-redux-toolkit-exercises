import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

const apiService = {
  getConvertedNumbers: async (numbers: string): Promise<string[]> => {
    if (!numbers || /\s/g.test(numbers)) return [];
    try {
      const response = await api.get(`/convert/${numbers}`);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
