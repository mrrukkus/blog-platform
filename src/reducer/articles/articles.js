import {extend} from "../../utils.js";
import {Operation as DataOperation} from "../data/data";

const initialState = {
  currentPageNumber: 1,
  articleToEdit: null,
};

const ActionType = {
  SET_ARTICLE_EDIT: `SET_ARTICLE_EDIT`,
  SET_CURRENT_PAGE_NUMBER: `SET_CONTACT_SEARCH_VALUE`
};

const ActionCreator = {
  setEditArticle: (articleId) => ({
    type: ActionType.SET_ARTICLE_EDIT,
    payload: articleId,
  }),
  setCurrentPage: (pageNumber) => ({
    type: ActionType.SET_CURRENT_PAGE_NUMBER,
    payload: pageNumber,
  }),
};

const Operation = {
  addNewArticle: (article) => (dispatch, getState, api) => {
    return api.post(`/articles`, {
      "article": article
    })
      .then(() => {
        // const { currentPageNumber } = getState();

        // dispatch(DataOperation.loadArticles(currentPageNumber));
        alert(`Контакт успешно создан`);
      })
      .catch((err) => {
        alert(`Возникла ошибка при отправке`, err);
      });
  },
  deleteArticle: (article) => (dispatch, getState, api) => {
    return api.delete(`/articles/${article.slug}`)
      .then((result) => {
        // const { currentPageNumber } = getState();

        // dispatch(DataOperation.loadContacts(currentPageNumber));
        alert(`Контакт успешно удален`, result);
      }).catch((err) => {
        alert(`Возникла ошибка при удалении статьи`);
        throw err;
      });
  },
  putEditedArticle: (article, slug) => (dispatch, getState, api) => {
    return api.put(`/articles/${slug}`, {
      "article": article
    })
      .then(() => {
        const { currentPageNumber } = getState();

        // dispatch(DataOperation.loadContacts(currentPageNumber))
        alert(`Контакт успешно сохранен`);
      }).catch((err) => {
        alert(`Возникла ошибка при изменении статьи`);
        throw err;
      });
  },
  likeArticle: (slug) => (dispatch, getState, api) => {
    return api.post(`articles/${slug}/favorite`)
      .then((result) => {
        alert('liked!', result);
      })
      .catch((err) => {
        throw err;
      })
  },
  dislikeArticle: (slug) => (dispatch, getState, api) => {
    return api.delete(`articles/${slug}/favorite`)
      .then((result) => {
        alert('disliked!', result);
      })
      .catch((err) => {
        throw err;
      })
  }

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ARTICLE_EDIT:
      return extend(state, {
        articleToEdit: action.payload
      });
    case ActionType.SET_CURRENT_PAGE_NUMBER:
      return extend(state, {
        currentPageNumber: action.payload
      });
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
