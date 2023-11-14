import { useDispatch } from "react-redux";
import axios from "../services/axios";
import { setUser } from "../redux/actions/user";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    console.log(response?.data?.accessToken);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
