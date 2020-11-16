import './App.css';
import Post from "./components/Post/Post.jsx";

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
          <Post/>
        </div>
      {/* компонент */}

      </main>
    </>
  );
};

export default App;
