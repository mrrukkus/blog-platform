import './Sign-in.css'

const SignIn = () => {
  return (
    <div className="popup-form__wrapper">
      <form action="#" className="popup-form">
        <h2>Sign In</h2>
        <label htmlFor="email">Email address</label>
        <input type="text" id="email" placeholder="Email address"/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password"/>
        <button type="submit" className="popup-form__button-submit">Login</button>
        <span>Don’t have an account? <a href="#signup" className="popup-form__sign-up-link">Sign Up.</a></span>
      </form>
    </div>
  )
};

export default SignIn;