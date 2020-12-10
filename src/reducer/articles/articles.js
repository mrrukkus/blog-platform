import {extend} from "../../utils.js";
import {Operation as DataOperation} from "../data/data";

const initialState = {
  currentPageNumber: 1,
  articleToEdit: -1,
};

const ActionType = {
  SET_СONTACT_EDIT: `SET_EDIT_CONTACT`,
  SET_CURRENT_PAGE_NUMBER: `SET_CONTACT_SEARCH_VALUE`
};

const ActionCreator = {
  setEditArticle: (articleId) => ({
    type: ActionType.SET_СONTACT_EDIT,
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
      "article": { article }
    })
      .then(() => {
        const { currentPageNumber } = getState();

        dispatch(DataOperation.loadArticles(currentPageNumber));
        alert(`Контакт успешно создан`);
      })
      .catch((err) => {
        alert(`Возникла ошибка при отправке`, err);
      });
  },
  deleteArticle: (article) => (dispatch, getState, api) => {
    return api.delete(`/articles/${article.slug}`)
      .then((result) => {
        const { currentPageNumber } = getState();

        dispatch(DataOperation.loadContacts(currentPageNumber));
        alert(`Контакт успешно удален`, result);
      }).catch((err) => {
        alert(`Возникла ошибка при удалении контакта`, err);
      });
  },
  putEditedArticle: (article) => (dispatch, getState, api) => {
    return api.put(`/articles/${article.slug}`, {
      "article": { article }
    })
      .then(() => {
        const { currentPageNumber } = getState();

        dispatch(DataOperation.loadContacts(currentPageNumber))
        alert(`Контакт успешно сохранен`);
      }).catch((err) => {
        alert(`Возникла ошибка при изменении контакта`, err);
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_СONTACT_EDIT:
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
