import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
  return (
    <div>
      <p className="f3">
        {
          'This Magic Brain will detect faces in your pictures. Give it a try : )'
        }
      </p>
      <p className="f3">{'Please enter a publicly accessible URL of image:'}</p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-80 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-20 grow f4 link ph3 pv2 dib white bg-light-purple pointer"
            onClick={onImageSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
