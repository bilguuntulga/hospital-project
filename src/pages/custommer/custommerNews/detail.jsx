import { Button, Card, Col, Row, Space, Table, Modal, Descriptions, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { customerAPI, treadmentsAPI } from '../../../apis';
import "./style.css"
import * as yup from "yup"
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import moment from 'moment';
import UploadImage from "../../../components/form/UploadImage";


const model = {
  email: "",
  phone: "",
  address: "",
  image: "",
  first_name: "",
  last_name: "",
}

const Detail = () => {
  const [customerdetail, setCustomerDetail] = useState({});
  const [treadment, setTreadMent] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState(model);


  const fetechData = async () => {
    const res = await customerAPI.get(id)
    const res2 = await treadmentsAPI.list(id)
    setCustomerDetail(res)
    setInitialValues(res);
    setTreadMent(res2)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetechData()
  }, [])

  const validationSchema = {
    email: yup.string().email().required("Заавал бөгдөнө үү"),
    phone: yup.number().required("Заавал бөгдөнө үү"),
    address: yup.string().required("Заавал бөгдөнө үү"),
    first_name: yup.string().required("Заавал бөгдөнө үү"),
    last_name: yup.string().required("Заавал бөгдөнө үү"),
    image: yup.string().required("Заавал бөгдөнө үү")
  }
  const Submit = async (values) => {
    console.log(values)
    try {
      await customerAPI.update(values)
      message.success("Амжилттай")
    } catch (error) {
      message.error(error)
    }
  }
  const columns = [
    {
      title: "Огноо",
      render: (_, row) => moment(row?.created_at).format("YYYY.MM.DD.hh "),
    },
    {
      title: "Эмч",
      render: (_, row) => <>{row?.doctor?.first_name} {row.doctor.last_name}</>
    },
    {
      title: "Авсан үйлчилгээ",
      render: (_, row) => row?.services?.map((ee) => <p>{ee?.name}</p>),
    },
    {
      title: "Төлбөр",
      render: (_, row) => <>{row.price}₮</>,

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
              <Space><Button style={{ backgroundColor: "#FF706F", borderRadius: "5px", width: "154px", height: "29px", color: "white", border: "none" }}>Устгах</Button><Button onClick={showModal} style={{ backgroundColor: "#CA79C6", borderRadius: "5px", width: "154px", height: "29px", color: "white", border: "none" }}>Шинэчлэх</Button></Space>
              <Modal footer={false} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={Submit}>
                  <Form layout='vertical'>
                    <Row gutter={30}>
                      <Col>
                        <Form.Item name="first_name" label="Нэр">
                          <Input className='input' name='first_name' />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name="last_name" label="Нэр">
                          <Input className='input' name='last_name' />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name="email" label="И-Мэйл">
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
                      <Col>
                        <Form.Item name="image" label="Хаяг">
                          <UploadImage name="image" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <SubmitButton htmlType='submit'>Хадгалах</SubmitButton>
                  </Form>
                </Formik>
              </Modal>
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
                <p style={{ color: "rgba(39, 30, 74, 0.8);" }}>{customerdetail?.other}</p>
                <br />
                <Row justify="space-between" style={{ width: "70%" }} >
                  <Col>
                    <p>Нэр</p>
                    <p> {customerdetail?.first_name} {customerdetail?.last_name}</p>
                  </Col>
                  <Col>
                    <p>N-мэйл</p>
                    <p>{customerdetail.email}</p>
                  </Col>
                  <Col>
                    <p>Хаяг</p>
                    {customerdetail.address}
                  </Col>
                </Row>

              </div>
            </Col>
          </Row>
          <br />
          <Row style={{ marginLeft: "30px" }} gutter={20}>
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