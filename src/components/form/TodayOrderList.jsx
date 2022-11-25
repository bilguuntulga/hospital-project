import { Button, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'

const OrderTimeCustomer = ({ image, name, time, doctorName }) => {
    return (
        <div>
            <Row justify="space-between" align="middle" style={{ marginTop: "10px" }}>
                <Col>
                    <div style={{ backgroundColor: "#E9E9E9", display: "grid", placeItems: "center", width: "50px", height: "50px", borderRadius: "50% " }}>
                        <img width="29px" height="29px" src={image} alt="" />
                    </div>
                </Col>
                <Col>
                    <b>{name}</b>
                    <p>{doctorName}</p>
                </Col>
                <Col>
                    <p>{moment(time).format("Өнөөдөр: "+"LT")}</p>
                </Col>
            </Row>
        </div>
    )
}

export default OrderTimeCustomer