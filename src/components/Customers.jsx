import { LineHeightOutlined } from '@ant-design/icons'
import { Button, Col, Row, Tag } from 'antd'
import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';

function customers({ image, name, birthday, gender, phone, id, color }) {
    const Colors = (color) => {
        switch (color) {
            case "GOOD": return "#75FF7E"
            case "MIDDLE": return "#f06d16"
            case "BAD": return "#d92e41"
            default: return "white"
        }
    }
    const Rate_Convert = (rate) => {
        switch (rate) {
            case "GOOD": return "Сайн"
            case "MIDDLE": return "Дунд"
            case "BAD": return "Муу "
            default: return "Not_found_rate"
        }
    }

    return (
        <Row justify="space-between" align="middle" gutter={22} style={{ marginTop: "10px", padding: "5px", borderRadius: "15px",backgroundColor:"white" }}>
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
                {/* {moment(birthday).format("YYYY.MM.DD")} */}
                {birthday}
            </Col>
            <Col span={4}>
                {genderTranslater(gender)}
            </Col>
            <Col span={4}>
                {phone}
            </Col>
            <Col span={4}>
            <Tag color={Colors(color)} style={{width:"30px",height:"30px",borderRadius:"50%"}}/>
            </Col>
            <Col span={4}>
                <Link to={`${id}`}>
                    <Button style={{ borderRadius: "5px", width: "88px", height: "27px", fontFamily: "kanit", fontStyle: "normal", fontWeight: "300", fontSize: "12px", lineHeight: "18px", border: "none" }}>Дэлгэрэнгүй</Button>
                </Link>
            </Col>
        </Row>
    )
}
const genderTranslater = (gender) => ({
    MALE: "Эрэгтэй",
    FEMALE: "Эмэгтэй",
}[`${gender}`])

export default customers