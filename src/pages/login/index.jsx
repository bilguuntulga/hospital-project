import React, { memo } from "react";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import * as yup from "yup";
import { authAPI } from "../../apis";
import { Col, Row } from "antd";

function LoginPage() {
  const modal = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().min(2).required(),
    password: yup.string().min(8).required(),
  });

  const onLogin = async (values) => {
    const res = await authAPI.login(values);
    localStorage.setItem("token", res.access_token);
    window.location = "/";
  };

  return (
    <div className="login__page">
      <Row>
        <Col span={12}>
          <img src="/loginPageImage.svg" width="400px" height="400px" alt="" />
        </Col>
        <Col span={12}>
          <div className="image__container">
            <img src="/LoginPageLogo.svg" width="100px" height="100px" alt="" />
          </div>
          <Formik
            initialValues={modal}
            onSubmit={onLogin}
            validationSchema={validationSchema}
          >
            <Form>
              <Form.Item name="username">
                <Input name="username" placeholder="Нэвтрэх нэр" />
              </Form.Item>
              <Form.Item name="password">
                <Input.Password name="password" placeholder="Нууц үг" />
              </Form.Item>
              <SubmitButton style={{ width: "100%" }}>Нэвтрэх</SubmitButton>
            </Form>
          </Formik>
        </Col>
      </Row>
    </div>
  );
}

export default memo(LoginPage);
