import useRefreshToken from "../../hooks/useRefreshToken";
import { useDispatch } from "react-redux";
import { setUser, updateToken } from "../../redux/actions/user";
import axios, { axiosJWT, axiosPrivate } from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Auth = () => {
  const User = useSelector((state) => state.userReducer.user);
  const refresh = useRefreshToken();
  const dispatch = useDispatch();
  useEffect(() => {
    if (User?._id) {
      hanldeUpdateUser(User?._id, User?.accessToken);
    }
  }, []);
  console.log(User);

  axiosJWT.interceptors.response.use(
    async (config) => {
      const decode = JSON.stringify(User?.accessToken);
      console.log(decode);
      const currentTime = new Date();
      if (decode?.exp < currentTime.getTime() / 1000) {
        const data = await refresh();
        config.headers["Authorization"] = `Bearer ${data?.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const hanldeUpdateUser = async (id, accessToken) => {
    const res = await axiosJWT.get(`/user/get-detail-user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(setUser({ ...res?.data, accessToken: accessToken }));
  };
};

export default Auth;
