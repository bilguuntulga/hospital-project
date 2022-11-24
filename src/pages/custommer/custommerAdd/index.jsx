import { Col, Row } from "antd";
import { DatePicker, Form, Input, SubmitButton, Select } from "formik-antd";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import "./style.css";
import Services from "../../../components/services";
import { customerAPI, servicesAPI, ServicesAPI } from "../../../apis";
import ProfileImageUpload from "../../../components/form/ProfileImageUpload";
import { useNavigate } from "react-router-dom";

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
    desc: ""
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
    image: yup.string().required("Заавал бөглөнө үү"),
    desc: yup.string().optional(),
  });

  const onFinish = async (values) => {
    try {
      await customerAPI.create(values)
      navigate(-1);
    } catch (error) {

    }
  }


  return (
    <div>
      <p style={{ fontSize: "20px" }}>
        <b>Registration</b>
      </p>
      <div className="custommer_news">
        <Formik initialValues={model} validationSchema={validationSchema} onSubmit={onFinish}>
          <Form>
            <Row gutter={30} justify="space-between">
              <Col span={12}>
                <Form.Item name="first_name">
                  <Input className="input" placeholder="Нэр" name="first_name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="last_name">
                  <Input
                    placeholder="Овог нэр"
                    className="input"
                    name="last_name"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={12}>
                <Form.Item name="email">
                  <Input className="input" placeholder="И-мэйл" name="email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item name="phone">
                      <Input
                        className="input"
                        name="phone"
                        placeholder="Утас"
                      />
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
                      <Select name="gender" className="input" bordered={false}>
                        <Select.Option value="MALE" >Эрэгтэй</Select.Option>
                        <Select.Option value="FEMALE">Эмэгтэй</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="family_status">
                      <Select className="input" name="family_status" bordered={false}>
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
                    <Form.Item name="blood_type">
                      <Select name="blood_type" className="input" bordered={false}>
                        <Select.Option value="1-O">
                          1-O
                        </Select.Option>
                        <Select.Option value="2-A">
                          2-A
                        </Select.Option>
                        <Select.Option value="3-B">
                          3-B
                        </Select.Option>
                        <Select.Option value="4-AB">
                          4-AB
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="birthday">
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
                <Form.Item name="address">
                  <Input
                    className="input"
                    name="address"
                    placeholder="Гэрийн хаяг"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="desc">
                  <Input className="input" name="desc" placeholder="Бусад" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={30}>
              <Col span={12}>
                <Form.Item name="image">
                  <ProfileImageUpload name="image" />
                </Form.Item>
              </Col>
              <Col span={12}>

              </Col>
            </Row>
            <Row justify="end">
              <SubmitButton >Хадгалах</SubmitButton>
            </Row>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationPage;
