import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './style.css'
import { doctorAPI } from '../../apis'
import { Button, Card, Col, Row, Timeline } from 'antd'
import { ArrowRightOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import * as yup from "yup";
import { Formik } from 'formik'
import { Input, SubmitButton, Form } from 'formik-antd'
import Doctor_Timer from '../../components/doctor_time'
import ImageUploud from "../../components/form/UploadImage"
import WorkingHoursTable from '../../components/WorkingHoursTable'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const DocterDetail = () => {
    const { id } = useParams();
    const [detaildata, setDetailData] = useState({})
    const [buttonclick, setButtonClick] = useState("")

    const fetchData = async () => {
        const res = await doctorAPI.detail(id);
        setDetailData(res)
    }
    useEffect(() => {
        fetchData()
        setButtonClick("biography_of_a_doctor")
    }, [])
    const personal_information_model = {
        profile_img: "",
        surname: "",
        name: "",
        email: "",
        phone: "",

    }
    const biography_doctorModel = {
        biography_doctor: "",
    }
    const doctor_experienceModel = {
        graduate_school: "",
        year: "",
    }
    const time_scheduleModel = {
        time_schedule: [],

    }
    const personal_information_validationSchema = yup.object().shape({
        profile_img: yup.string().optional(),
        surname: yup.string().optional(),
        name: yup.string().optional(),
        email: yup.string().optional(),
        phone: yup.string().optional(),
    })

    const biography_doctorvalidationSchema = yup.object().shape({
        biography_doctor: ""
    })
    const doctor_experienceValidationSchema = yup.object().shape({
        graduate_school: yup.string().optional(),
        year: yup.string().optional(),
    })
    const time_scheduleValidationSchema = yup.object().shape({
        time_schedule: yup.string().optional()
    })





    const Converttext = () => {
        switch (buttonclick) {
            case "biography_of_a_doctor":
                return <>
                    < p > {detaildata?.desc}</p>
                    <b className='role'>Мэргэжил:</b>
                    {detaildata?.experiences?.map((e) => (

                        <Row gutter={20}>
                            <Col>
                                <ArrowRightOutlined style={{ color: "#7B80FF", width: "17px", height: "13px" }} />
                            </Col>
                            <Col>
                                {e.desc}
                            </Col>
                        </Row>
                    )
                    )}
                </>

            case "experiences":
                return <>
                    <Timeline >
                        {detaildata.experiences.map((e) => (
                            <Timeline.Item color='#7B80FF' >
                                <div className='experiences_border' style={{ display: "grid", placeItems: "center" }}>
                                    <p style={{ color: "gray" }}>{e?.date}</p>
                                    <p>{e?.desc}</p>
                                    <p style={{ color: "gray" }}>{e?.role}</p>
                                </div>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </>
            case "time_schedule":
                return <Row >
                    <Col span={11}>
                        <div style={{ borderRadius: "10px", width: "622px", height: "495px", border: "0.4px solid  #000000", padding: "35px" }}>
                            {detaildata.working_hours.map((e) => (
                                <>
                                    <Doctor_Timer day={e?.day} endDate={e?.end_time} startDate={e?.start_time} />
                                    <br />
                                </>
                            ))}
                        </div>
                    </Col>
                    <Col span={12}>
                        <Row >
                            <Col span={12}>
                                <div style={{ marginTop: "80px", display: "grid", placeItems: "center", fontSize: "20px", fontFamily: "Kanit', sans-serif" }}>

                                    <div style={{ backgroundColor: "#F2F2F2", borderRadius: "7px", width: "70px", height: "70px", display: "grid", placeItems: "center" }}>
                                        <PhoneOutlined style={{ fontSize: "35px", color: "#373FFF" }} />
                                    </div>
                                    <p>Утас</p>
                                    <p style={{ color: "#373FFF", fontSize: "20px" }}>+976 9999-9999</p>
                                </div>
                            </Col>
                            <Col>
                                <div style={{ marginTop: "80px", display: "grid", placeItems: "center", fontSize: "20px", fontFamily: "Kanit', sans-serif" }}>

                                    <div style={{ backgroundColor: "#F2F2F2", borderRadius: "7px", width: "70px", height: "70px", display: "grid", placeItems: "center" }}>
                                        <MailOutlined style={{ fontSize: "35px", color: "#373FFF" }} />
                                    </div>
                                    <p>И-мэйл</p>
                                    <p style={{ color: "#373FFF", fontSize: "20px" }}>Test@gmail.com</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            case "setings":
                return <>
                    <Row>
                        <Col>
                            <Formik initialValues={personal_information_model} validationSchema={personal_information_validationSchema}>
                                <Form layout='vertical'>
                                    <Row gutter={5}>
                                        <Col>
                                            <Card title="Хувийн мэдээлэл:" bordered style={{ height: "387px", width: "620px", borderColor: "black", borderRadius: "15px" }} extra={<Row gutter={10}>
                                                <Col>
                                                    <SubmitButton style={{ width: "100px", height: "29px", backgroundColor: "#434AFE", borderRadius: "5px", border: "none" }}>Хадгалах</SubmitButton>
                                                </Col>
                                                <Col>
                                                    <SubmitButton style={{ width: "100px", height: "29px", backgroundColor: "#B4B6FF", borderRadius: "5px", border: "none" }}>Устгах</SubmitButton>
                                                </Col>
                                            </Row>}>
                                                <Row justify="space-between">
                                                    <Col>
                                                        <Form.Item name="profile_img">

                                                            <div style={{ borderRadius: "50%", width: "70px", height: "70px", backgroundColor: "#F5F5F5", display: "grid", placeItems: "center" }}>
                                                                <img src={detaildata.profile_img} width="48px" height="48px" />
                                                            </div>
                                                            <ImageUploud name="profile_img" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col>

                                                    </Col>
                                                </Row>
                                                <Row gutter={[30, 30]}>
                                                    <Col span={12}>
                                                        <Form.Item name="surname" label="Овог:">
                                                            <Input name="surname" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item name="name" label="Нэр:">
                                                            <Input name="name" />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[30, 30]}>
                                                    <Col span={12}>
                                                        <Form.Item name="email" label="И-мэйл:">
                                                            <Input name="email" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}  >
                                                        <Form.Item name="phone" label="Утасны дугаар:">
                                                            <Input name="phone" />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                        <Card title="Эмчийн намтар:" bordered style={{ height: "387px", width: "620px", borderColor: "black", borderRadius: "15px" }}>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data="<p></p>"
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    console.log('Editor is ready to use!', editor);
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    console.log({ event, editor, data });
                                                }}
                                                onBlur={(event, editor) => {
                                                    console.log('Blur.', editor);
                                                }}
                                                onFocus={(event, editor) => {
                                                    console.log('Focus.', editor);
                                                }}
                                            />
                                        </Card>
                                    </Row>
                                    <br />
                                    <Row gutter={5}>
                                        <Col>
                                            <Card title="Эмчийн туршлага:" bordered style={{ height: "387px", width: "620px", borderColor: "black", borderRadius: "15px" }}>
                                                <Formik>
                                                    <Form initialValues={doctor_experienceModel} validationSchema={doctor_experienceValidationSchema}>
                                                        <Row gutter={10}>
                                                            <Col span={12}>
                                                                <Form.Item name="graduate_school" label="Төгссөн сургууль">
                                                                    <Input name='graduate_school' />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Form.Item name="year" label="Жил" >
                                                                    <Input name='year' />
                                                                </Form.Item>

                                                            </Col>
                                                        </Row>
                                                        <Row justify="end">
                                                            <Col>
                                                                <SubmitButton style={{ width: "126px", height: "39px", backgroundColor: "#434AFE", borderRadius: "5px", border: "none" }}>НЭМЭХ</SubmitButton>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </Formik>
                                            </Card>
                                        </Col>
                                        <Col>
                                            {/* <Card title="Цагийн хуваарь:" bordered style={{ height: "387px", width: "620px" }}> */}
                                            <WorkingHoursTable id={id} workingHours={detaildata.working_hours} />
                                            {/* </Card> */}
                                        </Col>
                                    </Row>
                                </Form>
                            </Formik>
                        </Col>
                    </Row>
                </>

        }
    }

    return (
        <>
            <div className='header' style={{ width: "100%", height: "112px" }}>
                <p className='name'><b>{detaildata.name}</b></p>
            </div>
            <div className='content' style={{ backgroundColor: "white", width: "100%", height: "1102.25px", borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px", margin: "0", padding: "0" }}>
                <div className='image_Container'>
                    <img src={detaildata?.profile_img} width="132px" height="120px" alt="" />
                </div>
                <p style={{ fontSize: "26px", margin: "0", padding: "0", marginLeft: "220px" }}>{detaildata?.role}</p>
                <div className='sub_content' >
                    <Row>
                        <Col>
                            <Button onClick={() => setButtonClick("biography_of_a_doctor")} className='detailBUtton'>Эмчийн намтар</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => setButtonClick("experiences")} className='detailBUtton'>Туршлага</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => setButtonClick("time_schedule")} className='detailBUtton'>Цагийн хуваарь</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => setButtonClick("setings")} className='detailBUtton'>Тохиргоо</Button>
                        </Col>
                    </Row>
                    <br />
                    <Converttext />
                </div>
            </div>
        </>
    )
}

export default DocterDetail