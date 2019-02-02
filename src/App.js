import React, { Component } from "react";
import Clarifai from "clarifai";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import UserRank from "./components/UserRank/UserRank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particle from "./components/Particle/Particle";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "f1e09f227ca843f29d7c628d9a25eeff"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      input: "",
      imageUrl: "",
      box: {}
    };
  }

  componentDidMount() {
    document.title = "React Face Recognition";
  }

  calculateFaceLocation = data => {
    const faceRegion = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById("inputImage");
    const imgWidth = Number(img.width);
    const imgHeight = Number(img.height);
    return {
      topRow: faceRegion.top_row * imgHeight,
      rightCol: imgWidth - faceRegion.right_col * imgWidth,
      bottomRow: imgHeight - faceRegion.bottom_row * imgHeight,
      leftCol: faceRegion.left_col * imgWidth
    };
  };

  displayFaceBoundingBox = box => {
    console.log("box:", box);
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(res => this.displayFaceBoundingBox(this.calculateFaceLocation(res)))
      .catch(err => console.log(err));
  };

  render() {
    const { isSignedIn, imageUrl, box } = this.state;

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
        <FaceRecognition imageUrl={imageUrl} box={box} />
      </div>
    );
  }
}

export default App;
