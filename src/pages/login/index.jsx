import React, { memo, useState } from "react";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import * as yup from "yup";
import { authAPI } from "../../apis";
import { toast, ToastContainer } from "react-toastify";

function LoginPage() {
  const [isForgot, setIsForgot] = useState(false);

  const loginInitialValues = {
    username: "",
    password: "",
  };

  const forgotInitialValues = {
    phone: "",
  };

  const loginValidationSchema = yup.object().shape({
    username: yup.string().min(2).required("Заавал бөглөнө үү"),
    password: yup.string().min(8).required("Заавал бөглөнө үү"),
  });

  const forgotValidationSchema = yup.object().shape({
    phone: yup.string().min(8).required("Заавал бөглөнө үү"),
  });

  const onLogin = async (values) => {
    const res = await authAPI.login(values);
    if (!res) return;

    localStorage.setItem("token", res.access_token);
    window.location = "/";
  };

  const onResetPassword = async (values) => {
    await toast.promise(
      async () => {
        await authAPI.resetPassword(values);
      },
      {
        pending: "Илгээж байна",
        error: "Амжилтгүй",
        success: "Амжилттай",
      }
    );
    setIsForgot(false);
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
          {!isForgot ? (
            <Formik
              initialValues={loginInitialValues}
              onSubmit={onLogin}
              validationSchema={loginValidationSchema}
            >
              <Form>
                <Form.Item name="username">
                  <Input name="username" placeholder="Нэвтрэх нэр" />
                </Form.Item>
                <Form.Item name="password">
                  <Input.Password name="password" placeholder="Нууц үг" />
                </Form.Item>
                <SubmitButton block>Нэвтрэх</SubmitButton>
                <p
                  className="forget_password_text"
                  onClick={() => setIsForgot(true)}
                >
                  Нууц үгээ мартсан?
                </p>
              </Form>
            </Formik>
          ) : (
            <Formik
              onSubmit={onResetPassword}
              initialValues={forgotInitialValues}
              validationSchema={forgotValidationSchema}
            >
              <Form layout="vertical">
                <Form.Item name="phone">
                  <Input name="phone" placeholder="Утас" />
                </Form.Item>
                <SubmitButton block>Илгээх</SubmitButton>
                <p
                  className="forget_password_text"
                  onClick={() => setIsForgot(false)}
                >
                  Буцах
                </p>
              </Form>
            </Formik>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default memo(LoginPage);
