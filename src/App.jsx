import './App.css';
import Post from "./components/Post/Post.jsx";
import Pagination from './components/Pagination/Pagination.jsx';
import SignIn from './components/Sign-in/Sign-in.jsx';

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
          {/* <Post/>
          <Pagination /> */}
          <SignIn/>
        </div>
      </main>
    </>
  );
};

export default App;
