// Written by Shlomi Ben-Shushan.

import React, { useState } from 'react';
import '../firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import '../App.css'; 

/**
 * The Login componenet is shown when the user open the app.
 * It allows the user to login to the app using Google account.
 */
const Login = () => {

  const navigate = useNavigate();

  const [errorCode, setErrorCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Using Google Firebase authentication provider.
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ 'login_hint': 'user@gmail.com' });
  const auth = getAuth();

  // This function pops up a window for login using Google account.
  const signInWithGoogle = () => {

    signInWithPopup(auth, provider)
    
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setErrorCode(null);
      setErrorMessage(null);
      const options = {
        state: {
          username: user.displayName,
          token: token,
        }
      }
      navigate('./Lobby', options);
    })
    
    .catch((error) => {
      setErrorCode(error.code);
      setErrorMessage(error.message);
    });

  };

  // This component is also serves as a welcome screen so it show some explanations and a login button.
  const content = <div>
    <div className='Login-instructions'>
      <p>Welcome to Online Code Blocks web application.</p>
      <p>In this app you can create a JavaScript code editor (i.e., CodeBlock) and share it live and online with a partner.</p>
      <p>To use the app, you and your partner needs to sign in with your Google account.</p>
    </div>
    <div className='Login-signin'>
      <Button variant='contained' size='large' onClick={() => signInWithGoogle()}><img src={require('../assets/google.png')}/>Sign-in with Google</Button>
    </div>
  </div> 

  const error = <div className='Login-error'>
    <h3>Error: {errorCode}</h3>
    <p>{errorMessage}</p>
  </div>

  return (
    errorCode ? error : content
  )
}
 
export default Login
