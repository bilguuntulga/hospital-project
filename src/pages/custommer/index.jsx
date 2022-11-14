import { SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, Row, Input as AntInput, Select, Upload } from 'antd'
import { DatePicker, Form, Input, SubmitButton } from 'formik-antd'
import { Formik } from 'formik'
import * as yup from "yup"
import React from 'react'
import "./style.css"

const RegistrationPage = () => {

  const model = {
    name: "",
    sur_name: "",
    email: "",
    phone: 0,
    age: 0,
    gender: "",
    family_status: "",
    blood_type: "",
    birthday: "",
    home_address: "",
    image: "",
    other: "",
  }
  const validationSchema = yup.object().shape({
    name: yup.string().min(5).required("Заавал бөглөнө үү"),
    sur_name: yup.string().min(5).required("Заавал бөглөнө үү"),
    email: yup.string().email().required("Заавал бөглөнө үү"),
    phone: yup.number().min(8).required("Заавал бөглөнө үү"),
    age: yup.number().required("Заавал бөглөнө үү"),
    gender: yup.string().required("Заавал бөглөнө үү"),
    family_status: yup.string().min(5).required("Заавал бөглөнө үү"),
    blood_type: yup.string().required("Заавал бөглөнө үү"),
    birthday: yup.string().min(5).required("Заавал бөглөнө үү"),
    home_address: yup.string().min(5).required("Заавал бөглөнө үү"),
    image: yup.string().required("Заавал бөглөнө үү"),
    other: yup.string().optional(),
  })

  return (
    <div>
      <p style={{ fontSize: "20px" }}><b>Registration</b></p>
      <div className='search'>
        <Row gutter={25} style={{ margin: "auto" }}>
          <Col>
            <AntInput placeholder='Нэр' suffix={<SearchOutlined style={{ fontSize: "30px" }} />} />
          </Col>
          <Col>
            <AntInput placeholder='Утас' suffix={<SearchOutlined style={{ fontSize: "30px" }} />} />
          </Col>
          <Col>
            <AntInput placeholder='И-мэйл' suffix={<SearchOutlined style={{ fontSize: "30px" }} />} />
          </Col>
        </Row>
      </div>
      <div className="custommer_news">
        <Formik initialValues={model} validationSchema={validationSchema}>
          <Form>
            <Row gutter={30} justify="space-between">
              <Col span={12}>
                <Form.Item name="name">
                  <Input className='input' placeholder='Нэр' name='name' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="sur_name">
                  <Input placeholder='Овог нэр' className='input' name='sur_name' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={12}>
                <Form.Item name="eamil">
                  <Input className='input' placeholder='И-мэйл' name='eamil' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item name="phone">
                      <Input className='input' name='phone' placeholder='Утас' type='number' />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="age">
                      <Input className='input' type='number' placeholder='Нас' name='age' />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={12}>
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item name="gender">
                      <Select name="gender">
                        <Select.Option>
                          Эрэгтэй
                        </Select.Option>
                        <Select.Option>
                          Эмэгтэй
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="family_status">
                      <Input placeholder='Гэр бүлийн байдал' className='input' name='family_status' />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item name="blood_type">
                      <Input className='input' name='blood_type' placeholder='Цусны бүлэг' />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="birthday">
                      <DatePicker name='birthday' style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Form.Item name="home_address">
              <Input className='input' name='home_address' placeholder='Гэрийн хаяг' />
            </Form.Item>
            <Row gutter={30}>
              <Col span={12}>
                <Form.Item name="image">
                  <Row>
                    <Col>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture"
                        className="upload-list-inline"
                      >
                        <Button className='upload_button' icon={<UploadOutlined />}>Зураг оруулах</Button>
                      </Upload>
                    </Col>
                    <Col>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="other">
                  <Input className='input' name='other' placeholder='Бусад' />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end">
              <SubmitButton className='save_button'>Хадгалах</SubmitButton>
            </Row>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default RegistrationPage