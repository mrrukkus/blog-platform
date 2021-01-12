const initialState = {
  currentPageNumber: 1,
  isLoading: true,
  isSuccess: null
};

const ActionType = {
  SET_CURRENT_PAGE_NUMBER: `SET_CONTACT_SEARCH_VALUE`,
  SET_IS_SUCCESS: `SET_IS_SUCCESS`
};

const ActionCreator = {
  setCurrentPage: (pageNumber) => ({
    type: ActionType.SET_CURRENT_PAGE_NUMBER,
    payload: pageNumber,
  }),
  setSuccess: (status) => ({
    type: ActionType.SET_IS_SUCCESS,
    payload: status
  })
};

const Operation = {
  addNewArticle: (article) => (dispatch, getState, api) => api.post(`/articles`, {
      "article": article
    }).then(() => {
        dispatch(ActionCreator.setSuccess(true));
    }).catch((err) => {
        dispatch(ActionCreator.setSuccess(false));
        throw err;
    }),
  deleteArticle: (article) => (dispatch, getState, api) => api.delete(`/articles/${article.slug}`)
      .then(() => {
        dispatch(ActionCreator.setSuccess(true));
      }).catch((err) => {
        dispatch(ActionCreator.setSuccess(false));
        throw err;
    }),
  putEditedArticle: (article, slug) => (dispatch, getState, api) => api.put(`/articles/${slug}`, {
      "article": article
    })
      .then(() => {
        dispatch(ActionCreator.setSuccess(true));
      }).catch((err) => {
        dispatch(ActionCreator.setSuccess(false));
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_PAGE_NUMBER:
      return {
        ...state,
        currentPageNumber: action.payload
      };
    case ActionType.SET_IS_SUCCESS:
      return {
        ...state,
        isSuccess: action.payload
      };
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};

