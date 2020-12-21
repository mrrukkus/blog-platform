import '../sign-in.css';

import Header from '../../header/header.jsx';
import Main from '../../main/main.jsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Operation as UserOperation } from '../../../reducer/user/user';

const EditProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.USER.currentUser);
  const [usernameValue, setUsernameValue] = useState(currentUser.username);
  const [emailValue, setEmailValue] = useState(currentUser.email);
  const [passwordValue, setPasswordValue] = useState('');
  const [imageURL, setImageURLValue] = useState(currentUser.image ? currentUser.image : '');

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    dispatch(UserOperation.editProfile({
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
      image: imageURL
    }));
  }
  return (
    <>
      <Header/>
      <Main>
        <div className="popup-form__wrapper">
          <form action="#" className="popup-form" onSubmit={onFormSubmit}>
            <h2>Edit Profile</h2>

            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Username" value={usernameValue} onChange={(evt) => {
              setUsernameValue(evt.target.value)
            }}/>

            <label htmlFor="email">Email address</label>
            <input type="text" id="email" placeholder="Email" value={emailValue} onChange={(evt) => {
              setEmailValue(evt.target.value)
            }}/>

            <label htmlFor="password">New password</label>
            <input type="password" id="password" placeholder="New password" onChange={(evt) => {
              setPasswordValue(evt.target.value)
            }}/>

            <label htmlFor="avatar">Avatar image (url)</label>
            <input type="text" id="avatar" placeholder="Avatar image" value={imageURL} onChange={(evt) => {
              setImageURLValue(evt.target.value)
            }}/>

            <button type="submit" className="popup-form__button-submit">Save</button>
          </form>
        </div>
      </Main>
    </>
  )
};

export default EditProfile;