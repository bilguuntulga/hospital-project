import { LineHeightOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React from 'react'

function cunstommerNews({ image, name, code, birthday, gander, disease_information, phone }) {
    return (
        <div>
            <Row align="middle" gutter={22} style={{ marginTop: "10px" }}>
                <Col span={4}>
                    <Row align="middle">
                        <Col>
                            <div style={{ backgroundColor: "#E9E9E9" ,width:"50px" ,height:"50px" ,borderRadius:"50%",display:"grid",placeItems:"center" }}>
                            <img  width="40px" height="40px"src={image} alt="" />
                            </div>
                        </Col>
                        <Col>
                            <p>{name}</p>
                        </Col>
                    </Row>
                </Col>
                <Col span={4}>
                    {code}
                </Col>
                <Col span={4}>
                    {birthday}
                </Col>
                <Col span={4}>
                    {gander}
                </Col>
                <Col span={4}>
                    {disease_information}
                </Col>
                <Col span={4}>
                    {phone}
                </Col>
            </Row>

        </div>
    )
}

export default cunstommerNews