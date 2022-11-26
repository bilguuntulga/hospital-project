import { Button, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'

const OrderTimeCustomer = ({ image, name, time, doctorName }) => {
    return (
        <div>
            <Row justify="space-between" align="middle" style={{ marginTop: "10px" }}>
                <Col>
                    <div style={{ backgroundColor: "#E9E9E9", width: "50px", height: "50px", borderRadius: "100rem", overflow: "hidden" }}>
                        <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={image} alt="" />
                    </div>
                </Col>
                <Col>
                    <b>{name}</b>
                    <p>{doctorName}</p>
                </Col>
                <Col>
                    <p>{moment(time).format("Өнөөдөр: " + "LT")}</p>
                </Col>
            </Row>
        </div>
    )
}

export default OrderTimeCustomer