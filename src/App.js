import React, { Component } from 'react';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import UserRank from './components/UserRank/UserRank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      imageUrl: '',
      boxes: [],
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }

  componentDidMount() {
    document.title = 'React Face Recognition';
  }

  loadUser = userData => {
    this.setState({
      user: { ...userData }
    });
  };

  calculateFaceLocation = data => {
    const img = document.getElementById('inputImage');
    const imgWidth = Number(img.width);
    const imgHeight = Number(img.height);
    const boxes = data.outputs[0].data.regions.map(region => {
      const {
        top_row,
        right_col,
        bottom_row,
        left_col
      } = region.region_info.bounding_box;
      return {
        topRow: top_row * imgHeight,
        rightCol: imgWidth - right_col * imgWidth,
        bottomRow: imgHeight - bottom_row * imgHeight,
        leftCol: left_col * imgWidth
      };
    });
    return boxes;
  };

  displayFaceBoundingBox = boxes => {
    this.setState({ boxes: boxes });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(res => {
        // If it's a successful image submission
        if (res.status.code === 10000) {
          this.displayFaceBoundingBox(this.calculateFaceLocation(res));
          return fetch('http://localhost:8080/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          });
        }
      })
      .then(res => res.json())
      .then(entries => {
        this.setState(Object.assign(this.state.user, { entries: entries }));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, boxes, route, user } = this.state;

    return (
      <div className="App">
        <Particle />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <UserRank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onImageSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
          </div>
        ) : route === 'signin' || route === 'signout' ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
