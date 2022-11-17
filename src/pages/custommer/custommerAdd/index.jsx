import { SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, Row, Select, Upload, Checkbox } from 'antd'
import { DatePicker, Form, Input, SubmitButton } from 'formik-antd'
import { Formik } from 'formik'
import * as yup from "yup"
import React, { useEffect, useState } from 'react'
import "./style.css"
import Services from '../../../Components/services'
import { servicesAPI, ServicesAPI } from '../../../apis'

const RegistrationPage = () => {
  const [servicebool, setServiceBool] = useState(false)
  const [servicesdata, setServicesDate] = useState([])

  const fetchData = async () => {
    const res = await servicesAPI.get();
    setServicesDate(res)
  }
  useEffect(() => {
    fetchData()
  }, [])

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
  const doctorModel = {
    package: "",
    choose_treatment: "",
    planned_treatment: "",
    doctorname: "",
    image: "",
    other: "",
    desc: "",
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

  const doctorvalidationSchema = yup.object().shape({
    package: yup.string().required("Заавал бөглөнө үү"),
    choose_treatment: yup.string().required("Заавал бөглөнө үү"),
    planned_treatment: yup.string().required("Заавал бөглөнө үү"),
    doctorname: yup.string().required("Заавал бөглөнө үү"),
    image: yup.string().required("Заавал бөглөнө үү"),
    other: yup.string().required("Заавал бөглөнө үү"),
    desc: yup.string().required("Заавал бөглөнө үү"),
  })
  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  return (
    <div>
      <p style={{ fontSize: "20px" }}><b>Registration</b></p>
      <div className="custommer_news">
        <Formik initialValues={model} validationSchema={validationSchema}>
          <Form>
            <Row gutter={30} justify="space-between">
              <Col span={12}>
                <Form.Item name="name">
                  <Input className='input' placeholder='Нэр' name='name' />
                </Form.Item>
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
                      <Select name="gender" className='input' bordered={false}>
                        <Select.Option >
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
                      <DatePicker name='birthday' style={{ width: "100%" }} className='input' />
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
      <div className='custommer_news'>
        <p style={{ fontSize: "24px" }}>Эмчилгээний төрөл</p>
        <Formik initialValues={doctorModel} validationSchema={doctorvalidationSchema}>
          <Form>

            <Row gutter={30}>
              <Col span={12}>
                <Form.Item name="package">
                  <Select name="package" placeholder="Багц сонгох" style={{ width: "100%" }} bordered={false} className="input">
                    <Select.Option >
                      aaaa
                    </Select.Option>
                    <Select.Option >
                      bbb
                    </Select.Option>
                    <Select.Option >
                      cccc
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="choose_treatment">
                  <Select placeholder="Эмчилгээ сонгох" name="choose_treatment" style={{ width: "100%" }} className="input" bordered={false}>
                    <Select.Option >
                      aaaa
                    </Select.Option>
                    <Select.Option >
                      bbb
                    </Select.Option>
                    <Select.Option >
                      cccc
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={12} style={{ marginTop: "30px" }}>
                <Form.Item name="planned_treatment">

                  <Select placeholder="Төлөвлөгөөт эмчилгээ" name="planned_treatment" style={{ width: "100%" }} bordered={false} className="input">
                    <Select.Option >
                      aaaa
                    </Select.Option>
                    <Select.Option >
                      bbb
                    </Select.Option>
                    <Select.Option >
                      cccc
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="doctorname">
                  <Select placeholder="Эмчийн нэр" name="doctorname" style={{ width: "50%" }} className="input" bordered={false}>
                    <Select.Option >
                      aaaa
                    </Select.Option>
                    <Select.Option >
                      bbb
                    </Select.Option>
                    <Select.Option >
                      cccc
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={12}>
                <Form.Item name="image">
                  <Select placeholder="Эмчийн нэр" name="image" style={{ width: "50%" }} className="input" bordered={false}>
                    <Select.Option >
                      aaaa
                    </Select.Option>
                    <Select.Option >
                      bbb
                    </Select.Option>
                    <Select.Option >
                      cccc
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="other">
                  <Input className='input' name='other' placeholder='Бусад' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10} align='bottom'>
              <Col span={20}>
                <Form.Item name="desc">
                  <Input.TextArea style={{ height: "151px", borderRadius: "10px" }} name='desc' placeholder='Дэлгэрэнгүй*' />
                </Form.Item>
              </Col>
              <Col>
                <SubmitButton style={{ marginTop: "110px" }} className='save_button'>Хадгалах</SubmitButton>
              </Col>
            </Row>
          </Form>
        </Formik>
      </div>
      <br />
      <div style={{ width: "100%", borderRadius: "15px", backgroundColor: "white", padding: "40px" }}>
        <Row justify="end">
          <Col>
            {servicebool ? <Button className='save_button'>Хадгалах</Button> : <Button onClick={() => setServiceBool(!servicebool)} className='save_button'>Үйлчилгээ авах</Button>}

          </Col>
        </Row>
        <br />
        {servicebool ? <Row gutter={[50, 50]}>
          {servicesdata.map((e) => <Col span={4}>
            <div style={{ borderRadius: "15px", border: "1px solid gray", padding: "10px", textAlign: "center" }}>
              <Services images={e?.images} name={e?.name} price={e?.price} />
              {/* <Checkbox value={e.id} /> */}
              <Checkbox.Group

              />
            </div>
          </Col>)}

        </Row> : null}
      </div>
    </div>
  )
}

export default RegistrationPage