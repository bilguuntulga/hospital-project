import React from 'react'
import { Button, Col, PageHeader, Row, Table } from 'antd'
import './style.css'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// import Calendar from "./calendat"

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
            title: 'Өвчтөны нэр',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Хариуцсан эмч',
            dataIndex: 'age',
            key: 'age',
        },

        {
            title: 'Өдөр',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Өвчлөл',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: "*",
            render: (_, row) => <><Button className='table_button' icon={<EditOutlined />} /><Button className='table_button' icon={<DeleteOutlined />} /></>,
            align: "center"
        }
    ];
    const doctorDatas = [
        {
            key: '1',
            Image: 'doctor.png',
            name: "Наранбаатар",
            status: 'impossible',
        },
        {
            key: '2',
            Image: 'doctor.png',
            name: "Мөнх-эрдэнэ",
            status: 'possible',
        },
        {
            key: '3',
            Image: 'doctor.png',
            name: "Билгүүнтулга",
            status: 'impossible',
        },
    ];
    const doctors = [
        {
            title: "Зураг",
            dataIndex: "photo",
            key: "photo",
        },
        {
            title: "нэр",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status"
        }
    ]
    return (
        <>
            <p style={{ fontSize: "20px" }}><b>Dasahboard</b></p>
            <Row justify="space-between" style={{ width: "70%" }}>
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
            <Row style={{ marginTop: "40px" }} gutter={35} >
                <Col span={14}>
                    <div className="order_time">
                        <PageHeader title="Захиалсан цаг" />
                        <Table dataSource={dataSource} columns={columns} />
                    </div>
                </Col>
                <Col span={10}>
                    <div className="docters">
                        <PageHeader title="Эмч нар" />
                        <Table dataSource={doctorDatas} columns={doctors} />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default HomePage
