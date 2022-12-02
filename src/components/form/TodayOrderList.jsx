import { Button, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const OrderTimeCustomer = ({
  image,
  name,
  start_time,
  end_time,
  doctorName,
}) => {
  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginTop: "10px" }}>
        <Col span={4}>
          <div
            style={{
              backgroundColor: "#E9E9E9",
              width: "50px",
              height: "50px",
              borderRadius: "100rem",
              overflow: "hidden",
            }}
          >
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={image}
              alt=""
            />
          </div>
        </Col>
        <Col span={12}>
          <b>{name}</b>
          <div>{doctorName}</div>
        </Col>
        <Col span={8}>
          <div>{moment(start_time).format("HH:mm:ss")}</div>
          <div>{moment(end_time).format("HH:mm:ss")}</div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderTimeCustomer;
