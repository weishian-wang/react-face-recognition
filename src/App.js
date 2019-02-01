import React, { Component } from 'react';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import UserRank from './components/UserRank/UserRank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particle from './components/Particle/Particle';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'f1e09f227ca843f29d7c628d9a25eeff'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      input: '',
      imageUrl: ''
    };
  }

  componentDidMount() {
    document.title = 'React Face Recognition';
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    console.log(this.state.input);
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function (response) {
        console.log(response);
      },
      function (err) {
        console.log(err);
      }
    );
  }

  render() {
    const { isSignedIn, imageUrl } = this.state;

    return (
      <div className="App">
        <Particle />
        <Navigation isSignedIn={isSignedIn} />
        <Logo />
        <UserRank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={imageUrl}/>
      </div>
    );
  }
}

export default App;
