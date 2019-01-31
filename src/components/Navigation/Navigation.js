import React from 'react';

const Navigation = ({ isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className="f3 link dim black underline pa3 pointer">Sign In</p>
        <p className="f3 link dim black underline pa3 pr4 pointer">Register</p>
      </nav>
    );
  }
};

export default Navigation;
