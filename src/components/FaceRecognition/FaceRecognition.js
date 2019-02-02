import React from "react";
import FaceBoundingBox from "../FaceBoundingBox/FaceBoundingBox";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  const faceBoundingBoxes = boxes.map((box, i) => {
    return <FaceBoundingBox box={box} key={i} />;
  });

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={imageUrl} alt="" />
        {faceBoundingBoxes}
      </div>
    </div>
  );
};

export default FaceRecognition;
