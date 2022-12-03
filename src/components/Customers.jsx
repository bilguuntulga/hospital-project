import { Button, Col, Row } from "antd";
import React, { memo } from "react";
import { Link } from "react-router-dom";

function Customers({ image, name, birthday, gender, phone, id, rate }) {
  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px",
        borderRadius: "15px",
        backgroundColor: "white",
      }}
    >
      <Row justify="space-between" align="middle" gutter={22}>
        <Col span={4}>
          <Row align="middle" gutter={20}>
            <Col>
              <div
                style={{
                  backgroundColor: "#E9E9E9",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  className="image"
                  width="40px"
                  height="40px"
                  src={image}
                  alt="Customer Image"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            </Col>
            <Col style={{ marginTop: "13px", width: "130px" }}>
              <p>{name}</p>
            </Col>
          </Row>
        </Col>
        <Col span={4}>{birthday}</Col>
        <Col span={4}>{genderTranslater(gender)}</Col>
        <Col span={4}>{phone}</Col>
        <Col span={4}>
          <div
            className={rate == "GOOD" ? "good" : "bad"}
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
        </Col>
        <Col span={4}>
          <Link to={`/customer/${id}`}>
            <Button>Дэлгэрэнгүй</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
const genderTranslater = (gender) =>
  ({
    MALE: "Эрэгтэй",
    FEMALE: "Эмэгтэй",
  }[`${gender}`]);

export default memo(Customers);
