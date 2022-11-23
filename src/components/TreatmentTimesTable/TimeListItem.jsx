import React from "react";
import moment from "moment/moment";

function TimeListItem({
  customerImage,
  customerName,
  customerPhone,
  doctorImage,
  doctorName,
  doctorPhone,
  startTime,
  endTime,
}) {
  return (
    <div className="time_list_item">
      <div className="profile_wrapper">
        <div className="time_list_item_image_wrapper">
          <img src={customerImage} alt={customerName} />
        </div>
        <div>
          <div>{customerName}</div>
          <div>{customerPhone}</div>
        </div>
      </div>
      <div className="profile_wrapper">
        <div className="time_list_item_image_wrapper">
          <img src={doctorImage} alt={doctorName} />
        </div>
        <div>
          <div>{doctorName}</div>
          <div>{doctorPhone}</div>
        </div>
      </div>
      <div>
        <div>
          {moment(startTime).format("YYYY/MM/DD HH:mm:ss")}-
          {moment(endTime).format("HH:mm:ss")}
        </div>
      </div>
    </div>
  );
}

export default TimeListItem;
