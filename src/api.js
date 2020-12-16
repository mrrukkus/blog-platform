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

class API {
  baseURL = `https://conduit.productionready.io/api`;

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };

    if (localStorage.getItem('user')) {
      headers.Authorization = `Token ${JSON.parse(localStorage.getItem('user').token)}`;
    }

    return headers;
  }

  async makeRequest(apiPath, method, options) {
    const url = this.baseURL + apiPath;
    const stringOptions = JSON.stringify(options);
    try {
      const response = await axios({
        method,
        url: url.toString(),
        data: stringOptions,
        headers: this.getHeaders(),
      });
      return response;
    } catch ({ response }) {
      throw response;
    }
  }

  registerUser(userData) {
    const options = {
      user: {
        username: userData.username,
        email: userData.email,
        password: userData.password
      }
    };
    return this.makeRequest(apiPaths.registration, 'post', options);
  }

  authUser(userData) {
    const options = {
      user: {
        email: userData.email,
        password: userData.password
      }
    };
    return this.makeRequest(apiPaths.auth, 'post', options);
  }

  getUser() {
    return this.makeRequest(apiPaths.auth, 'post');
  }

  updateUser(newData) {
    const options = {
      user: {
        email: newData.email,
        bio: newData.bio,
        image: newData.image
      }
    };
    return this.makeRequest(apiPaths.reqUser, 'put', options);
  }

  getProfile(username) {
    return this.makeRequest(apiPaths.getProfile + `${username}`, 'get');
  }

  getArticlesList() {
    return this.makeRequest(apiPaths.getCreateArticles, 'get');
  }

  getArticle(slug) {
    return this.makeRequest(apiPaths.getCreateArticles + `/${slug}`, 'get');
  }

  createArticle(newArticleData) {
    const options = {
      article: {
        title: newArticleData.title,
        description: newArticleData.description,
        body: newArticleData.body,
        tagList: newArticleData.body,
      }
    }

    return this.makeRequest(apiPaths.getCreateArticles, 'post', options);
  }

  updateArticle(newData, slug) {
    const options = {
      article: {
        title: newData.title,
        description: newData.description,
        body: newData.body,
        tagList: newData.body,
      }
    };

    return this.makeRequest(apiPaths.getCreateArticles + `/${slug}`, 'put', options);
  }

  deleteArticle(slug) {
    return this.makeRequest(apiPaths.getCreateArticles + `/${slug}`, 'delete');
  }

  likeArticle(slug) {
    return this.makeRequest(apiPaths.getCreateArticles + `/${slug}/favorite`, 'post');
  }

  dislikeArticle(slug) {
    return this.makeRequest(apiPaths.getCreateArticles + `/${slug}/favorite`, 'delete');
  }
}

const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://conduit.productionready.io/api/`,
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

export default new API();
