import {
  Button,
  Col,
  Row,
  Space,
  Table,
  Modal,
  message,
  PageHeader,
  Collapse,
  Card,
} from "antd";
import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customerAPI, treatmentsAPI } from "../../../apis";
import "./style.css";
import * as yup from "yup";
import { Formik } from "formik";
import {
  Form,
  Input,
  SubmitButton,
  DatePicker,
  Select,
  Switch,
} from "formik-antd";
import moment from "moment";
import SelectService from "../../../components/form/SelectService";
import SelectDoctor from "../../../components/form/SelectDoctor";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import ProfileImageUpload from "../../../components/form/ProfileImageUpload";
import { toast } from "react-toastify";
import Question1 from "../../../components/form/Question1";
import Question2 from "../../../components/form/Question2";
const { RangePicker } = DatePicker;
const { confirm } = Modal;

const customerModel = {
  email: "",
  phone: "",
  address: "",
  image: "",
  first_name: "",
  last_name: "",
  gender: "",
  blood_type: "",
  family_status: "",
  desc: "",
  rate: "",
};

const treatmentModel = {
  doctor: "",
  services: [],
  date: [],
};

const treatmentValidationSchema = yup.object().shape({
  doctor: yup.string().required("Заавал бөглөнө үү"),
  services: yup.array().required("Заавал бөглөнө үү"),
  date: yup.array().required("Заавал бөглөнө үү"),
});

const customerValidationSchema = yup.object().shape({
  email: yup.string().email().required("Заавал бөгдөнө үү"),
  phone: yup.string().required("Заавал бөгдөнө үү"),
  address: yup.string().required("Заавал бөгдөнө үү"),
  first_name: yup.string().required("Заавал бөгдөнө үү"),
  last_name: yup.string().required("Заавал бөгдөнө үү"),
  image: yup.string().required("Заавал бөгдөнө үү"),
  gender: yup.string().required("Заавал бөгдөнө үү"),
  blood_type: yup.string().required("Заавал бөгдөнө үү"),
  family_status: yup.string().required("Заавал бөгдөнө үү"),
  desc: yup.string().optional(),
  rate: yup.string().optional(),
});

const CustomerDetail = () => {
  const [customerDetail, setCustomerDetail] = useState({});
  const [treadment, setTreadMent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowTreatmentModal, setIsShowTreatmentModal] = useState(false);
  const [customerInitialValues, setCustomerInitialValues] =
    useState(customerModel);
  const [treatmentInitialValues, setTreatmentInitialValues] =
    useState(treatmentModel);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const customer = await customerAPI.get(id);

    if (customer.rate == "GOOD") customer.rate = true;
    else customer.rate = false;

    const treatments = await treatmentsAPI.list(id);
    setCustomerDetail(customer);
    setCustomerInitialValues(customer);
    setTreadMent(treatments);
  };

  const showTreatmentModal = async (id) => {
    const res = await treatmentsAPI.get(id);
    res.doctor = res?.doctor?.id;
    res.customer = res?.customer?.id;

    const services = res.services;
    delete res.services;
    let serviceIds = [];
    for (let i = 0; i < services.length; i++) {
      serviceIds.push(services[i].id);
    }
    res.services = serviceIds;

    const startTime = moment(res?.start_time);
    const endTime = moment(res?.end_time);

    res.date = [startTime, endTime];

    setTreatmentInitialValues(res);
    setIsShowTreatmentModal(true);
  };

  const service_handleok = () => {
    setIsShowTreatmentModal(false);
  };

  const serviceCancel = () => {
    setIsShowTreatmentModal(false);
  };

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
    fetchData();
  }, []);

  const treatmentOnSubmit = async (values) => {
    const start_time = values.date[0];
    const end_time = values.date[1];
    delete values.date;

    try {
      if (values.id) {
        delete values.customer;
        delete values.created_by;
        delete values.updated_by;
        await treatmentsAPI.update({
          ...values,
          customer: id,
        });
      } else {
        await treatmentsAPI.create({
          ...values,
          customer: id,
          start_time,
          end_time,
        });
      }
      message.success("Амжилттай");
      fetchData();
      setIsShowTreatmentModal(false);
    } catch (error) {
      message.error(error?.message);
    }
  };

  const createTreatment = async () => {
    setTreatmentInitialValues(treatmentModel);
    setIsShowTreatmentModal(true);
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: `Устгах даа итгэлтэй байэа уу`,
      icon: <ExclamationCircleFilled />,
      okText: "Тийм",
      okType: "danger",
      cancelText: "Үгүй",
      async onOk() {
        await treatmentsAPI.remove(id);
        fetchData();
      },
    });
  };
  const customerDelete = async () => {
    confirm({
      title: `${customerDetail?.first_name} ${customerDetail?.last_name} хэрэглэгчийг устгахдаа итгэлтэй байна уу?`,
      icon: <ExclamationCircleFilled />,
      okText: "Тийм",
      okType: "danger",
      cancelText: "Үгүй",
      onOk: async () => {
        toast.promise(
          async () => {
            await customerAPI.remove(id);
            setIsModalOpen(false);
            message.success("Амжилттай");
            navigate(-1);
            await fetchData();
          },
          {
            pending: "Хадаглаж байна",
            error: "Амжилтгүй",
            success: "Амжилттай",
          }
        );
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const customerUpdate = async (values) => {
    delete values.created_by;
    delete values.updated_by;
    delete values.bonus;

    if (values.rate) values.rate = "GOOD";
    else values.rate = "BAD";

    toast.promise(
      async () => {
        customerAPI.update(values);
        setIsModalOpen(false);
        fetchData();
      },
      {
        pending: "Хадаглаж байна",
        error: "Амжилтгүй",
        success: "Амжилттай",
      }
    );
  };

  const columns = [
    {
      title: "Эмч",
      render: (_, row) => (
        <>
          {row?.doctor?.first_name} {row.doctor.last_name}
        </>
      ),
    },
    {
      title: "Авсан үйлчилгээ",
      render: (_, row) => row?.services?.map((ee) => ee?.name)?.join(", "),
    },
    {
      title: "Үнэ",
      render: (_, row) => <>{row.price}₮</>,
    },
    {
      title: "Огноо",
      render: (_, row) => moment(row?.created_at).format("YYYY/MM/DD "),
    },
    {
      title: "Үйлдэл",
      render: (_, row) => (
        <>
          <Button
            icon={<EditOutlined onClick={() => showTreatmentModal(row.id)} />}
          />
          &#160;{" "}
          <Button
            icon={<DeleteOutlined onClick={() => showDeleteConfirm(row.id)} />}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader title={<ArrowLeftOutlined onClick={() => navigate(-1)} />} />
      <div className="customer_detail_container">
        <div>
          <p style={{ fontSize: "24px", marginBottom: "0" }}>
          </p>
          <Row justify="end">
            <Col>
              <Space>
                <Button onClick={showModal} icon={<EditOutlined />}>
                  Засах
                </Button>
                <Button
                  color="danger"
                  onClick={() => customerDelete()}
                  icon={<DeleteOutlined />}
                >
                  Устгах
                </Button>
              </Space>
              <Modal
                footer={false}
                title={`${customerInitialValues?.first_name} ${customerInitialValues?.last_name}`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Formik
                  initialValues={customerInitialValues}
                  validationSchema={customerValidationSchema}
                  onSubmit={customerUpdate}
                >
                  <Form layout="vertical">
                    <Row justify="center" style={{ textAlign: "center" }}>
                      <Form.Item name="image">
                        <Col span={24}>
                          <ProfileImageUpload name="image" />
                        </Col>
                      </Form.Item>
                    </Row>
                    <Row gutter={30}>
                      <Col>
                        <Form.Item name="first_name" label="Овог">
                          <Input className="input" name="first_name" />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name="last_name" label="Нэр">
                          <Input className="input" name="last_name" />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name="email" label="И-Мэйл">
                          <Input className="input" name="email" />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name="phone" label="Утасны дугаар">
                          <Input className="input" name="phone" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="gender" name="gender">
                          <Select name="gender">
                            <Select.Option value="UNDIFINED">-</Select.Option>
                            <Select.Option value="MALE">Эрэгтэй</Select.Option>
                            <Select.Option value="FEMALE">
                              Эмэгтэй
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="blood_type" label="Цусны бүлэг">
                          <Select name="blood_type">
                            <Select.Option value="UNDIFINED">-</Select.Option>
                            <Select.Option value="1-O">1-O</Select.Option>
                            <Select.Option value="2-A">2-A</Select.Option>
                            <Select.Option value="3-B">3-B</Select.Option>
                            <Select.Option value="4-AB">4-AB</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Row gutter={30}>
                          <Col span={12}>
                            <Form.Item
                              name="family_status"
                              label="Гэр бүлийн байдал"
                            >
                              <Select name="family_status">
                                <Select.Option value="UNDIFINED">
                                  -
                                </Select.Option>
                                <Select.Option value="MARRIED">
                                  Гэрлэсэн
                                </Select.Option>
                                <Select.Option value="NOT_MARRIED">
                                  Гэрлээгүй
                                </Select.Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item label="Байдал" name="rate">
                              <Switch
                                name="rate"
                                checkedChildren="Сайн"
                                unCheckedChildren="Муу"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Form.Item name="address" label="Гэрийн хайг">
                          <Input.TextArea name="address" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item name="desc" label="Тайлбар">
                          <Input.TextArea
                            style={{ height: "90px" }}
                            name="desc"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <SubmitButton block icon={<SaveOutlined />}>
                      Хадгалах
                    </SubmitButton>
                  </Form>
                </Formik>
              </Modal>
            </Col>
          </Row>
          <br />
          <Row style={{ width: "100%" }} justify="space-between">
            <Col span={4}>
              <div className="custommer_detail_image">
                <img className="image" src={customerDetail?.image} alt="" />
              </div>
            </Col>
            <Col span={19}>
              <div className="customer_detail_hystory">
                <p>Тайлбар</p>
                <p style={{ color: "rgba(39, 30, 74, 0.8);" }}>
                  {customerDetail?.desc}
                </p>
                <br />
                <Row
                  justify="space-between"
                  style={{ textAlign: "center" }}
                  wrap={true}
                >
                  <Col>
                    <p>Нэр</p>
                    <p>
                      {`${customerDetail?.first_name} ${customerDetail?.last_name}` ===
                      "Овог Нэр"
                        ? "-"
                        : `${customerDetail?.first_name} ${customerDetail?.last_name}`}
                    </p>
                  </Col>
                  <Col>
                    <p>Утас</p>
                    <p>{customerDetail?.phone ?? "-"}</p>
                  </Col>
                  <Col>
                    <p>И-мэйл</p>
                    <p>{customerDetail?.email ?? "-"}</p>
                  </Col>
                  <Col>
                    <p>Хаяг</p>
                    {customerDetail?.address ?? "-"}
                  </Col>
                  <Col>
                    <p>Хүйс</p>
                    {customerDetail?.family_status == "UNDIFINED"
                      ? "-"
                      : customerDetail?.family_status == "MALE"
                      ? "Эрэгтэй"
                      : "Эмэгтэй"}
                  </Col>
                  <Col>
                    <p>Цусны бүлэг</p>
                    {customerDetail?.family_status == "UNDIFINED"
                      ? "-"
                      : customerDetail?.blood_type}
                  </Col>
                  <Col>
                    <p>Гэр бүлийн байдал</p>
                    {customerDetail?.family_status == "UNDIFINED"
                      ? "-"
                      : customerDetail?.family_status == "MERRIED"
                      ? "Гэрлэсэн"
                      : "Гэрлээгүй"}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <br />
          <div className="customer_detail_table">
            <PageHeader
              title={`Эмчилгээ ${
                customerDetail?.bonus
                  ? `${customerDetail?.bonus?.discount}${
                      customerDetail?.bonus?.type == "PERCENT" ? "%" : "₮"
                    } хямдрал`
                  : ""
              }`}
              extra={
                <Button
                  onClick={() => createTreatment()}
                  icon={<PlusOutlined />}
                >
                  Нэмэх
                </Button>
              }
            />
            <Table
              bordere={false}
              columns={columns}
              dataSource={treadment}
              pagination={{ defaultPageSize: 10 }}
            />
            <Modal
              footer={false}
              title="Эмчилгээ"
              open={isShowTreatmentModal}
              onOk={service_handleok}
              onCancel={serviceCancel}
            >
              <Formik
                validationSchema={treatmentValidationSchema}
                initialValues={treatmentInitialValues}
                onSubmit={treatmentOnSubmit}
                enableReinitialize
              >
                {({ values }) => (
                  <Form layout="vertical">
                    <Form.Item name="doctor" label="Эмчийн нэр">
                      <SelectDoctor name="doctor" />
                    </Form.Item>
                    <Form.Item name="services" label="Үйлчилгээ">
                      <SelectService name="services" multi={true} />
                    </Form.Item>
                    <Form.Item name="date" label="Үйлчилгээ авах хугацаа">
                      <RangePicker name="date" style={{ width: "100%" }} />
                    </Form.Item>
                    <SubmitButton icon={<SaveOutlined />} block>
                      Хадаглах
                    </SubmitButton>
                  </Form>
                )}
              </Formik>
            </Modal>
          </div>
        </div>
        <br />
        <div className="customer_detail_table">
          <PageHeader title="Асуулт" />
          <Collapse>
            <Collapse.Panel header="1-р Асуултууд" key="1">
              <Question1 id={id} />
            </Collapse.Panel>
            <Collapse.Panel header="2-р Асуултууд" key="2">
              <Question2 />
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default CustomerDetail;
