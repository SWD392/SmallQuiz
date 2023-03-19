import axios from "axios";
import axiosInstance from "../api/axiosInstance";


const baseUrl = "http://localhost:8081";

const api = axios.create({
  baseUrl,
});

export const getInfoUser = async (username) => {
  const data = {
    username,
  };
  try {
    const response = await api.post(baseUrl + "/info", data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await api.post(baseUrl + "/authenticate", { username, password });
    const { jwttoken: token, role, userId: userid } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userid", userid);
    return { token, role, userid };
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getTestQuestions = async () => {
  try {
    const response = await api.get(baseUrl + "/loadTest");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getResult = async (userId, data) => {
  try {
    const response = await axiosInstance.post(`/getResult?userId=${userId}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTestHistory = async (userid) => {
  try {
    const response = await axiosInstance.get(`/getTest?userId=${userid}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};