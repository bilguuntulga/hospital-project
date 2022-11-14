import React from 'react'
import { Button, Col, PageHeader, Row, Table } from 'antd'
import './style.css'
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import Order_time_custommer from '../../Components/order_time_custommer';

function HomePage() {

    return (
        <>
            <div style={{ width: "95%" }}>
                <Row justify="space-between" style={{ width: "100%" }}>
                    <Col span={5}>
                        <div className='columns'>
                            <Row style={{ width: "100%", paddingTop: "10px" }}>
                                <Col span={10}>
                                    <div className="img_container">
                                        <img src="homePageCol1.png" alt="" />
                                    </div>
                                </Col>
                                <Col span={14}>
                                    <p style={{ margin: "0", fontSize: "20px" }}>Амбултор</p>
                                    <p>20</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div className='columns'>
                            <Row style={{ width: "100%", paddingTop: "10px" }}>
                                <Col span={10}>
                                    <div className="img_container">
                                        <img src="homePageCol2.png" alt="" />
                                    </div>
                                </Col>
                                <Col span={14}>
                                    <p style={{ margin: "0", fontSize: "20px" }}>Амбултор</p>
                                    <p>20</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div className='columns'>
                            <Row style={{ width: "100%", paddingTop: "10px" }}>
                                <Col span={10}>
                                    <div className="img_container">
                                        <img src="homePageCol3.png" alt="" />
                                    </div>
                                </Col>
                                <Col span={14}>
                                    <p style={{ margin: "0", fontSize: "20px" }}>Амбултор</p>
                                    <p>20</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div className='columns'>
                            <Row style={{ width: "100%", paddingTop: "10px" }}>
                                <Col span={10}>
                                    <div className="img_container">

                                        <img src="homePageCol4.png" alt="" />
                                    </div>
                                </Col>
                                <Col span={14}>
                                    <p style={{ margin: "0", fontSize: "20px" }}>Амбултор</p>
                                    <p>20</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <br /><br />
                <Row justify="space-between" >
                    <Col span={8}>
                        <p>Цаг захиалсан үйлчлүүлэгч</p>
                        <div style={{ backgroundColor: "white", padding: "20px", width: "442px", borderRadius: "15px" }}>
                            <Order_time_custommer name="Ц.Оргил" image="ninja.png" other="Нас 25, Эрэгтэй 15 Nov 13;30" bool={true} />
                            <Order_time_custommer name="Ц.Оргил" image="ninja.png" other="Нас 25, Эрэгтэй 15 Nov 13;30" bool={true} />
                            <Order_time_custommer name="Ц.Оргил" image="ninja.png" other="Нас 25, Эрэгтэй 15 Nov 13;30" bool={true} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <p>Үйлчлүүлэгч</p>
                        <div style={{
                            backgroundColor: "white", padding: "20px", width: "327px", height: " 181px", borderRadius: "15px"
                        }}>
                            <Row gutter={30} align="middle">
                                <Col>
                                    <div style={{ backgroundColor: "#E9F6FE", borderRadius: "50%", width: "50px", height: "50px", display: "grid", placeItems: "center" }}>
                                        <UserOutlined style={{ fontSize: "26px", color: "#7DCAF9" }} />
                                    </div>
                                </Col>
                                <Col>
                                    <b>10.0k</b>
                                    <p>Шинэ үйлчлүүлэгч</p>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <img src="chart.png" width="15.34px" height="4.76px" alt="" />
                                        </Col>
                                        <Col>
                                            <p style={{ color: "#8C85F0" }}>15%</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row gutter={30} align="middle">
                                <Col>
                                    <div style={{ backgroundColor: "#FFF6E5", borderRadius: "50%", width: "50px", height: "50px", display: "grid", placeItems: "center" }}>
                                        <UserOutlined style={{ fontSize: "26px", color: "#F9CF81" }} />
                                    </div>
                                </Col>
                                <Col>
                                    <b>10.0k</b>
                                    <p>Хуучин үйлчлүүлэгч</p>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <img src="chart.png" width="15.34px" height="4.76px" alt="" />
                                        </Col>
                                        <Col>
                                            <p style={{ color: "#8C85F0" }}>15%</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <p>Хүйс</p>
                    </Col>
                    <Col span={8}>
                        <div style={{ backgroundColor: "white", padding: "20px", width: "486px", height: "509px", borderRadius: "15px", overflowY: "scroll" }}>

                            <p>Өнөөдөр</p>
                            <Order_time_custommer image="ninja.png" name="Ц.Оргил" bool={false} time="10:30" other="Арьсны эмч" />
                            <Order_time_custommer image="ninja.png" name="Ц.Оргил" bool={false} time="Одоо" other="Арьсны эмч" />
                            <Order_time_custommer image="ninja.png" name="Ц.Оргил" bool={false} time="12:30" other="Арьсны эмч" />
                            <Order_time_custommer image="ninja.png" name="Ц.Оргил" bool={false} time="1430" other="Арьсны эмч" />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default HomePage
