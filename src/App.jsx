import './App.css';
// import Post from "./components/Post/Post.jsx";
// import Pagination from './components/Pagination/Pagination.jsx';
// import SignIn from './components/Sign-in/Sign-in.jsx';
// import EditProfile from './components/Edit-profile/Edit-profile.jsx';
// import CreateNewProfile from './components/SignForms/CreateNewAccount/Create-new-profile.jsx';
import PostFull from './components/PostFull/PostFull.jsx';
// import CreateNewArticle from './components/CreateNewArticle/CreateNewArticle.jsx';

function App() {
  return (
    <>
      <header className="app-header">
        <div className="header-wrapper">
          <h1 className="app-header__header">Realworld blog</h1>
          <div className="auth-buttons">
            <button className="auth-buttons__button">Sign In</button>
            <button className="auth-buttons__button auth-buttons__button--auth">Sign Up</button>
          </div>
        </div>
      </header>
      <main className="app-main">
        <div className="app-main-wrapper">
          {/* <Post/> */}
          {/* <Pagination /> */}
          {/* <SignIn/> */}
          {/* <EditProfile/> */}
          {/* <CreateNewProfile/> */}
          <PostFull/>
          {/* <CreateNewArticle /> */}
        </div>
      </main>
    </>
  );
};

export default App;
