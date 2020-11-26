import '../SignForms/SignIn/Sign-in.css';

const EditProfile = () => {
  return (
    <div className="popup-form__wrapper">
      <form action="#" className="popup-form">
        <h2>Edit Profile</h2>

        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Username"/>

        <label htmlFor="email">Email address</label>
        <input type="text" id="email" placeholder="Email"/>

        <label htmlFor="password">New password</label>
        <input type="password" id="password" placeholder="New password"/>

        <label htmlFor="avatar">Avatar image (url)</label>
        <input type="text" id="avatar" placeholder="Avatar image"/>

        <button type="submit" className="popup-form__button-submit">Save</button>
      </form>
    </div>
  )
};

export default EditProfile;