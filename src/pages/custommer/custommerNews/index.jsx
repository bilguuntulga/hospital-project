import React from 'react'
import { Formik, validateYupSchema } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { Col, Row } from 'antd'
import "./style.css"
import CunstommerNews from '../../../Components/cunstommerNews'
import { SearchOutlined } from '@ant-design/icons'
import * as yup from "yup"



function CustommerNewsPage() {

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
                    <Row style={{ width: "100%" }} align="middle" justify="center">
                        <Col span={4}>
                            Үйлчлүүлэгчийн нэр
                        </Col>
                        <Col span={3}>Код</Col>
                        <Col span={3}>Төрсөн он сар өдөр</Col>
                        <Col span={3}>Хүйс</Col>
                        <Col span={3}>Өвчний мэдээлэл</Col>
                        <Col span={3}>Утасны дугаар</Col>
                        <Col span={3}>Үйлдэл</Col>
                    </Row>

                </div>
                <div style={{ width: "100%", backgroundColor: "white", borderRadius: "15px", padding: "15px", marginTop: "10px" }}>

                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
                    <CunstommerNews image="ninja.png" name="Ц.Оргил" code="0001" birthday="2021.10.11" gander="Эрэгтэй" disease_information="Ханиад" phone="95646214" />
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

export default CustommerNewsPage