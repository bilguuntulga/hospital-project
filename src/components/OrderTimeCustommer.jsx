import { Button, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import RoundedImage from "./RoundedImage";

const OrderTimeCustomer = ({ image, name, bool, time, link }) => {
  return (
    <div>
      <Row justify="space-between" align="middle">
        <RoundedImage image={image} size={50} />
        <Col span={12}>
          <b>{name}</b>
          <p>{moment(time).format("YYYY/MM/DD HH:mm")}</p>
        </Col>
        <Col>
          {bool ? (
            <Link to={link}>
              <Button
                style={{
                  backgroundColor: "#FEEEEF",
                  borderRadius: "5px",
                  fontFamily: "kanit",
                  fontStyle: "normal",
                  fontWeight: "300",
                  fontSize: "12px",
                  lineHeight: "18px",
                  border: "none",
                }}
              >
                Дэлгэрэнгүй
              </Button>{" "}
            </Link>
          ) : (
            <p style={{ marginLeft: "150px" }}>{time}</p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OrderTimeCustomer;
