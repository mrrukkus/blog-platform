const ARTICLES_COUNT_TO_SHOW = 20;

const initialState = {
  articles: null,
  isLoading: true,
  articleDetails: null,
  fetchError: false
};

const ActionType = {
  SET_PAGES_COUNT: `SET_PAGES_COUNT`,
  LOAD_ARTICLES: `LOAD_ARTICLES`,
  SET_LOADING_STATUS: `SET_LOADING_STATUS`,
  LOAD_ARTICLE_DETAILS: `LOAD_ARTICLE_DETAILS`,
  SET_FETCH_STATUS: `SET_FETCH_STATUS`
};

const ActionCreator = {
  setPagesCount: (count) => ({
      type: ActionType.SET_PAGES_COUNT,
      payload: count
    }),
  loadArticles: (data) => ({
      type: ActionType.LOAD_ARTICLES,
      payload: data
    }),
  setLoadingStatus: (status) => ({
      type: ActionType.SET_LOADING_STATUS,
      payload: status
    }),
  loadArticleDetails: (article) => ({
      type: ActionType.LOAD_ARTICLE_DETAILS,
      payload: article
    }),
  setFetchError: (status) => ({
      type: ActionType.SET_FETCH_STATUS,
      payload: status
    })
};

const Operation = {
  getPagesCount: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.setLoadingStatus(true));

    return api.get(`/articles`)
      .then((response) => {
        const { data } = response;
        dispatch(ActionCreator.setPagesCount(data.articlesCount));
      })
      .catch((err) => {
        throw err;
      });
  },
  loadArticles: (currentPage) => (dispatch, getState, api) => {
    const articlesCountToOffset = (currentPage - 1) * ARTICLES_COUNT_TO_SHOW;
    dispatch(ActionCreator.loadArticles(null));

    return api.get(`/articles?offset=${articlesCountToOffset}`)
      .then((response) => {
        dispatch(ActionCreator.loadArticles(response.data.articles));
      })
      .catch((err) => {
        throw err;
      });
  },
  loadArticleDetails: (slug) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setLoadingStatus(true));

    return api.get(`/articles/${slug}`)
      .then((response) => {
        dispatch(ActionCreator.loadArticleDetails(response.data.article));
      })
      .catch((err) => {
        dispatch(ActionCreator.setFetchError(true));
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_PAGES_COUNT:
      return {
        ...state,
        articlesCount: action.payload,
        isLoading: false
      }
    case ActionType.LOAD_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        isLoading: false
      };
    case ActionType.SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload
      };
    case ActionType.LOAD_ARTICLE_DETAILS:
      return {
        ...state,
        articleDetails: action.payload,
        isLoading: false
      };
    case ActionType.SET_FETCH_STATUS:
      return {
        ...state,
        fetchError: action.payload
      }
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation, ARTICLES_COUNT_TO_SHOW};
