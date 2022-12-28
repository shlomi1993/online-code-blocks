// Written by Shlomi Ben-Shushan.

import React from "react";
import '../App.css';

/**
 * The Error componenet is shown when a user somehow navigates to a URI that not exists in the server.
 */
function Error() {
  return (
    <div className='Lobby-Header'>
      <h1>Error 404: Page not found 😵</h1>
    </div>
  );}

export default Error;