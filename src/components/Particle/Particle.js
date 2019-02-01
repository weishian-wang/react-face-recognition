import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './Particle.css';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 400
      }
    }
  }
}

class Particle extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <Particles className="particles" params={particlesOptions} />
    );
  }
}

export default Particle;
