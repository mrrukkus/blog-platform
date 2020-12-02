import {extend} from "../../utils.js";
import {Operation as DataOperation} from "../data/data";

console.log(`ы`);

const initialState = {
  contactToEdit: -1,
  contactsSearchValue: "",
};

const ActionType = {
  SET_СONTACT_EDIT: `SET_EDIT_CONTACT`,
  SET_CONTACT_SEARCH_VALUE: `SET_CONTACT_SEARCH_VALUE`
};

const ActionCreator = {
  setEditContact: (contactId) => ({
    type: ActionType.SET_СONTACT_EDIT,
    payload: contactId,
  }),
  setContactSearchValue: (searchValue) => ({
    type: ActionType.SET_CONTACT_SEARCH_VALUE,
    payload: searchValue,
  }),
};

const Operation = {
  putEditedContact: (contact) => (dispatch, getState, api) => {
    return api.put(`/contacts/${contact.id}`, contact)
      .then(() => {
        dispatch(DataOperation.loadContacts())
        alert(`Контакт успешно сохранен`);
      }).catch((err) => {
        alert(`Возникла ошибка при изменении контакта`, err);
      });
  },
  addNewContact: (contact) => (dispatch, getState, api) => {
    return api.post(`/contacts/`, contact)
      .then(() => {
        dispatch(DataOperation.loadContacts());
        alert(`Контакт успешно создан`);
      })
      .catch((err) => {
        alert(`Возникла ошибка при отправке`, err);
      });
  },
  deleteContact: (contact) => (dispatch, getState, api) => {
    return api.delete(`/contacts/${contact.id}`)
      .then((result) => {
        dispatch(DataOperation.loadContacts());
        alert(`Контакт успешно удален`, result);
      }).catch((err) => {
        alert(`Возникла ошибка при удалении контакта`, err);
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_СONTACT_EDIT:
      return extend(state, {
        contactToEdit: action.payload
      });
    case ActionType.SET_CONTACT_SEARCH_VALUE:
      return extend(state, {
        contactsSearchValue: action.payload
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
