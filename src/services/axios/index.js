import axios from "axios";

export const useInterceptors = () => {
  axios.interceptors.request.use((req) => {
    if (req && req.headers) {
      // req.headers["Access-Control-Allow-Origin"] = "*";
      // req.headers["Content-type"] = "application/x-www-form-urlencoded";
      // req.headers["Access-Control-Allow-Credentials"] = true;
      // req.headers["Access-Control-Allow-Methods"] = "GET,HEAD,OPTIONS,POST,PUT";
      // req.headers["Access-Control-Allow-Headers"] =
      //   "Origin, X-Requested-With, Content-Type, Accept, Authorization";
    }
    return req;
  });
};
