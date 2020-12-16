import '../sign-in.css';

import Header from '../../header/header.jsx';
import Main from '../../main/main.jsx';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const CreateNewAccount = () => {
  const authStatus = useSelector((state) => state.USER.authorizationStatus);

  return (
    authStatus ?
      <Redirect to="/" /> :
      <>
        <Header/>
        <Main>
          <div className="popup-form__wrapper">
            <form action="#" className="popup-form">
              <h2>Create new account</h2>

              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Username"/>

              <label htmlFor="email">Email address</label>
              <input type="text" id="email" placeholder="Email"/>

              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" minLength="6"/>

              <label htmlFor="repeat-password">Repeat Password</label>
              <input type="password" id="repeat-password" placeholder="Repeat Password"/>

              <label><input type="checkbox"/>I agree to the processing of my personal information</label>
              <button type="submit" className="popup-form__button-submit">Create</button>
              <span>Already have an account? <a href="#signup" className="popup-form__sign-link">Sign In.</a></span>
            </form>
          </div>
        </Main>
      </>
  )
};

export default CreateNewAccount;