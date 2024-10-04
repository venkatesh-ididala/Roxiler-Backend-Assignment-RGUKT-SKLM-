import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


export const getTransactions = async (month, search = '', page = 1, perPage = 10) => {
  const response = await axios.get(`${API_BASE_URL}/transactions`, {
    params: { month, search, page, perPage }
  });
  return response.data;
};

export const getStatistics = async (month) => {
  try {
    
    const response = await axios.get(`${API_BASE_URL}/transactions/statistics`, { params: { month } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw new Error('Failed to fetch statistics');
  }
};


export const getBarChartData = async (month) => {
  try {
    
    const response = await axios.get(`${API_BASE_URL}/transactions/bar-chart`, { params: { month } });
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching bar chart data', error.response.data);
    throw new Error('Failed fetching bar chart data');
  }
};


