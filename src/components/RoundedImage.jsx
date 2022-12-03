import React from "react";

function RoundedImage({ image, size = 50 }) {
  return (
    <div
      className="rounded_image_wrapper"
      style={{ width: size, height: size }}
    >
      <img src={image} alt={image} />
    </div>
  );
}

export default RoundedImage;
