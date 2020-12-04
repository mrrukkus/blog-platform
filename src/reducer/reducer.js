import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as articles} from "./articles/articles.js";
import {reducer as user} from "./user/user.js";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.ARTICLES]: articles,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
});
