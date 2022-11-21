import React, { memo, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { servicesAPI } from '../../apis';
import PageLoading from '../../components/PageLoading';
import * as yup from "yup"
import { Formik } from 'formik';
import { Form, Input, Select, SubmitButton } from 'formik-antd';
import SelectService from '../../components/form/SelectService';
import { Button, Col, Image, Row } from 'antd';
import { DeleteColumnOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from "react-toastify";

const model = {
  name: "",
  desc: "",
  type: "",
  price: 0,
  services: [],
  images: [],
}


function ServiceDetail() {
  const [serviceonedata, setServiceOneData] = useState(model)
  const [loading, setLoading] = useState(true)
  const { id } = useParams();
  const validationSchema = yup.object().shape({
    name: yup.string().required("Заавал бөглөнө үү."),
    desc: yup.string().optional(),
    type: yup.string().required("Заавал бөглөнө үү."),
    price: yup.number().required("Заавал бөглөнө үү."),
    services: yup.array().required("Заавал бөглөнө үү."),
    images: yup.array().required("Заавал бөглөнө үү."),
  })
  const onSubmit = async (values) => {
    delete values.created_by;
    delete values.updated_by;
    toast.promise(
      async () => {
        await servicesAPI.update(values);
        await fetchData();
      },
      {
        pending: "Хадаглаж байна",
        error: "Амжилтгүй",
        success: "Амжилттай",
      }
    );
  };
  const fetchData = async () => {
    setLoading(true)
    const res = await servicesAPI.oneGet(id);
    setServiceOneData(res)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  if (loading) return <PageLoading />

  return (
    <div className='service__detail'>
      <Formik initialValues={serviceonedata} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <Row>
            <Col span={6}>
              <Image src='./ninja.png' />
            </Col>
            <Col span={18}>
              <Form.Item name="name">
                <Input name="name" />
              </Form.Item>
              <Form.Item name="desc">
                <Input name="desc" />
              </Form.Item>
              <Form.Item name="type">
                <Select name='type'>
                  <Select.Option value="PACKAGE">
                    Багц
                  </Select.Option>
                  <Select.Option value="BASIC">
                    Үндсэн
                  </Select.Option>
                  <Select.Option value="ADDITIONAL">
                    Нэмэлт
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="price">
                <Input type='number' name="price" />
              </Form.Item>
              <Form.Item name="services">
                <SelectService name="services" multi={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12} justify="end">
            <Col>
              <Button htmlType='submit'>Хадаглаж</Button>
            </Col>
            <Col>
              <Button icon={<DeleteOutlined />}>Устгах</Button>
            </Col>
          </Row>
          <ToastContainer />

        </Form>
      </Formik>
    </div>

  )
}

export default memo(ServiceDetail)