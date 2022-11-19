import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doctorAPI } from "../../apis";
import { Button, Card, Col, message, Row, Timeline } from "antd";
import {
  ArrowRightOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import * as yup from "yup";
import { Field, Formik } from "formik";
import { Input, SubmitButton, Form } from "formik-antd";
import DoctorWorkingHours from "../../components/DoctorWorkingHours";
import WorkingHoursTable from "../../components/WorkingHoursTable";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ProfileImageUpload from "../../components/form/ProfileImageUpload";
import ExperiencesField from "../../components/doctors/ExperiencesField";
import parse from "html-react-parser";

const personalInfoModel = {
  profile_img: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
};

const EmployeeDetail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(personalInfoModel);
  const [clickedButton, setClickedButton] = useState("biography");

  const fetchData = async () => {
    const res = await doctorAPI.detail(id);
    setDetailData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const biography_doctorModel = {
    biography_doctor: "",
  };
  const doctor_experienceModel = {
    graduate_school: "",
    year: "",
  };
  const time_scheduleModel = {
    time_schedule: [],
  };
  const personalInformationSchema = yup.object().shape({
    profile_img: yup.string().required("Заавал бөглөнө үү."),
    first_name: yup.string().required("Заавал бөглөнө үү."),
    last_name: yup.string().required("Заавал бөглөнө үү."),
    role: yup.string().required("Заавал бөглөнө үү."),
    salary: yup.string().required("Заавал бөглөнө үү."),
  });

  const biography_doctorvalidationSchema = yup.object().shape({
    biography_doctor: "",
  });
  const doctor_experienceValidationSchema = yup.object().shape({
    graduate_school: yup.string().optional(),
    year: yup.string().optional(),
  });
  const time_scheduleValidationSchema = yup.object().shape({
    time_schedule: yup.string().optional(),
  });

  const onSubmit = async (values) => {
    try {
      delete values.created_by;
      delete values.updated_by;
      await doctorAPI.update(values);
      message.success("Амжилттай");
    } catch (error) {
      message.error(error?.message);
    }
  };

  const Converttext = () => {
    switch (clickedButton) {
      case "biography":
        return (
          <div>
            <p> {parse(detailData?.desc ?? "")}</p>
            <b className="role">Мэргэжил:</b>
            {detailData?.experiences?.map((e) => (
              <Row gutter={20}>
                <Col>
                  <ArrowRightOutlined
                    style={{ color: "#7B80FF", width: "17px", height: "13px" }}
                  />
                </Col>
                <Col>{e.desc}</Col>
              </Row>
            ))}
          </div>
        );

      case "experiences":
        return (
          <div>
            <Timeline>
              {detailData.experiences.map((e) => (
                <Timeline.Item color="#7B80FF">
                  <div
                    className="experiences_border"
                    style={{ display: "grid", placeItems: "center" }}
                  >
                    <p style={{ color: "gray" }}>{e?.date}</p>
                    <p>{e?.desc}</p>
                    <p style={{ color: "gray" }}>{e?.role}</p>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        );

      case "time_schedule":
        return (
          <Row>
            <Col span={11}>
              <div
                style={{
                  borderRadius: "10px",
                  width: "622px",
                  height: "495px",
                  border: "0.4px solid  #000000",
                  padding: "35px",
                }}
              >
                {detailData.working_hours.map((e) => (
                  <>
                    <DoctorWorkingHours
                      day={e?.day}
                      endDate={e?.end_time}
                      startDate={e?.start_time}
                    />
                    <br />
                  </>
                ))}
              </div>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <div
                    style={{
                      marginTop: "80px",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "20px",
                      fontFamily: "Kanit', sans-serif",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#F2F2F2",
                        borderRadius: "7px",
                        width: "70px",
                        height: "70px",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <PhoneOutlined
                        style={{ fontSize: "35px", color: "#373FFF" }}
                      />
                    </div>
                    <p>Утас</p>
                    <p style={{ color: "#373FFF", fontSize: "20px" }}>
                      {detailData?.phone ?? "Байхгүй"}
                    </p>
                  </div>
                </Col>
                <Col>
                  <div
                    style={{
                      marginTop: "80px",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "20px",
                      fontFamily: "Kanit', sans-serif",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#F2F2F2",
                        borderRadius: "7px",
                        width: "70px",
                        height: "70px",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <MailOutlined
                        style={{ fontSize: "35px", color: "#373FFF" }}
                      />
                    </div>
                    <p>И-мэйл</p>
                    <p style={{ color: "#373FFF", fontSize: "20px" }}>
                      {detailData?.email ?? "Байхгүй"}
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        );

      case "settings":
        return (
          <>
            <Row gutter={5}>
              <Col span={24}>
                <Formik
                  initialValues={detailData}
                  validationSchema={personalInformationSchema}
                  enableReinitialize
                  onSubmit={onSubmit}
                >
                  <Form layout="vertical">
                    <Card
                      title="Хувийн мэдээлэл:"
                      bordered
                      style={{ borderColor: "black", borderRadius: "15px" }}
                      extra={
                        <Row gutter={10}>
                          <Col>
                            <SubmitButton
                              style={{
                                width: "100px",
                                height: "29px",
                                backgroundColor: "#434AFE",
                                borderRadius: "5px",
                                border: "none",
                              }}
                            >
                              Хадгалах
                            </SubmitButton>
                          </Col>
                        </Row>
                      }
                    >
                      <Row>
                        <Col span={24}>
                          <Row justify="space-around" align="middle">
                            <Col span={6}>
                              <Form.Item name="profile_img">
                                <div className="profile_image_center_wrapper">
                                  <ProfileImageUpload
                                    name="profile_img"
                                    size="150px"
                                  />
                                </div>
                              </Form.Item>
                            </Col>
                            <Col span={18}>
                              <Row gutter={[30, 30]}>
                                <Col span={12}>
                                  <Form.Item name="first_name" label="Овог:">
                                    <Input name="first_name" />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item name="last_name" label="Нэр:">
                                    <Input name="last_name" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={[30, 30]}>
                                <Col span={12}>
                                  <Form.Item name="email" label="И-мэйл:">
                                    <Input name="email" />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    name="phone"
                                    label="Утасны дугаар:"
                                  >
                                    <Input name="phone" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={[30, 30]}>
                                <Col span={12}>
                                  <Form.Item name="role" label="Мэргэжил">
                                    <Input name="role" />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item name="salary" label="Цалин">
                                    <Input name="salary" type="number" />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Form.Item name="desc" label="Намтар:">
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
                      </Row>
                    </Card>
                  </Form>
                </Formik>
              </Col>
            </Row>
            <Formik
              initialValues={detailData}
              enableReinitialize
              onSubmit={onSubmit}
              render={({ values }) => (
                <Form>
                  <Card
                    title="Эмчийн туршлага:"
                    bordered
                    style={{
                      height: "387px",
                      width: "620px",
                      borderColor: "black",
                      borderRadius: "15px",
                    }}
                    extra={<Button htmlType="submit">Хадаглах</Button>}
                  >
                    <ExperiencesField name="experiences" values={values} />
                  </Card>
                </Form>
              )}
            />
            <WorkingHoursTable
              id={id}
              workingHours={detailData.working_hours}
            />
          </>
        );
    }
  };

  return (
    <div className="employee_detail_container">
      <div className="header" style={{ width: "100%", height: "112px" }}>
        <p className="name">
          <b>
            {detailData?.first_name} {detailData?.last_name}
          </b>
        </p>
      </div>
      <div
        className="content"
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "1102.25px",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          margin: "0",
          padding: "0",
        }}
      >
        <div className="image_container">
          <img
            src={detailData?.profile_img ?? "/images/profile_img.jpg"}
            alt={detailData?.profile_img ?? "/images/profile_img.jpg"}
          />
        </div>
        <p
          style={{
            fontSize: "26px",
            margin: "0",
            padding: "0",
            marginLeft: "220px",
          }}
        >
          {detailData?.role}
        </p>
        <div className="sub_content">
          <Row>
            <Col>
              <Button
                onClick={() => setClickedButton("biography")}
                className="detailBUtton"
              >
                Эмчийн намтар
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => setClickedButton("experiences")}
                className="detailBUtton"
              >
                Туршлага
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => setClickedButton("time_schedule")}
                className="detailBUtton"
              >
                Цагийн хуваарь
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => setClickedButton("settings")}
                className="detailBUtton"
              >
                Тохиргоо
              </Button>
            </Col>
          </Row>
          <Converttext />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
