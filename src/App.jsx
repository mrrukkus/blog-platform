import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';

import ErrorBoundary from './components/error-boundary/error-boundary';
import SignIn from './components/sign-forms/sign-in/sign-in';
import EditProfile from './components/sign-forms/edit-profile/edit-profile';
import SignUp from './components/sign-forms/sign-up/sign-up';
import ArticleFull from './components/article-full/article-full';
import ArticleList from './components/article-list/article-list';
import NotFound from './components/not-found/not-found';
import ArticleForm from './components/article-form/article-form';
import { UserApiRequests } from './api';
import routePaths from './routes';


function App() {
  const dispatch = useDispatch();
  dispatch(UserApiRequests.checkAuthorizationStatus());

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Switch>
          <Route exact path={[routePaths.main, routePaths.mainArticles]} component={ArticleList}/>
          <Route exact path={routePaths.articleStatic} component={ArticleFull}/>
          <Route exact path={routePaths.articleEditStatic} component={ArticleForm}/>
          <Route exact path={routePaths.signIn} component={SignIn}/>
          <Route exact path={routePaths.signUp} component={SignUp}/>
          <Route exact path={routePaths.profile} component={EditProfile}/>
          <Route exact path={routePaths.newArticle} component={ArticleForm}/>
          <Route component={NotFound}/>
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
