import { Button, Card, Col, Row, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { customerAPI, treadmentsAPI } from '../../../apis';
import "./style.css"
import * as yup from "yup"
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd';
import moment from 'moment';

const Detail = () => {
  const [customerdetail, setCustomerDetail] = useState({});
  const [treadment, setTreadMent] = useState([])

  const fetechData = async () => {
    const res = await customerAPI.get(id)
    const res2 = await treadmentsAPI.list(id)
    setCustomerDetail(res)
    setTreadMent(res2)
  }
  useEffect(() => {
    fetechData()
  }, [])
  const model = {
    email: "",
    phone: "",
    address: "",
    image: ""
  }
  const validationSchema = {
    email: yup.string().email().required("Заавал бөгдөнө үү"),
    phone: yup.number().required("Заавал бөгдөнө үү"),
    address: yup.string().required("Заавал бөгдөнө үү")
  }

  const columns = [
    {
      title: "Огноо",
      render: (_, row) => moment(row?.created_at).format("YYYY.MM.DD.hh "),
    },
    {
      title: "Эмч",
      render: (_, row) => <>{row?.doctor?.first_name}.{row.doctor.last_name}</>
    },
    {
      title: "Авсан үйлчилгээ",
      render: (_, row) => row.service?.name,
    },
    {
      title: "Төлбөр",
      render: (_, row) => <>{row.service?.price}₮</>,

    }
  ]

  const { id } = useParams();
  return (
    <>
      <div className='customer_detail_container'>
        <div>

          <p style={{ fontSize: "24px", marginLeft: "50px", marginBottom: "0" }}>Үйлчлүүлэгчийн мэдээлэл</p>
          <Row justify="end">
            <Col style={{ marginRight: "30px" }}>
              <Space><Button style={{ backgroundColor: "#FF706F", borderRadius: "5px", width: "154px", height: "29px", color: "white", border: "none" }}>Устгах</Button><Button style={{ backgroundColor: "#CA79C6", borderRadius: "5px", width: "154px", height: "29px", color: "white", border: "none" }}>Шинэчлэх</Button></Space>
            </Col>
          </Row>
          <br />
          <Row style={{ marginLeft: "30px" }}>
            <Col span={5}>
              <div className='custommer_detail_image'>
                <img src={customerdetail?.image} style={{ borderRadius: "47px" }} width="200px" height="200px" alt="" />
              </div>
            </Col>
            <Col span={19}>
              <div className='customer_detail_hystory'>
                <p>Өвчтөны түүх</p>
                <p style={{ color: "gray" }}>{customerdetail?.other}</p>

                <Formik initialValues={model} validationSchema={validationSchema}>
                  <Form layout='vertical'>
                    <Row gutter={30}>
                      <Col>
                        <Form.Item name="eamil" label="И-Мэйл">
                          <Input className='input' name='email' />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name="phone" label="Утасны дугаар">
                          <Input className='input' name='phone' />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name="address" label="Хаяг">
                          <Input className='input' name='address' />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Formik>
              </div>
            </Col>
          </Row>
          <br />
          <Row style={{ marginLeft: "30px" }} gutter={20} style={{width:"100"}}>
            <Col span={14}>
              <div className='customer_detail_table'>

                <Table bordere={false} columns={columns} dataSource={treadment} pagination={{ defaultPageSize: 4 }} />
              </div>
            </Col>
            <Col span={8}>
              <div className='general_information'>

              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Detail