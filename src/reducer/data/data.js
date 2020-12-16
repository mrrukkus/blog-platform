import {extend} from "../../utils.js";

const initialState = {
  articlesCountToShow: 20,
  articles: [],
  isLoading: true
};

const ActionType = {
  SET_PAGES_COUNT: `SET_PAGES_COUNT`,
  LOAD_ARTICLES: `LOAD_ARTICLES`,
  SET_LOADING_STATUS: `SET_LOADING_STATUS`,
  LOAD_ARTICLE_DETAILS: `LOAD_ARTICLE_DETAILS`,
};

const ActionCreator = {
  setPagesCount: (count) => {
    return {
      type: ActionType.SET_PAGES_COUNT,
      payload: count
    }
  },
  loadArticles: (data) => {
    return {
      type: ActionType.LOAD_ARTICLES,
      payload: data
    }
  },
  setLoadingStatus: (status) => {
    return {
      type: ActionType.SET_LOADING_STATUS,
      payload: status
    }
  },
  loadArticleDetails: (article) => {
    return {
      type: ActionType.LOAD_ARTICLE_DETAILS,
      payload: article
    }
  }
};

const Operation = {
  getPagesCount: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.setLoadingStatus(true));

    return api.get(`/articles`)
      .then((response) => {
        const data = response.data;
        const {articlesCountToShow} = getState().DATA;

        dispatch(ActionCreator.setPagesCount(data.articlesCount / articlesCountToShow));
        dispatch(ActionCreator.setLoadingStatus(false));
      });
  },
  loadArticles: (currentPage) => (dispatch, getState, api) => {
    const { articlesCountToShow } = getState().DATA;
    const articlesCountToOffset = (currentPage - 1) * articlesCountToShow;
    console.log(articlesCountToOffset);
    dispatch(ActionCreator.setLoadingStatus(true));

    return api.get(`/articles?offset=${articlesCountToOffset}`)
      .then((response) => {
        console.log('a');
        dispatch(ActionCreator.loadArticles(response.data.articles));
        dispatch(ActionCreator.setLoadingStatus(false));
      });
  },
  loadArticleDetails: (slug) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setLoadingStatus(true));

    return api.get(`/articles/${slug}`)
      .then((response) => {
        dispatch(ActionCreator.loadArticleDetails(response.data.article));
        dispatch(ActionCreator.setLoadingStatus(false));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_PAGES_COUNT:
      return extend(state, {
        pagesCount: action.payload,
      });
    case ActionType.LOAD_ARTICLES:
      return extend(state, {
        articles: action.payload
      });
    case ActionType.SET_LOADING_STATUS:
      return extend(state, {
        isLoading: action.payload
      });
    case ActionType.LOAD_ARTICLE_DETAILS:
      return extend(state, {
        articleDetails: action.payload
      });
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
