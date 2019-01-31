import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 450
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false
    };
  }

  componentDidMount() {
    document.title = 'React Face Recognition';
  }

  render() {
    const { isSignedIn } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} />
        <Logo />
      </div>
    );
  }
}

export default App;
