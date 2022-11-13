import React from 'react'
import { Col, PageHeader, Row,Table } from 'antd'
import './style.css'

function HomePage() {


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
            <p style={{ fontSize: "20px" }}><b>Dasahboard</b></p>
            <Row justify="space-between" style={{ width: "100%" }}>
                <Col span={6}>
                    <div className='columns'>
                        <Row style={{ width: "100%", paddingTop: "10px" }}>
                            <Col span={10}>
                                <img src="dashboardCol1.png" alt="" />
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
                                <img src="dashboardCol2.png" alt="" />
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
                                <img src="dashboardCol3.png" alt="" />
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
                                <img src="dashboardCol4.png" alt="" />
                            </Col>
                            <Col span={14}>
                                <p style={{ margin: "0", fontSize: "20px" }}>Амбултор</p>
                                <p>20</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginTop: "40px" }} >
                <Col span={14}>
                    <div className="order_time">
                        <PageHeader title="Захиалсан цаг" />
                        <Table dataSource={dataSource} columns={columns} />
                    </div>
                </Col>
                <Col span={10}>
                </Col>
            </Row>
        </>
    )
}

export default HomePage