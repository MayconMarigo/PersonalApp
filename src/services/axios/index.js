import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

axios.interceptors.request.use(async (req) => {
  let token = await AsyncStorage.getItem("@AppPersonal-token");
  if (token) {
    req.headers = {
      authorization: `Bearer ${token}`,
    };
  }
  return req;
});
