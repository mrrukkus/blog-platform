import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ActionCreator } from '../../reducer/user/user';
import routePaths, { localStorageActions } from '../../routes';

const authButtonsClass = 'auth-buttons';
const userButtonsClass = 'user-buttons';

const noAuthMarkup =
  <div className={authButtonsClass}>
    <Link to={routePaths.signIn} className={`${authButtonsClass}__button`}>Sign In</Link>
    <Link to={routePaths.signUp} className={`${authButtonsClass}__button ${authButtonsClass}__button--auth`}>Sign Up</Link>
  </div>;

const userMarkup = (user, logout) =>
  <div className={userButtonsClass}>
    <Link to={routePaths.newArticle} className={`${userButtonsClass}__create-article`}>Create article</Link>
    <Link to={routePaths.profile} className={`${userButtonsClass}__profile`}>
      {user.username}
      <img src={user.image ? `${user.image}` : `../user.png`} alt="user-avatar" width="46" height="46"/>
    </Link>
    <button type="button" className={`${userButtonsClass}__logout`} onClick={logout}>Log Out</button>
  </div>


const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.USER.currentUser);

  const logout = () => {
    dispatch(ActionCreator.requireAuthorization(false, null));
    localStorageActions.removeUser();
  };

  const userInterface = currentUser ? userMarkup(currentUser, logout) : noAuthMarkup;

  return (
    <header className="app-header">
      <div className="header-wrapper">
        <Link to={routePaths.main}>
          <h1 className="app-header__header">Realworld blog</h1>
        </Link>
        {userInterface}
      </div>
    </header>
  )
};

export default Header;
