import './Sign-in.css'

const SignIn = () => {
  return (
    <div className="sign-in__wrapper">
      <form action="#" className="sign-in">
        <h2>Sign In</h2>
        <label htmlFor="email">Email address</label>
        <input type="text" id="email" placeholder="Email address"/>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" placeholder="Password"/>
        <button type="submit" className="sign-in__button-submit">Login</button>
        <span>Don’t have an account? <a href="#signup" className="sign-in__sign-up-link">Sign Up.</a></span>
      </form>
    </div>
  )
};

export default SignIn;