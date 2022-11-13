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
    name: yup.string().min(5).required(),
    sur_name: yup.string().min(5).required(),
    email: yup.string().email().required(),
    phone: yup.number().min(8).required(),
    age: yup.number().required(),
    gender: yup.string().required(),
    family_status: yup.string().min(5).required(),
    blood_type: yup.string().required(),
    birthday: yup.string().min(5).required(),
    home_address: yup.string().min(5).required(),
    image: yup.string().required(),
    other: yup.string().optional(),
  })

  return (
    <div>
      <p style={{ fontSize: "20px" }}><b>Dasahboard</b></p>
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
            <Row>
              <Col>
                <Form.Item name="name">
                  <Input name='name' />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name="sur_name">
                  <Input name='sur_name' />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item name="eamil">
                  <Input name='eamil' />
                </Form.Item>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Item name="phone">
                      <Input name='phone' type='number' />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item name="age">
                      <Input type='number' name='age' />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>
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
                  <Col>
                    <Form.Item name="family_status">
                      <Input.TextArea name='family_status' />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Item name="blood_type">
                      <Input name='blood_type' />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item name="birthday">
                      <DatePicker name='birthday' />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Form.Item name="home_address">
              <Input name='home_address' />
            </Form.Item>
            <Row>
              <Col>
                <Form.Item name="image">
                  <Row>
                    <Col>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture"
                      >
                      </Upload>
                    </Col>
                    <Col>
                      <Button type='primary' icon={<UploadOutlined />}>Upload</Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
              <Col>
              <Form.Item name="other">
                <Input name='other'/>
              </Form.Item>
              </Col>
            </Row>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default RegistrationPage