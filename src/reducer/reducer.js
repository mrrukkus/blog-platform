import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as articles} from "./articles/articles";
import {reducer as user} from "./user/user";
import NameSpace from "./name-space";

export default combineReducers({
  [NameSpace.ARTICLES]: articles,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
});
