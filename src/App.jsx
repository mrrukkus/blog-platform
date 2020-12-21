import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';

import SignIn from './components/sign-forms/sign-in/sign-in.jsx';
import EditProfile from './components/sign-forms/edit-profile/edit-profile.jsx';
import SignUp from './components/sign-forms/sign-up/sign-up.jsx';
import PostFull from './components/post-full/post-full.jsx';
import CreateNewArticle from './components/create-new-article/create-new-article.jsx';
import PostList from './components/post-list/post-list.jsx';
import { Operation as UserOperation } from './reducer/user/user';


function App() {
  const dispatch = useDispatch();
  console.log('app rendered');
  dispatch(UserOperation.checkAuthorizationStatus());

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={["/", "articles"]} component={PostList}/>
        <Route exact path="/articles/:slug" component={PostFull}/>
        <Route exact path="/sign-in" component={SignIn}/>
        <Route exact path="/sign-up" component={SignUp}/>
        <Route exact path="/profile" component={EditProfile}/>
        <Route exact path="/new-article" component={CreateNewArticle}/>
      </Switch>
    </BrowserRouter>
    // <>
    // </>
  );
};

export default App;
