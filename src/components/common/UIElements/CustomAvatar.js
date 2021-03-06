import React from "react";

import "./Avatar.css";

const CustomAvatar = (props) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{
          width: props.width,
          height: props.width,
          borderRadius: props.borderRadius,
        }}
      />
    </div>
  );
};

export default CustomAvatar;
