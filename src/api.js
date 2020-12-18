import axios from "axios";

const apiPaths = {
  registration: '/users',
  auth: '/users/login',
  reqUser: '/user',
  getProfile: '/profiles/',
  getCreateArticles: '/articles',
}

const Error = {
  UNAUTHORIZED: 401
};

const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://conduit.productionready.io/api/`,
    timeout: 5000,
    withCredentials: true,
  });

  if (localStorage.getItem('user')) {
    api.defaults.headers.common['Authorization'] = `Token ${JSON.parse(localStorage.getItem('user')).token}`;
  }

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
