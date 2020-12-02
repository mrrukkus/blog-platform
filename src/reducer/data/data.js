import {extend} from "../../utils.js";

const initialState = {
  contacts: [],
};

const ActionType = {
  LOAD_CONTACTS: `LOAD_CONTACTS`,
  LOAD_EMPTY_CONTACT: `LOAD_EMPTY_CONTACT`,
};

const ActionCreator = {
  loadContacts: (contacts) => {
    return {
      type: ActionType.LOAD_CONTACTS,
      payload: contacts
    };
  },
  loadEmptyContact: (contact) => {
    return {
      type: ActionType.LOAD_EMPTY_CONTACT,
      payload: contact
    };
  },
};

const Operation = {
  loadContacts: () => (dispatch, getState, api) => {
    return api.get(`/contacts`)
      .then((response) => {
        dispatch(ActionCreator.loadContacts(response.data));
      });
  },
  loadEmptyContact: () => (dispatch, getState, api) => {
    return api.get(`/empty-contact`)
      .then((response) => {
        dispatch(ActionCreator.loadEmptyContact(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CONTACTS:
      return extend(state, {
        contacts: action.payload
      });
    case ActionType.LOAD_EMPTY_CONTACT:
      return extend(state, {
        emptyContact: action.payload
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
