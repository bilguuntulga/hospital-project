import { Button, Card, Col, Row, Space, Table, Modal, Descriptions, message, PageHeader, Select, } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { customerAPI, treadmentsAPI, doctorAPI } from '../../../apis';
import "./style.css"
import * as yup from "yup"
import { Formik } from 'formik';
import { Form, Input, SubmitButton, DatePicker } from 'formik-antd';
import moment from 'moment';
import UploadImage from "../../../components/form/UploadImage";
import SelectService from '../../../components/form/SelectService';
import SelectDoctor from "../../../components/form/SelectDoctor";
import { DeleteOutlined, EditFilled, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { toast } from 'react-toastify';
const { RangePicker } = DatePicker;
const { confirm } = Modal;

const model = {
  email: "",
  phone: "",
  address: "",
  image: "",
  first_name: "",
  last_name: "",
}

const serviceCreateModel = {
  doctor: "",
  services: [],
  date: []
}

const serviceValidationSchema = yup.object().shape({
  doctor: yup.string().required("Заавал бөглөнө үү"),
  services: yup.array().required("Заавал бөглөнө үү"),
  date: yup.array().required("Заавал бөглөнө үү"),
})

const showDeleteConfirm = (id) => {
  confirm({
    title: `Устгахдаа итгэлтэй байэа уу`,
    icon: <ExclamationCircleFilled />,
    okText: 'Тийм',
    okType: 'danger',
    cancelText: 'Үгүй',
    async onOk() {
      await treadmentsAPI.remove(id)
    },
    onCancel() {
    },
  });
};

const Detail = () => {
  const [customerdetail, setCustomerDetail] = useState({});
  const [treadment, setTreadMent] = useState([])
  const [doctorData, setDoctorData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isServiceModal, setIsServiceModal] = useState(false)
  const [initialValues, setInitialValues] = useState(model);
  const [onetreadmentdata, setOneTreadmentData] = useState(serviceCreateModel)
  const { id } = useParams();
  const now = new Date();

  const fetechData = async () => {
    const res = await customerAPI.get(id)
    const res2 = await treadmentsAPI.list(id)
    const doctorRes = await doctorAPI.list();
    setDoctorData(doctorRes)
    setCustomerDetail(res)
    setInitialValues(res);
    setTreadMent(res2)
  }
  const serviceShowModal = async (id) => {
    const res = await treadmentsAPI.get(id);
    res.doctor = res?.doctor?.id;
    res.customer = res?.customer?.id;
    let servicesIds = [];

    const services = res.services;
    delete res.services;
    let service_ids = [];
    for (let i = 0; i < services.length; i++) {
      service_ids.push(services[i].id);
    }
    res.services = service_ids;

    const startTime = moment(res?.start_time);
    const endTime = moment(res?.end_time);

    res.date = [startTime, endTime];

    setOneTreadmentData(res)
    setIsServiceModal(true)
  }

  const service_handleok = () => {
    setIsServiceModal(false)
  }

  const serviceCancel = () => {
    setIsServiceModal(false)
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
  const serviceOnSubmit = async (values) => {
    const start_time = values.date[0];
    const end_time = values.date[1];
    delete values.date;

    try {
      await treadmentsAPI.create({
        ...values,
        customer: id,
        start_time,
        end_time
      })
      message.success("Амжилттай")
    } catch (error) {
      message.error(error)
    }
  }

  const onCreate = async () => {
    setOneTreadmentData(serviceCreateModel);
    setIsServiceModal(true);
  }

  const Submit = async (values) => {
    console.log(values)
    delete values.created_by;
    delete values.updated_by;
    toast.promise(
      async () => {
        if (values.id)
          await treadmentsAPI.update(values);
        else
          await treadmentsAPI.create(values);

        serviceShowModal(false)
      },
      {
        pending: "Хадаглаж байна",
        error: "Амжилтгүй",
        success: "Амжилттай",
      }
    );

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
    },
    {
      title: "Үйлдэд",
      render: (_, row) => <><Button icon={<EditOutlined onClick={() => serviceShowModal(row.id)} />} />&#160; <Button icon={<DeleteOutlined onClick={() => showDeleteConfirm(row.id)} />} /></>

    }
  ]

  return (
    <>
      <div className='customer_detail_container'>
        <div>

          <p style={{ fontSize: "24px", marginLeft: "50px", marginBottom: "0" }}>Үйлчлүүлэгчийн мэдээлэл</p>
          <Row justify="end">
            <Col style={{ marginRight: "30px" }}>
              <Space><Button style={{ backgroundColor: "#FF706F", borderRadius: "5px", width: "154px", height: "29px", color: "white", border: "none" }}>Устгах</Button><Button onClick={showModal} style={{ backgroundColor: "#CA79C6", borderRadius: "5px", width: "154px", height: "29px", color: "white", border: "none" }}>Шинэчлэх</Button></Space>
              <Modal footer={false} title={`${initialValues?.first_name}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={Submit}>
                  <Form layout='vertical'>
                    <Row gutter={30}>
                      <Col>
                        <Form.Item name="first_name" label="Нэр">
                          <Select>
                            <Select.Option></Select.Option>
                          </Select>
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
                <PageHeader extra={<Button onClick={() => onCreate()}>Үйлчилгээ нэмэх</Button>} />
                <Table bordere={false} columns={columns} dataSource={treadment} pagination={{ defaultPageSize: 3 }} />
                <Modal footer={false} title=" " open={isServiceModal} onOk={service_handleok} onCancel={serviceCancel}>
                  <Formik validationSchema={serviceValidationSchema} initialValues={onetreadmentdata} onSubmit={serviceOnSubmit} enableReinitialize>
                    {({ values }) => <Form layout='vertical'>
                      <Form.Item name="doctor">
                        <SelectDoctor name="doctor" />
                      </Form.Item>
                      <Form.Item name="services">
                        <SelectService name="services" multi={true} />
                      </Form.Item>
                      <Form.Item name="date">
                        <RangePicker name='date' style={{ width: "100%" }} />
                      </Form.Item>
                      <SubmitButton block>Үүсгэх</SubmitButton>
                    </Form>}
                  </Formik>
                </Modal>
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