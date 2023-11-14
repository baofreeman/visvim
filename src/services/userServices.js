import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios, { axiosJWT, axiosPrivate } from "./axios";

const signup = async (data) => {
  const res = await axios.post("/user/signup", data);
  return res?.data;
};

const login = async (data) => {
  const res = await axios.post("/user/login", data, {
    withCredentials: true,
  });
  return res?.data;
};

const getUser = async (id, accessToken) => {
  const res = await axiosPrivate.get(`/user/get-detail-user/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res?.data;
};

const refresh = async () => {
  const res = await axios.get(`/refresh`, {
    withCredentials: true,
  });
  return res?.data;
};

const logout = async () => {
  const res = await axios.post(`/user/logout`);
  return res?.data;
};

export { signup, login, getUser, refresh, logout };
