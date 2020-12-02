import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as contacts} from "./contacts/contacts.js";
import {reducer as user} from "./user/user.js";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.CONTACTS]: contacts,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
});
