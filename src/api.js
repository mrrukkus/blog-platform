import axios from "axios";
import { localStorageActions } from './routes';
import { ActionCreator as ArticleActionCreator } from './reducer/articles/articles';
import { ActionCreator as DataActionCreator } from './reducer/data/data';
import { ActionCreator as UserActionCreator } from './reducer/user/user';

const ARTICLES_COUNT_TO_SHOW = 20;


const ArticlesApiRequests = {
  addNewArticle: (article) => (dispatch, getState, api) => api.post(`/articles`, {
      "article": article
    }).then(() => {
        dispatch(ArticleActionCreator.setSuccess(true));
    }).catch((err) => {
        dispatch(ArticleActionCreator.setSuccess(false));
        throw err;
    }),
  deleteArticle: (article) => (dispatch, getState, api) => api.delete(`/articles/${article.slug}`)
      .then(() => {
        dispatch(ArticleActionCreator.setSuccess(true));
      }).catch((err) => {
        dispatch(ArticleActionCreator.setSuccess(false));
        throw err;
    }),
  putEditedArticle: (article, slug) => (dispatch, getState, api) => api.put(`/articles/${slug}`, {
      "article": article
    })
      .then(() => {
        dispatch(ArticleActionCreator.setSuccess(true));
        dispatch(ArticleActionCreator.setIsLoading(false));
      }).catch((err) => {
        dispatch(ArticleActionCreator.setIsLoading(false));
        dispatch(ArticleActionCreator.setSuccess(false));
        throw err;
      }),
  likeArticle: (slug) => (dispatch, getState, api) => api.post(`articles/${slug}/favorite`)
      .catch((err) => {
        throw err;
      }),
  dislikeArticle: (slug) => (dispatch, getState, api) => api.delete(`articles/${slug}/favorite`)
      .catch((err) => {
        throw err;
      })
};


const DataApiRequests = {
  getPagesCount: () => (dispatch, getState, api) => {
    dispatch(DataActionCreator.setLoadingStatus(true));

    return api.get(`/articles`)
      .then((response) => {
        const { data } = response;
        dispatch(DataActionCreator.setPagesCount(data.articlesCount));
      })
      .catch((err) => {
        throw err;
      });
  },
  loadArticles: (currentPage) => (dispatch, getState, api) => {
    const articlesCountToOffset = (currentPage - 1) * ARTICLES_COUNT_TO_SHOW;
    dispatch(DataActionCreator.loadArticles(null));

    return api.get(`/articles?offset=${articlesCountToOffset}`)
      .then((response) => {
        dispatch(DataActionCreator.loadArticles(response.data.articles));
      })
      .catch((err) => {
        throw err;
      });
  },
  loadArticleDetails: (slug) => (dispatch, getState, api) => {
    dispatch(DataActionCreator.setLoadingStatus(true));

    return api.get(`/articles/${slug}`)
      .then((response) => {
        dispatch(DataActionCreator.loadArticleDetails(response.data.article));
      })
      .catch((err) => {
        dispatch(DataActionCreator.setFetchError(true));
        throw err;
      });
  },
};


const UserApiRequests = {
  checkAuthorizationStatus: () => async (dispatch, getState, api) => api.get(`/user`)
      .then((response) => {
        dispatch(UserActionCreator.requireAuthorization(true, response.data.user));
      })
      .catch((err) => {
        throw err;
      }),
  login: (authData) => (dispatch, getState, api) =>
    api.post(`/users/login`, {
      "user": {
        "email": authData.email,
        "password": authData.password
      }
    })
      .then(({ data }) => {
       // eslint-disable-next-line no-param-reassign
       api.defaults.headers.common.Authorization = `Token ${data.user.token}`;
        dispatch(UserActionCreator.requireAuthorization(true, data.user));
        dispatch(UserActionCreator.setErrors(null));
        dispatch(UserActionCreator.setIsLoading(false));
        localStorageActions.setUser(JSON.stringify({ ...data.user }).toString());
      })
      .catch(({response}) => {
        dispatch(UserActionCreator.setIsLoading(false));
        dispatch(UserActionCreator.setErrors(response.data.errors));
      }),
  register: (registrationData) => (dispatch, getState, api) =>
    api.post(`/users`, {
      "user": {
        "username": registrationData.username,
        "email": registrationData.email,
        "password": registrationData.password
      }
    })
      .then(() => {
        dispatch(UserActionCreator.setIsLoading(false));
        dispatch(UserActionCreator.setErrors(null));
        dispatch(UserActionCreator.setSuccess(true));
      })
      .catch(({response}) => {
        dispatch(UserActionCreator.setIsLoading(false));
        dispatch(UserActionCreator.setErrors(response.data.errors));
      }),
  editProfile: (newData) => (dispatch, getState, api) =>
    api.put(`/user`, {
      "user": {
        "username": newData.username,
        "email": newData.email,
        "password": newData.password,
        "image": newData.image
      }
    }).then(({data}) => {
      localStorageActions.setUser(
        JSON.stringify({ email: data.user.email, password: newData.password, token: data.user.token }).toString()
      );
      dispatch(UserActionCreator.setCurrentUser(data.user));
      dispatch(UserActionCreator.setIsLoading(false));
    }).catch((err) => {
      dispatch(UserActionCreator.setIsLoading(false));
      throw err;
    })
};


const api = axios.create({
  baseURL: `https://conduit.productionready.io/api/`,
  timeout: 5000,
  withCredentials: true,
});

export default api;
export { ARTICLES_COUNT_TO_SHOW, ArticlesApiRequests,DataApiRequests, UserApiRequests };
