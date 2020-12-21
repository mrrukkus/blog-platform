import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {ActionCreator} from '../../reducer/user/user';

const noAuthMarkup =
  <div className="auth-buttons">
    <Link to={`/sign-in`} className="auth-buttons__button">Sign In</Link>
    <Link to={`/sign-up`} className="auth-buttons__button auth-buttons__button--auth">Sign Up</Link>
  </div>;

const userMarkup = (user, logout) =>
  <div className="user-buttons">
    <Link to="/new-article" className="user-buttons__create-article">Create article</Link>
    <Link to="/profile" className="user-buttons__profile">
      {user.username}
      <img src={`${user.image}`} alt="user-avatar" width="46" height="46"/>
    </Link>
    <button className="user-buttons__logout" onClick={logout}>Log Out</button>
  </div>


const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.USER.currentUser);
  console.log(currentUser);

  const logout = () => {
    dispatch(ActionCreator.requireAuthorization(false, null));
    localStorage.removeItem('user');
  };

  const userInterface = currentUser ? userMarkup(currentUser, logout) : noAuthMarkup;

  return (
    <header className="app-header">
      <div className="header-wrapper">
        <Link to={`/`}>
          <h1 className="app-header__header">Realworld blog</h1>
        </Link>
        {userInterface}
      </div>
    </header>
  )
};

export default Header;
