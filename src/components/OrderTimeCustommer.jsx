import { Button, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'

const OrderTimeCustomer = ({ image, name, bool, time, link }) => {
    return (
        <div>
            <Row justify="space-between" align="middle" >
                <Col span={6}>
                    <div style={{ backgroundColor: "#E9E9E9", display: "grid", placeItems: "center", width: "50px", height: "50px", borderRadius: "50% " }}>
                        <img className='image' style={{borderRadius:"50%"}} src={image} alt="" />
                    </div>
                </Col>
                <Col span={9}>
                    <b>{name}</b>
                    <p>{moment(time).format('YYYY:MM:DD:HH:mm')}</p>
                </Col>
                <Col span={9}>
                    {bool ? <Link to={link}><Button style={{ backgroundColor: "#FEEEEF", borderRadius: "5px", fontFamily: "kanit", fontStyle: "normal", fontWeight: "300", fontSize: "12px", lineHeight: "18px", border: "none" }}>Дэлгэрэнгүй</Button> </Link> :
                        <p style={{ marginLeft: "150px" }}>{time}</p>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default OrderTimeCustomer