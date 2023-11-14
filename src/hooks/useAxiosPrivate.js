import { axiosPrivate } from "../services/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/actions/user";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const dispatch = useDispatch();
  const Token = useSelector((state) => state.userReducer.token);
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${Token}`;
        }
        return config;
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      async (response) => {
        console.log(response);
        const newAccessToken = await refresh();
        dispatch(setToken({ token: newAccessToken }));
        console.log(Token);
        response.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return response?.data;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [Token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
