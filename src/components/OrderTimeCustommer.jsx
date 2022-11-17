import { Button, Col, Row } from 'antd'
import React from 'react'

const OrderTimeCustomer = ({ image, name, other, bool, time }) => {
    return (
        <div>
            <Row gutter={20} align="middle" style={{ marginTop: "10px" }}>
                <Col>
                    <div style={{ backgroundColor: "#E9E9E9", display: "grid", placeItems: "center", width: "50px", height: "50px", borderRadius: "50% " }}>
                        <img width="29px" height="29px" src={image} alt="" />
                    </div>
                </Col>
                <Col>
                    <b>{name}</b>
                    <p>{other}</p>
                </Col>
                <Col>
                    {bool ? <Button style={{ backgroundColor: "#FEEEEF", borderRadius: "5px", width: "88px", height: "27px", fontFamily: "kanit", fontStyle: "normal", fontWeight: "300", fontSize: "12px", lineHeight: "18px", border: "none" }}>Дэлгэрэнгүй</Button> :
                        <p style={{marginLeft:"150px"}}>{time}</p>
                    }

                </Col>
            </Row>
        </div>
    )
}

export default OrderTimeCustomer