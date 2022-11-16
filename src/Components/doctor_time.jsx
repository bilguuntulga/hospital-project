import { ClockCircleOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react'

function Doctor_Timer({ day, endDate, startDate }) {
    return (
        <div>
            <Row gutter={60} justify="start" style={{fontSize:"20px"}}>
                <Col span={12}>
                    <Row>
                        <Col>
                            <ClockCircleOutlined style={{ color: "#373EFF", width: "35px", height: "35px" }} />
                        </Col>
                        <Col>
                            <p style={{ textTransform: "uppercase" }}>{day}</p>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <p style={{ textAlign: "start" }}>Time: <span style={{ color: "#373FFF" }}>{startDate}-{endDate}</span> </p>
                </Col>
            </Row>
        </div>
    )
}


function CapitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default Doctor_Timer