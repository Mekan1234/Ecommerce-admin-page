import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async (data) => {
  const response = await axios.get(`${base_url}user/get-all-orders`, data);
  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/get-order/${id}`,
    config
  );
  return response.data;
};
const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/update-order/${data.id}`,{status:data.status},
    config
  );
  return response.data;
};

const getMonthlyOrder = async (data) => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    data
  );
  return response.data;
};
const getYearlyStats = async (data) => {
  const response = await axios.get(`${base_url}user/getYearlyOrders`, data);
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrder,
  getYearlyStats,
  updateOrder,
};

export default authService;
