import { Badge } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function DoctorCard({ name, image, role, url }) {
  return (
    <Link to={url}>
      <div className="doctor_card_wrapper">
        <img className="doctor_card_wrapper_image" src={image} alt={name} />
        <div className="doctor_card_wrapper_info_wrapper">
          <div className="doctor_card_wrapper_info_wrapper_name">
            {name?.length > 15 ? name?.substring(0, 15) + "..." : name}
          </div>
          <div className="doctor_card_wrapper_info_wrapper_role">{role}</div>
        </div>
      </div>
    </Link>
  );
}

export default DoctorCard;
