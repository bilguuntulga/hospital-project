import {
  ArrowLeftOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Card, Col, PageHeader, Row } from "antd";
import { Field, Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import React from "react";
import ExperiencesField from "../../components/doctors/ExperiencesField";
import ProfileImageUpload from "../../components/form/ProfileImageUpload";
import * as yup from "yup";
import { doctorAPI } from "../../apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const model = {
  profile_img:
    "https://d1pspl52z5rk07.cloudfront.net/assets/production/app/default/avatar-13e49413d14d7528c1dba3d70cb39957e4aa4b997dff5cf4cd6c89992da9aaa5.png",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role: "",
  salary: 1000000,
  desc: "",
  experiences_desc: "",
  color: "",
  experiences: [],
};

const validationSchema = yup.object().shape({
  profile_img: yup.string().optional(),
  first_name: yup.string().optional(),
  last_name: yup.string().optional(),
  email: yup.string().email().optional(),
  phone: yup.string().optional(),
  role: yup.string().optional(),
  salary: yup.number().optional(),
  desc: yup.string().optional(),
  experiences_desc: yup.string().optional(),
  color: yup.string().optional(),
  experiences: yup.array().optional(),
});

function DoctorCreate() {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    toast.promise(
      async () => {
        await doctorAPI.create(values);
        navigate(-1);
      },
      {
        pending: "Хадаглаж байна",
        error: "Амжилтгүй",
        success: "Амжилттай",
      }
    );
  };

  return (
    <>
      <PageHeader title={<ArrowLeftOutlined onClick={() => navigate(-1)} />} />
      <div>
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "15px",
          }}
        >
          <PageHeader title="Ажилтан нэмэх" />
          <br />
          <Formik
            initialValues={model}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form layout="vertical">
                <Row>
                  <Col xs={24} xl={6}>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <Form.Item label="" name="profile_img">
                        <ProfileImageUpload name="profile_img" size="200px" />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} xl={18}>
                    <Row gutter={15}>
                      <Col span={12}>
                        <Form.Item label="Овог" name="first_name">
                          <Input name="first_name" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Нэр" name="last_name">
                          <Input name="last_name" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={15}>
                      <Col span={12}>
                        <Form.Item label="И-мэйл" name="email">
                          <Input name="email" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Утас" name="phone">
                          <Input name="phone" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={15}>
                      <Col span={12}>
                        <Form.Item label="Мэргэжил" name="role">
                          <Input name="role" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Цалин" name="salary">
                          <Input name="salary" type="number" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Col span={24}>
                  <Form.Item name="color" label="Өнгө сонгох">
                    <Input type="color" name="color" />
                  </Form.Item>
                </Col>
                <Row gutter={15}>
                  <Col xs={24} xl={12}>
                    <Form.Item name="desc" label="Намтар">
                      <Field name="desc">
                        {({
                          field: { name, value },
                          form: { setFieldValue },
                        }) => (
                          <CKEditor
                            editor={ClassicEditor}
                            data={value ?? "<p></p>"}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFieldValue(name, data);
                            }}
                          />
                        )}
                      </Field>
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12}>
                    <Form.Item name="experiences_desc" label="Туршлага">
                      <Field name="experiences_desc">
                        {({
                          field: { name, value },
                          form: { setFieldValue },
                        }) => (
                          <CKEditor
                            editor={ClassicEditor}
                            data={value ?? "<p></p>"}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFieldValue(name, data);
                            }}
                          />
                        )}
                      </Field>
                    </Form.Item>
                  </Col>
                </Row>
                <br />
                <Row gutter={30}>
                  <Col span={24}>
                    <Form.Item name="experiences" label="Эмчийн туршлага">
                      <ExperiencesField name="experiences" values={values} />
                    </Form.Item>
                  </Col>
                </Row>
                <SubmitButton block icon={<SaveOutlined />}>
                  Бүртгэх
                </SubmitButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default DoctorCreate;
