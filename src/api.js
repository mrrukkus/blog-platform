import axios from "axios";

const Error = {
  UNAUTHORIZED: 401
};

const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `http://localhost:3000/`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
