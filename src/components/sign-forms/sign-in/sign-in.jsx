import { useDispatch, useSelector } from 'react-redux';

import '../sign-in.css';

import Header from '../../header/header.jsx';
import Main from '../../main/main.jsx';
import { Operation } from '../../../reducer/user/user.js';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const SignIn = () => {
  const dispatch = useDispatch();

  const { handleSubmit, register, errors } = useForm();
  const authStatus = useSelector((state) => state.USER.authorizationStatus);

  const formSubmitHandler = (evt) => {
    const { email, password } = evt;
    dispatch(Operation.login({
      email,
      password
    }));
  };

  return (
    authStatus ?
      <Redirect to="/" /> :
      <>
        <Header/>
        <Main>
          <div className="popup-form__wrapper">
            <form action="#" className="popup-form" onSubmit={handleSubmit(formSubmitHandler)}>
              <h2>Sign In</h2>
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email address"
                ref={register({
                  required: {
                    value: true,
                    message: "This area is required"
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
                })}
              />
              {errors.email?.type === "required" && <span className="popup-form__error">{errors.email.message}</span>}
              {errors.email?.type === "pattern" && <span className="popup-form__error">{errors.email.message}</span>}

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                ref={register({
                  required: {
                  value: true,
                  message: 'This area is required'
                  }
                })}
              />
              {errors.password?.type === "required" && <span className="popup-form__error">{errors.password.message}</span>}

              <button type="submit" className="popup-form__button-submit">Login</button>
              <span>Don’t have an account? <Link to="sign-up" className="popup-form__sign-up-link">Sign Up.</Link></span>
            </form>
          </div>
        </Main>
      </>
  )
};

export default SignIn;