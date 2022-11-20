import React, { memo } from "react";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import { Link, useLocation } from "react-router-dom";
import * as yup from "yup";
import { authAPI } from "../../apis";
import { Button, Col, Row, Input as Ant__input, Space } from "antd";

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
    if (!res) return;

    localStorage.setItem("token", res.access_token);
    window.location = "/";
  };

  return (
    <div className="login_page">
      <div className="login_page_container">
        <img
          className="login_page_container_image"
          src="/loginPageImage.svg"
          alt=""
        />
        <div>
          <div className="image_container">
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
              <p className="forget_password_text">Нууц үгээ мартсан?</p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default memo(LoginPage);
