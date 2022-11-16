import { SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { authAPI } from "../../apis";
import UploadImage from "../../Components/form/UploadImage";

function ProfilePage() {
  const [user, setUser] = useState();

  const fetchData = async () => {
    const res = await authAPI.profile();
    setUser(res);
  };

  useEffect(() => {
    // fetchData();
  }, []);

  const changeGenericInfo = async (values) => {
    console.log(values);
  };

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col xs={24} xl={12}>
          <Card title="Ерөнхий мэдээлэл">
            <Formik
              initialValues={user}
              enableReinitialize
              onSubmit={changeGenericInfo}
            >
              <Form layout="vertical">
                <Form.Item name="profile_img" label="Зураг">
                  <UploadImage name="profile_img" />
                </Form.Item>
                <Row gutter={[20, 20]}>
                  <Col>
                    <Form.Item name="first_name" label="Овог">
                      <Input name="first_name" />
                    </Form.Item>
                  </Col>
                  <Col>
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
            <Formik initialValues={user} enableReinitialize>
              <Form layout="vertical">
                <Row gutter={[20, 20]}>
                  <Col>
                    <Form.Item name="username" label="Нэвтрэх нэр">
                      <Input
                        name="username"
                        suffix={
                          <Button type="primary">
                            <SaveOutlined />
                          </Button>
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <SubmitButton>Хадаглах</SubmitButton>
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
