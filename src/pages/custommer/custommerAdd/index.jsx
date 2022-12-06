import { Card, Col, PageHeader, Row } from "antd";
import { DatePicker, Form, Input, SubmitButton, Select } from "formik-antd";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import "./style.css";
import Services from "../../../components/services";
import { customerAPI, servicesAPI, ServicesAPI } from "../../../apis";
import ProfileImageUpload from "../../../components/form/ProfileImageUpload";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const model = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    family_status: "",
    blood_type: "",
    birthday: "",
    address: "",
    image: "",
    desc: "",
  };
  const validationSchema = yup.object().shape({
    first_name: yup.string().required("Заавал бөглөнө үү"),
    last_name: yup.string().required("Заавал бөглөнө үү"),
    email: yup.string().email().required("Заавал бөглөнө үү"),
    phone: yup.string().min(8).required("Заавал бөглөнө үү"),
    gender: yup.string().required("Заавал бөглөнө үү"),
    family_status: yup.string().required("Заавал бөглөнө үү"),
    blood_type: yup.string().required("Заавал бөглөнө үү"),
    birthday: yup.string().required("Заавал бөглөнө үү"),
    address: yup.string().required("Заавал бөглөнө үү"),
    image: yup.string().optional(),
    desc: yup.string().optional(),
  });

  const onFinish = async (values) => {
    try {
      await customerAPI.create(values);
      navigate(-1);
    } catch (error) {}
  };

  return (
    <div>
      <PageHeader title={<ArrowLeftOutlined onClick={() => navigate(-1)} />} />
      <div className="custommer_news">
        <Formik
          initialValues={model}
          validationSchema={validationSchema}
          onSubmit={onFinish}
        >
          <Form layout="vertical">
            <Card
              title="Хэрэглэгч нэмэх"
              bordered={false}
              extra={<SubmitButton>Хадгалах</SubmitButton>}
            >
              <Row justify="center">
                <Col span={6} style={{ display: "grid", placeItems: "center" }}>
                  <Form.Item name="image">
                    <ProfileImageUpload name="image" />
                    <br />
                    <b>Профайл зураг </b>
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Row gutter={30} justify="space-between">
                    <Col span={12}>
                      <Form.Item name="first_name" label="Овог">
                        <Input
                          className="input"
                          placeholder="Овог"
                          name="first_name"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="last_name" label="Нэр">
                        <Input
                          placeholder="Нэр"
                          className="input"
                          name="last_name"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Form.Item name="email" label="И-мэйл">
                        <Input
                          className="input"
                          placeholder="И-мэйл"
                          name="email"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="phone" label="Утас">
                        <Input
                          className="input"
                          name="phone"
                          placeholder="Утас"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Row gutter={20}>
                        <Col span={12}>
                          <Form.Item name="gender" label="Хүйс">
                            <Select
                              name="gender"
                              className="input"
                              bordered={false}
                              showSearch
                            >
                              <Select.Option value="MALE">
                                Эрэгтэй
                              </Select.Option>
                              <Select.Option value="FEMALE">
                                Эмэгтэй
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="family_status"
                            label="Гэр бүлийн байдал"
                          >
                            <Select
                              className="input"
                              name="family_status"
                              bordered={false}
                            >
                              <Select.Option value="MARRIED">
                                Гэрлэсэн
                              </Select.Option>
                              <Select.Option value="NOT_MARRIED">
                                Гэрлээгүй
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row gutter={20}>
                        <Col span={12}>
                          <Form.Item name="blood_type" label="Цусны бүлэг">
                            <Select
                              name="blood_type"
                              className="input"
                              bordered={false}
                            >
                              <Select.Option value="1-O">1-O</Select.Option>
                              <Select.Option value="2-A">2-A</Select.Option>
                              <Select.Option value="3-B">3-B</Select.Option>
                              <Select.Option value="4-AB">4-AB</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="birthday" label="Төрсөн огноо">
                            <DatePicker
                              name="birthday"
                              style={{ width: "100%" }}
                              className="input"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Form.Item name="address" label="Гэрийн хаяг">
                        <Input
                          className="input"
                          name="address"
                          placeholder="Гэрийн хаяг"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="desc" label="Тайлбар">
                        <Input
                          className="input"
                          name="desc"
                          placeholder="Бусад"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationPage;
