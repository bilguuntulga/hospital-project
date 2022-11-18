import { SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { authAPI } from "../../apis";
import UploadImage from "../../components/form/UploadImage";
import * as yup from "yup";

const genericInfoSchema = yup.object().shape({
  profile_img: yup.string().required("Зураг оруулна уу"),
  first_name: yup
    .string()
    .min(2, "Хамгийн бага даа 2 үсэгтэй байна")
    .required("Заавал бөглөнө үү"),
  last_name: yup
    .string()
    .min(2, "Хамгийн бага даа 2 үсэгтэй байна")
    .required("Заавал бөглөнө үү"),
});

const usernameSchema = yup.object().shape({
  username: yup
    .string()
    .lowercase()
    .trim()
    .matches(/^[aA-zZ\s]+$/, "Үсэг ашиглан уу")
    .min(2, "Хамгийн бага даа 2 үсэгтэй байна")
    .required("Заавал бөглөнө үү"),
});

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Хамгийн бага даа 8 оронтой байна")
    .required("Заавал бөглөнө үү"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Нууц үг таарсангүй")
    .required("Заавал бөглөнө үү"),
});

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const fetchData = async () => {
    const res = await authAPI.profile();
    setUser(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeProfile = async (values) => {
    toast.promise(
      async () => {
        await authAPI.update(values);
        navigate(0);
      },
      {
        pending: "Илгээж байна",
        success: "Амжилттай",
        error: "Амжилтгүй",
      }
    );
  };

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col xs={24} xl={12}>
          <Card title="Ерөнхий мэдээлэл">
            <Formik
              initialValues={user}
              enableReinitialize
              onSubmit={onChangeProfile}
              validationSchema={genericInfoSchema}
            >
              <Form layout="vertical">
                <Row justify="space-between">
                  <Col>
                    <Form.Item name="profile_img" label="Зураг">
                      <UploadImage name="profile_img" />
                    </Form.Item>
                  </Col>
                  <Col style={{ width: "50%" }}>
                    <Form.Item name="first_name" label="Овог">
                      <Input name="first_name" />
                    </Form.Item>
                    <Form.Item name="last_name" label="Нэр">
                      <Input name="last_name" />
                    </Form.Item>
                  </Col>
                </Row>
                <SubmitButton icon={<SaveOutlined />}>Хадаглах</SubmitButton>
              </Form>
            </Formik>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title="Нэвтрэх мэдээлэл">
            <Formik
              initialValues={{
                username: user?.username,
              }}
              enableReinitialize
              validationSchema={usernameSchema}
              onSubmit={onChangeProfile}
              autoComplete="off"
            >
              <Form layout="vertical" autoComplete="off">
                <Form.Item
                  name="username"
                  label="Нэвтрэх нэр"
                  autoComplete="off"
                >
                  <Input
                    name="username"
                    autoComplete="off"
                    suffix={
                      <SubmitButton type="primary">
                        <SaveOutlined />
                      </SubmitButton>
                    }
                  />
                </Form.Item>
              </Form>
            </Formik>

            <Formik
              initialValues={{
                password: "",
                confirm_password: "",
              }}
              validationSchema={passwordSchema}
              onSubmit={onChangeProfile}
              autoComplete="off"
            >
              <Form layout="vertical" autoComplete="off">
                <Form.Item
                  name="password"
                  label="Шинэ нууц үг"
                  autoComplete="off"
                >
                  <Input.Password name="password" autoComplete="off" />
                </Form.Item>
                <Form.Item
                  name="confirm_password"
                  label="Шинэ нууц үг давтаж хийх"
                  autoComplete="off"
                >
                  <Input.Password name="confirm_password" autoComplete="off" />
                </Form.Item>
                <SubmitButton>Нууц үг солих</SubmitButton>
              </Form>
            </Formik>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
}

export default ProfilePage;
