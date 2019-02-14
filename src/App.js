import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import UserRank from './components/UserRank/UserRank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particle from './components/Particle/Particle';
import './App.css';

const initialState = {
  isSignedIn: false,
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  user: {
    user_id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  token: null
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate || new Date(expiryDate) <= new Date()) {
      this.onRouteChange('signout');
      return;
    }
    const user_id = localStorage.getItem('user_id');
    fetch(`${process.env.REACT_APP_DOMAIN}/profile/${user_id}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(userData => {
        this.setState({
          user: { ...userData },
          token: token
        });
        this.onRouteChange('home');
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    document.title = 'React Face Recognition';
  }

  onRouteChange = route => {
    if (route === 'signout') {
      this.signoutHandler();
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  signoutHandler = () => {
    this.setState(initialState);
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
  };

  loadUser = (userData, token) => {
    this.setState({
      user: { ...userData },
      token: token
    });
    localStorage.setItem('user_id', userData.user_id);
    localStorage.setItem('token', token);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
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

  clearFaceBoundingBox = () => {
    this.setState({ boxes: [] });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onImageSubmit = () => {
    this.clearFaceBoundingBox();
    this.setState({ imageUrl: this.state.input });
    fetch(`${process.env.REACT_APP_DOMAIN}/imageurl`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageUrl: this.state.input
      })
    })
      .then(res => {
        if (res.status !== 200) {
          return null;
        }
        return res.json();
      })
      .then(data => {
        // Display face bounding box(es) and update user entries only if
        // 1) it's a successful image submission
        // 2) image contains human face(s)
        if (
          data &&
          data.status.code === 10000 &&
          data.outputs[0].data.regions
        ) {
          this.displayFaceBoundingBox(this.calculateFaceLocation(data));
          return fetch(`${process.env.REACT_APP_DOMAIN}/image`, {
            method: 'PUT',
            headers: {
              Authorization: 'Bearer ' + this.state.token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: this.state.user.user_id
            })
          })
            .then(res => res.json())
            .then(entries => {
              this.setState(
                Object.assign(this.state.user, { entries: entries })
              );
            });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { isSignedIn, imageUrl, boxes, route, user } = this.state;

    return (
      <div className="App">
        <Particle />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          email={user.email}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <UserRank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onImageSubmit={this.onImageSubmit}
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
