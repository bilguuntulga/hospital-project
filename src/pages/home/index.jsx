import React from 'react'
import { Button, Col, PageHeader, Row, Table } from 'antd'
import './style.css'
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import Order_time_custommer from '../../Components/order_time_custommer';
import CLineChart from "./chart"
import PieChart from "./PieCharts"
import CunstommerNews from '../../Components/cunstommerNews';
function HomePage() {



    const selectedDay = (val) => {
        console.log(val)
    };

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <>
            <div style={{ width: "95%" }}>
                <Row gutter={10} justify="space-between" style={{ width: "100%" }}>
                    <Col span={6}>
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
                    <Col span={6}>
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
                    <Col span={6}>
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
                    <Col span={6}>
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
                            <Order_time_custommer name="Ц.Оргил" image="ninja.png" other="Нас 25, Эрэгтэй 15 Nov 13;30" bool={true} />
                        </div>
                        <p>Эмчилгээ</p>
                        <div style={{ backgroundColor: "white", width: "442px", height: "137px", borderRadius: "15px" }}>
                            <CLineChart />
                        </div>
                    </Col>
                    <Col span={8}>
                        <p>Үйлчлүүлэгч</p>
                        <div style={{
                            backgroundColor: "white", padding: "20px", width: "440px", height: " 181px", borderRadius: "15px"
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
                        <div style={{ width: "440px", height: "263px", backgroundColor: "white", borderRadius: "15px" }}>
                            <PieChart />
                        </div>
                    </Col>
                    <Col span={8}>
                        <p>Өнөөдөр</p>
                        <div style={{ backgroundColor: "white", padding: "20px", width: "100%", height: "509px", borderRadius: "15px" }}>

                            <div style={{ overflowY: "scroll", overflowX: "hidden", height: "270px" }}>
                                <Order_time_custommer image="ninja.png" name="Ц.Оргил" bool={false} time="10:30" other="Арьсны эмч" />
                                <Order_time_custommer image="ninja.png" name="Ц.Оргил" bool={false} time="Одоо" other="Арьсны эмч" />
                                <Order_time_custommer image="ninja.png" name="Ц.Оргил" bool={false} time="12:30" other="Арьсны эмч" />
                                <Order_time_custommer image="ninja.png" name="Ц.Оргил" bool={false} time="1430" other="Арьсны эмч" />
                            </div>
                            <p>03-09 Nov,2021</p>
                            <div className='button_container'>

                                <Button className='button'>S <br />3</Button>
                                <Button className='button'>M <br />4</Button>
                                <Button className='button'>T <br />5</Button>
                                <Button className='button'>W <br />6</Button>
                                <Button className='button'>T<br />7</Button>
                                <Button className='button'>F<br />8</Button>
                                <Button className='button'>S<br />9</Button>
                            </div>
                            <br />
                            <div className="sevenDay">
                                <Row style={{ width: "100%", marginLeft: "80px", marginTop: "15px" }}>
                                    <Col span={14}>
                                        <b>Ирэх 7 хоног</b>
                                        <p>2- шинэ захиалга</p>
                                    </Col>
                                    <Col span={10}>
                                        <Button className='sevenDayButton'>Харах</Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
                <p>Үйлчлүүлэгчдийн мэдээлэл</p>
                <div style={{ width: "100%", height: "69px", backgroundColor: "#D6ECFD", borderRadius: "15px" ,padding:"20px",display:"grid" ,placeItems:"center"}}>
                    <Row style={{width:"100%"}} align="middle" justify="space-between">
                        <Col span={4}>
                            Үйлчлүүлэгчийн нэр
                        </Col>
                        <Col span={4}>Код</Col>
                        <Col span={4}>Төрсөн он сар өдөр</Col>
                        <Col span={4}>Хүйс</Col>
                        <Col span={4}>Өвчний мэдээлэл</Col>
                        <Col span={4}>Утасны дугаар</Col>
                    </Row>
                </div>
                <div style={{ width: "100%", backgroundColor: "white", borderRadius: "15px", padding: "10px" }}>
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />

                </div>
            </div>
        </>
    )
}

export default HomePage
