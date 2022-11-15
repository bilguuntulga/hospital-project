import { LineHeightOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import React from 'react'

function cunstommerNews({ image, name, code, birthday, gander, disease_information, phone }) {
    return (
        <div>
            <Row align="middle" gutter={22} style={{ marginTop: "10px" }}>
                <Col span={4}>
                    <Row align="middle" >
                        <Col>
                            <div style={{ backgroundColor: "#E9E9E9", width: "50px", height: "50px", borderRadius: "50%", display: "grid", placeItems: "center" }}>
                                <img width="40px" height="40px" src={image} alt="" />
                            </div>
                        </Col>
                        <Col>
                            <p>{name}</p>
                        </Col>
                    </Row>
                </Col>
                <Col span={3}>
                    {code}
                </Col>
                <Col span={3}>
                    {birthday}
                </Col>
                <Col span={3}>
                    {gander}
                </Col>
                <Col span={3}>
                    {disease_information}
                </Col>
                <Col span={3}>
                    {phone}
                </Col>
                <Col span={3}>
                    <Button style={{ backgroundColor: "#FEEEEF", borderRadius: "5px", width: "88px", height: "27px", fontFamily: "kanit", fontStyle: "normal", fontWeight: "300", fontSize: "12px", lineHeight: "18px", border: "none" }}>Дэлгэрэнгүй</Button>
                </Col>
            </Row>

        </div>
    )
}

export default cunstommerNews