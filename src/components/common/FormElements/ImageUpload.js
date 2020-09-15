import React, { useRef, useState, useEffect } from "react";

import Button from "../FormElements/Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
  // manage the perview file
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHanler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="image-box">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHanler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className={`image-upload__preview ${props.classImage}`}>
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl &&
            (props.initialValue ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${props.initialValue}`}
                alt="preview"
              />
            ) : (
              <p>Please pick an image</p>
            ))}
        </div>
        <Button
          type="button"
          buttonClass="button-text"
          onClick={pickImageHandler}
        >
          ADD IMAGE
        </Button>
      </div>
      {!isValid && !props.initialValue && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
