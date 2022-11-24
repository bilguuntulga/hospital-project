import { LineHeightOutlined } from '@ant-design/icons'
import { Button, Col, Row, Tag } from 'antd'
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Customers({ image, name, birthday, gender, phone, id, rate }) {

    return (
        <Row justify="space-between" align="middle" gutter={22} style={{ marginTop: "10px", padding: "5px", borderRadius: "15px", backgroundColor: "white" }}>
            <Col span={4}>
                <Row align="middle" gutter={20}>
                    <Col>
                        <div style={{ backgroundColor: "#E9E9E9", width: "50px", height: "50px", borderRadius: "50%", display: "grid", placeItems: "center" }}>
                            <img width="40px" height="40px" src={image} alt="" style={{ borderRadius: "50%" }} />
                        </div>
                    </Col>
                    <Col>
                        <p>{name}</p>
                    </Col>
                </Row>
            </Col>
            <Col span={4}>
                {birthday}
            </Col>
            <Col span={4}>
                {genderTranslater(gender)}
            </Col>
            <Col span={4}>
                {phone}
            </Col>
            <Col span={4}>
                <div className={rate == "GOOD" ? "good" : "bad"} style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
            </Col>
            <Col span={4}>
                <Link to={`/customer/${id}`}>
                    <Button>Дэлгэрэнгүй</Button>
                </Link>
            </Col>
        </Row>
    )
}
const genderTranslater = (gender) => ({
    MALE: "Эрэгтэй",
    FEMALE: "Эмэгтэй",
}[`${gender}`])

export default memo(Customers)