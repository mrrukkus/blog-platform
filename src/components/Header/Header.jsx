import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const noAuthMarkup =
  <div className="auth-buttons">
    <Link to={`/sign-in`} className="auth-buttons__button">Sign In</Link>
    <Link to={`/sign-up`} className="auth-buttons__button auth-buttons__button--auth">Sign Up</Link>
  </div>;

const AuthMarkup =
  <div className="user-buttons">
    <Link to="/new-article" className="user-buttons__create-article">Create article</Link>
    <Link to="/profile">
      John Doe
      <img src="" alt="user-avatar"/>
    </Link>
    <button className="user-buttons__logout">Log Out</button>
  </div>


const Header = () => {
  const authStatus = useSelector((state) => state.USER.authorizationStatus);
  const userInterface = authStatus ? AuthMarkup : noAuthMarkup;

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
