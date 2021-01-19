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

export {reducer, ActionType, ActionCreator};
