import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { authAPI, usersAPI } from "../../apis";
import UploadImage from "../../components/form/UploadImage";
import * as yup from "yup";
import ProfileImageUpload from "../../components/form/ProfileImageUpload";
import PageLoading from "../../components/PageLoading";

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
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = JSON.parse(localStorage.getItem("user"));
    setUser(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeProfile = async (values) => {
    toast.promise(
      async () => {
        delete values.created_by;
        delete values.updated_by;
        await authAPI.update(values);
        const user = await authAPI.profile();
        localStorage.setItem("user", JSON.stringify(user));
        navigate(0);
      },
      {
        pending: "Илгээж байна",
        success: "Амжилттай",
        error: "Амжилтгүй",
      }
    );
  };

  if (loading) return <PageLoading />;

  return (
    <div className="profile_container">
      <Row gutter={[10, 10]}>
        <Col xs={24} xl={12}>
          <Formik
            initialValues={user}
            enableReinitialize
            onSubmit={onChangeProfile}
            validationSchema={genericInfoSchema}
          >
            <Form layout="vertical">
              <Card
                title="Ерөнхий мэдээлэл"
                extra={
                  <SubmitButton icon={<SaveOutlined />}>Хадаглах</SubmitButton>
                }
              >
                <Row justify="space-between">
                  <Col span={6}>
                    <Form.Item name="profile_img" label="Зураг">
                      <div className="profile_image_center">
                        <ProfileImageUpload name="profile_img" size="100px" />
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={18}>
                    <Form.Item name="first_name" label="Овог">
                      <Input name="first_name" />
                    </Form.Item>
                    <Form.Item name="last_name" label="Нэр">
                      <Input name="last_name" />
                    </Form.Item>
                    <Form.Item name="email" label="И-Мэйл">
                      <Input name="email" />
                    </Form.Item>
                    <Form.Item name="phone" label="Утас">
                      <Input name="phone" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Form>
          </Formik>
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
                      <SubmitButton type="primary" icon={<EditOutlined />}>
                        Солих
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
                <SubmitButton block icon={<EditOutlined />}>
                  Нууц үг солих
                </SubmitButton>
              </Form>
            </Formik>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
}

export default memo(ProfilePage);
