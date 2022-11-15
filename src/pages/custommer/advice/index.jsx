import { SearchOutlined } from '@ant-design/icons'
import { Col, Row, Space } from 'antd'
import { Formik } from 'formik'
import { Input, Form } from 'formik-antd'
import React from 'react'
import * as yup from "yup"
import "./style.css"
import Advice from '../../../Components/advice'


function AdvicePage() {

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
    <div>
      <div className='search_inputs' style={{ width: "819px", height: "59px", backgroundColor: "white", borderRadius: "23px", display: "grid", placeItems: "center" }}>
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
      <br />
      <Space direction="vertical" style={{width:"100%"}}>
        <Advice name="Ц.Оргил" phone="95646214" />
        <Advice name="Ц.Оргил" phone="95646214" />
        <Advice name="Ц.Оргил" phone="95646214" />
        <Advice name="Ц.Оргил" phone="95646214" />
        <Advice name="Ц.Оргил" phone="95646214" />
        <Advice name="Ц.Оргил" phone="95646214" />
      </Space>
    </div>
  )
}

export default AdvicePage