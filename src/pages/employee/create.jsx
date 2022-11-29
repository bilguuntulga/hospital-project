import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Card, Col, PageHeader, Row } from 'antd';
import { Field, Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import React from 'react'
import ExperiencesField from '../../components/doctors/ExperiencesField';
import ProfileImageUpload from '../../components/form/ProfileImageUpload';
import * as yup from "yup"
import { doctorAPI } from '../../apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const model = {
    profile_img: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
    salary: 1000000,
    desc: "",
    experiences_desc: "",
    color: "",
    experiences: []
};

const validationSchema = yup.object().shape({
    profile_img: yup.string().required("Заавал бөглөнө үү"),
    first_name: yup.string().required("Заавал бөглөнө үү"),
    last_name: yup.string().required("Заавал бөглөнө үү"),
    email: yup.string().email().required("Заавал бөглөнө үү"),
    phone: yup.string().required("Заавал бөглөнө үү"),
    role: yup.string().required("Заавал бөглөнө үү"),
    salary: yup.number().required("Заавал бөглөнө үү"),
    desc: yup.string().required("Заавал бөглөнө үү"),
    experiences_desc: yup.string().required("Заавал бөглөнө үү"),
    color: yup.string().required("Заавал бөглөнө үү"),
    experiences: yup.array().required("Заавал бөглөнө үү"),
})



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
                <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "15px" }}>
                    <PageHeader title="Ажилтан нэмэх" />
                    <br />
                    <Formik initialValues={model} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ values, setFieldValue }) => <Form layout='vertical'>
                            <Row >
                                <Col span={6}>
                                    <div style={{ display: "grid", placeItems: "center" }}>
                                        <Form.Item label="" name="profile_img">
                                            <ProfileImageUpload name="profile_img" />
                                        </Form.Item>
                                    </div>
                                </Col>
                                <Col span={18}>
                                    <Row gutter={15}>
                                        <Col span={12}>
                                            <Form.Item label="Овог" name="first_name">
                                                <Input name='first_name' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Нэр" name="last_name">
                                                <Input name='last_name' />
                                            </Form.Item></Col>
                                    </Row>
                                    <Row gutter={15}>
                                        <Col span={12}>
                                            <Form.Item label="И-мэйл" name="email">
                                                <Input name='email' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Утас" name="phone">
                                                <Input name='phone' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={15}>
                                        <Col span={12}>
                                            <Form.Item label="Мэргэжил" name="role">
                                                <Input name='role' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Цалин" name="salary">
                                                <Input name='salary' type='number' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row gutter={15}>
                                <Col span={12}>
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
                                </Col>
                                <Col span={12}>
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
                                </Col>
                            </Row>
                            <br />
                            <Row gutter={30}>
                                <Col span={12}>
                                    <Form.Item name="experiences" label="Эмчийн туршлага">
                                        <ExperiencesField name="experiences" values={values} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="color" label="Өнгө сонгох">
                                        <Input type='color' name='color' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <SubmitButton block>Бүртгэх</SubmitButton>
                        </Form>}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default DoctorCreate