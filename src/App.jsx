import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';

import ErrorBoundary from './components/error-boundary/error-boundary';
import SignIn from './components/sign-forms/sign-in/sign-in';
import EditProfile from './components/sign-forms/edit-profile/edit-profile';
import SignUp from './components/sign-forms/sign-up/sign-up';
import ArticleFull from './components/article-full/article-full';
import CreateNewArticle from './components/create-new-article/create-new-article';
import EditArticle from './components/edit-article/edit-article';
import ArticleList from './components/article-list/article-list';
import NotFound from './components/not-found/not-found';
import { Operation as UserOperation } from './reducer/user/user';


function App() {
  const dispatch = useDispatch();
  dispatch(UserOperation.checkAuthorizationStatus());

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Switch>
          <Route exact path={["/", "/articles"]} component={ArticleList}/>
          <Route exact path="/articles/:slug" component={ArticleFull}/>
          <Route exact path="/articles/:slug/edit" component={EditArticle}/>
          <Route exact path="/sign-in" component={SignIn}/>
          <Route exact path="/sign-up" component={SignUp}/>
          <Route exact path="/profile" component={EditProfile}/>
          <Route exact path="/new-article" component={CreateNewArticle}/>
          <Route component={NotFound}/>
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
