import {extend} from "../../utils.js";

const initialState = {
  articlesCountToShow: 20,
  contacts: [],
  isLoading: true
};

const ActionType = {
  SET_PAGES_COUNT: `SET_PAGES_COUNT`,
  LOAD_ARTICLES: `LOAD_ARTICLES`,
  SET_LOADING_STATUS: `SET_LOADING_STATUS`
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
};

const Operation = {
  getPagesCount: () => (dispatch, getState, api) => {
    return api.get(`/articles`)
      .then((response) => {
        const data = response.data;
        const {articlesCountToShow} = getState().DATA;

        dispatch(ActionCreator.setPagesCount(data.articlesCount / articlesCountToShow));
        dispatch(ActionCreator.setLoadingStatus(false));
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
    case ActionType.SET_PAGES_COUNT:
      return extend(state, {
        pagesCount: action.payload
      });
    case ActionType.LOAD_ARTICLES:
      return extend(state, {
        articles: action.payload
      });
    case ActionType.SET_LOADING_STATUS:
      return extend(state, {
        isLoading: action.payload
      });
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
