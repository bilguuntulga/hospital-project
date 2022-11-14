import { FormOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React, { useState } from 'react'
import { Link, Router, useLocation } from 'react-router-dom'
import './style.css'

function Index() {
    const pathName = useLocation();
    return (
        <>
            <div className='main_container'>
                <div className='content'>
                    <div className="profile">
                        <Row style={{ width: "100%" }} align="middle">
                            <Col >
                                <img src="logo.png" width="50px" height="50px" alt="" />
                            </Col>
                            <Col >
                                <b style={{marginTop:"5px"}}> Арьс дасгалжуулагч</b>
                            </Col>
                        </Row>
                    </div>
                    <div className='menu'>
                        <Link to="/" >
                            <div className={pathName.pathname == '/' ? "action_home" : "simple"}>
                                <Row gutter={20} justify="center" style={{ width: "100%" }}>
                                    <Col span={8}>
                                        <img src="home.png" width="30px" height="30px" alt="" />
                                    </Col>
                                    <Col span={16}>
                                        Нүүр хуудас
                                    </Col>
                                </Row>
                            </div>
                        </Link>
                        <Link to="/calendar">
                            <div className={pathName.pathname == '/calendar' ? "action_orde_time" : "simple"}>
                                <Row gutter={20} justify="center" style={{ width: "100%" }}>
                                    <Col span={8}>
                                        <FormOutlined className='Icon' style={{ fontSize: "30px", color: "black" }} />
                                    </Col>
                                    <Col span={16}>
                                        Календар
                                    </Col>
                                </Row>
                            </div>
                        </Link>
                        <Link to="/custommer">
                            <div className={pathName.pathname == '/custommer' ? "action_registration" : "simple"}>
                                <Row gutter={20} justify="center" style={{ width: "100%" }}>
                                    <Col span={8}>
                                        <img src="custommer.png" width="30px" height="30px" alt="" />
                                    </Col>
                                    <Col span={16}>
                                        Үйлчлүүлэгч
                                    </Col>
                                </Row>
                            </div>
                        </Link>
                        <Link to="doctor">
                            <div className={pathName.pathname == '/doctor' ? "action_advice" : "simple"}>
                                <Row gutter={20} justify="center" style={{ width: "100%" }}>
                                    <Col span={8}>
                                        <img src="doctorMenu.png" width="30px" height="30px" alt="" />
                                    </Col>
                                    <Col span={16}>
                                        Эмч                                    </Col>
                                </Row>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index