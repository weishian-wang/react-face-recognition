import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';

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
      <div className='App'>
        <Navigation isSignedIn={isSignedIn} />
      </div>
    );
  }
}

export default App;
