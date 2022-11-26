import { Button, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'

const OrderTimeCustomer = ({ image, name, bool, time, link }) => {
    return (
        <div>
            <Row justify="space-between" align="middle" style={{ marginTop: "10px" }}>
                <Col>
                    <div style={{ backgroundColor: "#E9E9E9", display: "grid", placeItems: "center", width: "50px", height: "50px", borderRadius: "50% " ,padding:"5px"}}>
                        <img width="100%" height="100%" style={{borderRadius:"50%"}} src={image} alt="" />
                    </div>
                </Col>
                <Col>
                    <b>{name}</b>
                    <p>{moment(time).format('lll')}</p>
                </Col>
                <Col>
                    {bool ? <Link to={link}><Button style={{ backgroundColor: "#FEEEEF", borderRadius: "5px", width: "88px", height: "27px", fontFamily: "kanit", fontStyle: "normal", fontWeight: "300", fontSize: "12px", lineHeight: "18px", border: "none" }}>Дэлгэрэнгүй</Button> </Link> :
                        <p style={{ marginLeft: "150px" }}>{time}</p>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default OrderTimeCustomer