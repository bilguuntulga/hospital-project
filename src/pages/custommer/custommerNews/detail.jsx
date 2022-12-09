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
import { customerAPI, questionsAPI, treatmentsAPI } from "../../../apis";
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
  ThunderboltTwoTone,
} from "@ant-design/icons";
import ProfileImageUpload from "../../../components/form/ProfileImageUpload";
import { toast } from "react-toastify";
import Question1 from "../../../components/form/Question1";
import Question2 from "../../../components/form/Question2";
import PageLoading from "../../../components/PageLoading";
import ListImages from "../../../components/customers/ListImages";
import FormObserver from "../../../components/FormObserver";
import QuestionsBuilder from "../../../components/questions/QuestionsBuilder";
const { RangePicker } = DatePicker;
const { confirm } = Modal;

const columns = [
  {
    title: "",
    dataIndex: "",
    key: "",
  },
  {
    title: "",
    dataIndex: "",
    key: "",
  },
  {
    title: "",
    dataIndex: "",
    key: "",
  },
  {
    title: "",
    dataIndex: "",
    key: "",
  },
  {
    title: "",
    render: (_, row) => (
      <>
        <Button icon={<EditOutlined />} /> <Button icon={<DeleteOutlined />} />
      </>
    ),
  },
];

const customerModel = {
  phone: "",
  image: "",
  first_name: "",
  last_name: "",
  gender: "",
  blood_type: "",
  employment: "",
  desc: "",
  rate: "",
};

const platTreatmentModel = {
  basic_treatment: "",
  additional_treatment: "",
  basic_input: "",
  additional_input: "",
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
  phone: yup.string().required("Заавал бөгдөнө үү"),
  first_name: yup.string().optional(),
  last_name: yup.string().optional(),
  image: yup.string().optional(),
  gender: yup.string().required("Заавал бөгдөнө үү"),
  blood_type: yup.string().optional(),
  employment: yup.string().optional(),
  desc: yup.string().optional(),
  rate: yup.string().optional(),
});

const CustomerDetail = () => {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const [treadment, setTreadMent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isShowTreatmentModal, setIsShowTreatmentModal] = useState(false);
  const [isShowPlattratmentModal, setIsShowPlatTreatmentModal] =
    useState(false);
  const [customerInitialValues, setCustomerInitialValues] =
    useState(customerModel);
  const [treatmentInitialValues, setTreatmentInitialValues] =
    useState(treatmentModel);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const customer = await customerAPI.get(id);
    const questionsRes = await questionsAPI.list();
    setQuestions(questionsRes);

    if (customer.rate == "GOOD") customer.rate = true;
    else customer.rate = false;

    const treatments = await treatmentsAPI.list(id);
    setCustomer(customer);
    setCustomerInitialValues(customer);
    setTreadMent(treatments);
    setLoading(false);
  };

  const showPlatTreatmentModal = async () => {
    setIsShowPlatTreatmentModal(true);
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
    setIsShowPlatTreatmentModal(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsShowPlatTreatmentModal(false);
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
          start_time,
          end_time,
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
      title: `${customer?.first_name} ${customer?.last_name} хэрэглэгчийг устгахдаа итгэлтэй байна уу?`,
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

  const onChangeImages = async (values) => {
    if (!values) return;

    await customerAPI.update({
      id,
      ...values,
    });
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
        <Space>
          {new Date(row?.end_time) > new Date() ? (
            <>
              <Button
                icon={
                  <EditOutlined onClick={() => showTreatmentModal(row.id)} />
                }
              />
              <Button
                icon={
                  <DeleteOutlined onClick={() => showDeleteConfirm(row.id)} />
                }
              />
            </>
          ) : null}
        </Space>
      ),
    },
  ];

  if (loading) return <PageLoading />;

  return (
    <>
      <PageHeader title={<ArrowLeftOutlined onClick={() => navigate(-1)} />} />
      <div className="customer_detail_container">
        <div>
          <p style={{ fontSize: "24px", marginBottom: "0" }}></p>
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
                  className="delete__button"
                >
                  Устгах
                </Button>
              </Space>
              <Modal
                open={isShowPlattratmentModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
                title="Төлөвлөгөөт эмчилгээ нэмэх"
              >
                <Formik initialValues={platTreatmentModel}>
                  <Form layout="vertical">
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item
                          label="Үндсэг эмчилгээ"
                          name="basic_treatment"
                        >
                          <Input name="basic_treatment" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="additional_treatment"
                          label="Нэмэлт эмчилгээ"
                        >
                          <Input name="additional_treatment" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item name="basic_input" label="Үндсэн оролт">
                          <Input name="basic_input" type="number" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Нэмэлт оролт" name="additional_input">
                          <Input type="number" name="additional_input" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <SubmitButton block icon={<SaveOutlined />}>
                      Хадаглах
                    </SubmitButton>
                  </Form>
                </Formik>
              </Modal>
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
                            <Form.Item name="employment" label="Ажил эрхлэлт">
                              <Input name="employment" />
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
          <Row style={{ width: "100%" }} gutter={[30, 30]} justify="center">
            <Col xl={8} xxl={4} lg={10}>
              <div className="custommer_detail_image">
                <img className="image" src={customer?.image} alt="" />
              </div>
            </Col>
            <Col xl={24} xxl={20} lg={24}>
              <div className="customer_detail_hystory">
                <p>Тайлбар</p>
                <p style={{ color: "rgba(39, 30, 74, 0.8);" }}>
                  {customer?.desc}
                </p>
                <br />
                <Row
                  gutter={10}
                  justify="space-between"
                  style={{ textAlign: "center" }}
                  wrap={true}
                >
                  <Col>
                    <p>Нэр</p>
                    {`${customer?.first_name} ${customer?.last_name}` ===
                    "Овог Нэр"
                      ? "-"
                      : `${customer?.first_name} ${customer?.last_name}`}
                  </Col>
                  <Col>
                    <p>Хүйс</p>
                    {customer?.family_status == "UNDIFINED"
                      ? "-"
                      : customer?.family_status == "MALE"
                      ? "Эрэгтэй"
                      : "Эмэгтэй"}
                  </Col>
                  <Col>
                    <p>Цусны бүлэг</p>
                    {customer?.family_status == "UNDIFINED"
                      ? "-"
                      : customer?.blood_type}
                  </Col>
                  <Col>
                    <p>Ажил эрхлэлт </p>
                    {customer?.employment == "UNDIFINED"
                      ? "-"
                      : customer?.employment}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <PageHeader title="Зургууд" />
          <Formik
            initialValues={{
              images: customer?.images ?? [],
            }}
          >
            <Form>
              <Form.Item name="images">
                <ListImages name="images" />
              </Form.Item>
              <FormObserver onChange={onChangeImages} />
            </Form>
          </Formik>
          <br />
          <div className="customer_detail_table">
            <PageHeader
              title="Төлөвлөгөөт эмчилгээ"
              extra={
                <Button
                  onClick={() => showPlatTreatmentModal()}
                  icon={<PlusOutlined />}
                >
                  Нэмэх
                </Button>
              }
            />
          </div>
          <br />
          <div className="customer_detail_table">
            <PageHeader
              title={`Эмчилгээ ${
                customer?.bonus
                  ? `${customer?.bonus?.discount}${
                      customer?.bonus?.type == "PERCENT" ? "%" : "₮"
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
              <Question2 id={id} />
            </Collapse.Panel>
            {questions?.map((question) => (
              <Collapse.Panel header={question?.title} key={question?.id}>
                <QuestionsBuilder id={question?.id} customer_id={id} />
              </Collapse.Panel>
            ))}
          </Collapse>
          <PageHeader title="Хоолны зөвлөгөө" />
          <Formik
            initialValues={{
              food_advice_images: customer?.food_advice_images ?? [],
            }}
          >
            <Form>
              <Form.Item name="food_advice_images">
                <ListImages name="food_advice_images" />
              </Form.Item>
              <FormObserver onChange={onChangeImages} />
            </Form>
          </Formik>
          <PageHeader title="Арьс арчилгааны зөвлөгөө" />
          <Formik
            initialValues={{
              skin_care_images: customer?.skin_care_images ?? [],
            }}
          >
            <Form>
              <Form.Item name="skin_care_images">
                <ListImages name="skin_care_images" />
              </Form.Item>
              <FormObserver onChange={onChangeImages} />
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default memo(CustomerDetail);
