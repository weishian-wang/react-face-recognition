import React from 'react';
import brain from './brain.png';
import Tilty from "react-tilty";
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilty className="Tilty br2 shadow-2" options={{ max: 55 }}>
        <img src={brain} alt="logo" className="image" />
      </Tilty>
    </div>
  );
};

export default Logo;
