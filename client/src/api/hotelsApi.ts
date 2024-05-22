import axios from "axios";

const API_URL = '/api/v1/search/hotels';

export const handleSearch = async (query: any) => {
  try {
    const response = await axios.post(API_URL, { query });
    console.log('Search initiated:', response.data);
  } catch (error) {
    console.error('Error searching:', error);
  }
};
