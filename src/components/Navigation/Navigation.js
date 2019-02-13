import React from 'react';
import './Navigation.css';

const Navigation = ({ isSignedIn, onRouteChange, email }) => {
  if (isSignedIn) {
    return (
      <nav>
        <p className="f5 black underline pt4 pr2">
          {email}
        </p>
        <p
          onClick={() => onRouteChange('signout')}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav>
        <p
          onClick={() => onRouteChange('signin')}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange('register')}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
