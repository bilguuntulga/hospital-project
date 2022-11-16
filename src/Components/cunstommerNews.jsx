import { LineHeightOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';

function cunstommerNews({ image, name, birthday, gender, phone, id }) {
    return (
        <div>
            <Row justify="space-between" align="middle" gutter={22} style={{ marginTop: "10px" }}>
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
                    {moment(birthday).format("YYYY.MM.DD")}
                </Col>
                <Col span={4}>
                    {genderTranslater(gender)}
                </Col>
                <Col span={4}>
                    {phone}
                </Col>
                <Col span={4}>
                    <Link to={`/custommer_news/custommer_detail/${id}`}>
                        <Button style={{ backgroundColor: "#FEEEEF", borderRadius: "5px", width: "88px", height: "27px", fontFamily: "kanit", fontStyle: "normal", fontWeight: "300", fontSize: "12px", lineHeight: "18px", border: "none" }}>Дэлгэрэнгүй</Button>
                    </Link>
                </Col>
            </Row>

        </div>
    )
}
const genderTranslater = (gender) => ({
    MALE: "Эрэгтэй",
    FEMALE: "Эмэгтэй",
}[`${gender}`])

export default cunstommerNews