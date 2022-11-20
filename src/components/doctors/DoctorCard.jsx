import React from "react";
import { Link } from "react-router-dom";

function DoctorCard({ name, image, role, url }) {
  return (
    <Link to={url}>
      <div className="doctor_card_wrapper">
        <img className="doctor_card_wrapper_image" src={image} />
        <div className="doctor_card_wrapper_info_wrapper">
          <div className="doctor_card_wrapper_info_wrapper_name">{name}</div>
          <div className="doctor_card_wrapper_info_wrapper_role">{role}</div>
        </div>
      </div>
    </Link>
  );
}

export default DoctorCard;
