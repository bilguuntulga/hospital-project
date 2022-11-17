import React, { useEffect, useState } from 'react'
import { Formik, validateYupSchema } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { Col, Row } from 'antd'
import "./style.css"
import CunstommerNews from '../../../components/cunstommerNews'
import { SearchOutlined } from '@ant-design/icons'
import * as yup from "yup"
import { customerAPI } from '../../../apis'



function CustommerNewsPage() {
    const [customers, setCustomers] = useState([])
    const fetchData = async () => {
        const res = await customerAPI.list();
        setCustomers(res)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const model = {
        nameSearch: "",
        phoneSearch: "",
        emailSearch: "",
    }
    const validationSchema = yup.object().shape({
        nameSearch: yup.string().optional(),
        phoneSearch: yup.string().optional(),
        emailSearch: yup.string().optional(),

    })

    return (
        <>
            <div className="container">

                <div className='search_inputs' style={{ width: "819px", height: "59px", backgroundColor: "white", borderRadius: "23px" }}>
                    <Formik validationSchema={validationSchema} initialValues={model}>
                        <Form>
                            <Row gutter={60} >
                                <Col span={8}>
                                    <Form.Item name="nameSearch">
                                        <Input className='inputs' name="nameSearch" placeholder='Нэр' suffix={<SearchOutlined />} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="phoneSearch">
                                        <Input className='inputs' name="phoneSearch" placeholder='Утас' suffix={<SearchOutlined />} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="emailSearch">
                                        <Input className='inputs' name="emailSearch" placeholder='И-мэйл' suffix={<SearchOutlined />} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Formik>
                </div>
                <div style={{ width: "100%", height: "69px", backgroundColor: "#D6ECFD", borderRadius: "15px", padding: "20px", display: "grid", placeItems: "center", marginTop: "40px" }}>
                    <Row justify="space-between" style={{ width: "100%" }} align="middle">
                        <Col span={4}>
                            Үйлчлүүлэгчийн нэр
                        </Col>
                        <Col span={4}>Төрсөн он сар өдөр</Col>
                        <Col span={4}>Хүйс</Col>
                        <Col span={4}>Утасны дугаар</Col>
                        <Col span={4}>Үйлдэл</Col>
                    </Row>

                </div>
                <div style={{ width: "100%", backgroundColor: "white", borderRadius: "15px", padding: "15px", marginTop: "10px" }}>
                    {customers.map((e) => <CunstommerNews image={e?.image} name={e?.last_name} birthday={e?.birthday} gender={e?.gender} disease_information="Ханиад" phone={e?.phone} id={e.id} />)}

                </div>
            </div>
        </>
    )
}

export default CustommerNewsPage