import { Col, Row } from "antd";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import React, { useEffect, useState } from "react";
import { authAPI } from "../../apis";
import UploadImage from "../../Components/form/UploadImage";

function ProfilePage() {
  const [user, setUser] = useState();

  const fetchData = async () => {
    const res = await authAPI.profile();
    setUser(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Formik initialValues={user} enableReinitialize>
        <Form layout="vertical">
          <UploadImage name="profile_img" />
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
        </Form>
      </Formik>
    </div>
  );
}

export default ProfilePage;
