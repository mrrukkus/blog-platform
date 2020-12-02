import {extend} from "../../utils.js";

const initialState = {
  articlesCountToShow: 5,
  contacts: [],
};

const ActionType = {
  GET_ARTICLES_COUNT: `GET_ARTICLES_COUNT`,
  LOAD_ARTICLES: `LOAD_ARTICLES`,
};

const ActionCreator = {
  getArticlesCount: (count) => {
    return {
      type: ActionType.GET_ARTICLES_COUNT,
      payload: count
    }
  },
  loadArticles: (data) => {
    return {
      type: ActionType.LOAD_ARTICLES,
      payload: data
    }
  },
};

const Operation = {
  getArticlesCount: () => (dispatch, getState, api) => {
    return api.get(`/articles`)
      .then((response) => {
        dispatch(ActionCreator.loadContacts(response.data));
      });
  },
  loadArticles: (currentPage) => (dispatch, getState, api) => {
    const { articlesCountToShow } = getState();
    const articlesCountToOffset = (currentPage - 1) * articlesCountToShow;

    return api.get(`/articles?offset=${articlesCountToOffset}`)
      .then((response) => {
        dispatch(ActionCreator.loadContacts(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ARTICLES_COUNT:
      return extend(state, {
        articlesCount: action.payload
      });
    case ActionType.LOAD_ARTICLES:
      return extend(state, {
        articles: action.payload
      });
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
