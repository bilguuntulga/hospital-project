import { ClockCircleOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { memo } from "react";

function DoctorWorkingHours({ day, endDate, startDate }) {
  return (
    <div>
      <Row gutter={60} justify="start" style={{ fontSize: "20px" }}>
        <Col span={12}>
          <Row>
            <Col>
              <ClockCircleOutlined
                style={{ color: "#373EFF", width: "35px", height: "35px" }}
              />
            </Col>
            <Col>
              <p>{day}</p>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <p style={{ textAlign: "start" }}>
            <span style={{ color: "#373FFF" }}>
              {startDate}-{endDate}
            </span>
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default memo(DoctorWorkingHours);
