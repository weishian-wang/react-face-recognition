import React from "react";
import "./FaceBoundingBox.css";

const FaceBoundingBox = ({ box }) => {
  return (
    <div
      className="bounding-box"
      style={{
        top: box.topRow,
        right: box.rightCol,
        bottom: box.bottomRow,
        left: box.leftCol
      }}
    />
  );
};

export default FaceBoundingBox;
