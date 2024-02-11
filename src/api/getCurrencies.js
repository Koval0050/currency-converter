import axios from 'axios';
import { API_URL_EXCHANGE } from 'constants/apiUrl';

export const getCurrencies = async () => {
  const data = await axios.get(API_URL_EXCHANGE);
  return data;
};
