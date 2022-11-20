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
import WorkingHoursTable, {
  dayTranslater,
} from "../../components/WorkingHoursTable";
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

  const personalInformationSchema = yup.object().shape({
    profile_img: yup.string().required("Заавал бөглөнө үү."),
    first_name: yup.string().required("Заавал бөглөнө үү."),
    last_name: yup.string().required("Заавал бөглөнө үү."),
    role: yup.string().required("Заавал бөглөнө үү."),
    salary: yup.string().required("Заавал бөглөнө үү."),
    desc: yup.string().required("Заавал бөглөнө үү."),
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

  const Tabs = () => {
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
                <Col>{e.role}</Col>
              </Row>
            ))}
          </div>
        );

      case "experiences":
        return (
          <div className="space_elements">
            {parse(detailData?.experiences_desc ?? "")}
            <Timeline>
              {detailData.experiences.map((e) => (
                <Timeline.Item color="#7B80FF">
                  <div className="experience_card">
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
                  width: "600px",
                  border: "0.4px solid  #000000",
                  padding: "2rem",
                }}
              >
                {detailData.working_hours.map((e) => (
                  <>
                    <DoctorWorkingHours
                      day={dayTranslater(e?.day)}
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
          <div className="settings_wrapper">
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
                      title="Хувийн мэдээлэл"
                      bordered
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
                                  <Form.Item name="first_name" label="Овог">
                                    <Input name="first_name" />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item name="last_name" label="Нэр">
                                    <Input name="last_name" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={[30, 30]}>
                                <Col span={12}>
                                  <Form.Item name="email" label="И-мэйл">
                                    <Input name="email" />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item name="phone" label="Утасны дугаар">
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
                    title="Эмчийн туршлага"
                    bordered
                    extra={<Button htmlType="submit">Хадаглах</Button>}
                  >
                    <div className="space_elements">
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
                      <ExperiencesField name="experiences" values={values} />
                    </div>
                  </Card>
                </Form>
              )}
            />
            <WorkingHoursTable
              id={id}
              workingHours={detailData.working_hours}
            />
          </div>
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
      <div className="content">
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
        <div className="tab_container">
          <div className="buttons_wrapper">
            <div
              className={`tab_button ${
                clickedButton == "biography" ? "active_tab_button" : ""
              }`}
              onClick={() => setClickedButton("biography")}
            >
              Эмчийн намтар
            </div>
            <div
              className={`tab_button ${
                clickedButton == "experiences" ? "active_tab_button" : ""
              }`}
              onClick={() => setClickedButton("experiences")}
            >
              Туршлага
            </div>
            <div
              className={`tab_button ${
                clickedButton == "time_schedule" ? "active_tab_button" : ""
              }`}
              onClick={() => setClickedButton("time_schedule")}
            >
              Цагийн хуваарь
            </div>
            <div
              className={`tab_button ${
                clickedButton == "settings" ? "active_tab_button" : ""
              }`}
              onClick={() => setClickedButton("settings")}
            >
              Тохиргоо
            </div>
          </div>
          <div className="tabs_wrapper">
            <Tabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
