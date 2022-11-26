import { Button, Card, Col, PageHeader, Row } from 'antd'
import { Formik } from 'formik'
import { Form, Input, Select } from 'formik-antd'
import React, { memo, useEffect, useState } from 'react'
import UploadImage from '../../components/form/UploadImage'
import * as yup from "yup";
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { servicesAPI } from '../../apis'
import { ArrowLeftOutlined, DeleteColumnOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from "react-toastify";
import SelectService from '../../components/form/SelectService';
import PageLoading from '../../components/PageLoading'
import ResourcesSelect from '../../components/form/ResourcesSelect'

const model = {
    name: "",
    desc: "",
    type: "",
    price: 0,
    services: [],
    images: [],
    resources: []
}

const validationSchema = yup.object().shape({
    name: yup.string().required("Заавал бөглөнө үү."),
    desc: yup.string().optional(),
    type: yup.string().required("Заавал бөглөнө үү."),
    price: yup.number().required("Заавал бөглөнө үү."),
    services: yup.array().required("Заавал бөглөнө үү."),
    images: yup.array().required("Заавал бөглөнө үү."),
    resources: yup.array().optional()
})

function ServiceForm({ create = true }) {
    const [initialValues, setInitialValues] = useState(model);
    const [loading, setLoading] = useState(!create);
    const [user, setUser] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation()
    const onSubmit = async (values) => {
        if (create) {
            toast.promise(
                async () => {
                    await servicesAPI.create(values);
                },
                {
                    pending: "Хадаглаж байна",
                    error: "Амжилтгүй",
                    success: "Амжилттай",
                }
            );
        }
        else {

            delete values.created_by;
            delete values.updated_by;
            toast.promise(
                async () => {
                    await servicesAPI.update(values);
                    await fetchData();
                },
                {
                    pending: "Хадаглаж байна",
                    error: "Амжилтгүй",
                    success: "Амжилттай",
                }
            );
        }
        navigate(-1);
    };

    const onDelete = async () => {
        toast.promise(async () => {
            await servicesAPI.remove(id);
        }, {
            pending: "Хадаглаж байна",
            error: "Амжилтгүй",
            success: "Амжилттай",
        });
        navigate(-1);
    }

    const fetchData = async () => {
        if (!create) {
            setLoading(true);
            const res = await servicesAPI.oneGet(id);
            const services = res.services;
            const resources = res.resources;

            delete res.services;
            delete res.resources;

            let service_ids = [];
            for (let i = 0; i < services.length; i++) {
                service_ids.push(services[i].id);
            }

            let resources_ids = [];
            for (let i = 0; i < resources.length; i++) {
                resources_ids.push({
                    resource: resources[i]?.resource?.id,
                    quantity: resources[i]?.quantity
                });
            }


            res.services = service_ids;
            res.resources = resources_ids;

            setInitialValues(res);
            setLoading(false);
        }
        const res = JSON.parse(localStorage.getItem("user"))
        setUser(res)
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <PageLoading />


    return (
        <>
            <PageHeader title={<ArrowLeftOutlined onClick={() => navigate(-1)} />} />
            <Card title="Үйлчилгээ">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
                    {({ values }) => <Form layout='vertical'>
                        <Row gutter={50}>
                            <Col span={10}>
                                <Form.Item name="images">
                                    <UploadImage name="images" mode='multi' width={400} />
                                </Form.Item>
                            </Col>
                            <Col span={14}>
                                <Form.Item name="name" label="Нэр">
                                    <Input name="name" />
                                </Form.Item>
                                <Form.Item name="desc" label="Тайлбар">
                                    <Input name="desc" />
                                </Form.Item>
                                <Form.Item name="type" label="Төрөл">
                                    <Select name='type'>
                                        <Select.Option value="PACKAGE">
                                            Багц
                                        </Select.Option>
                                        <Select.Option value="BASIC">
                                            Үндсэн
                                        </Select.Option>
                                        <Select.Option value="ADDITIONAL">
                                            Нэмэлт
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="price" label="Үнэ">
                                    <Input type='number' name="price" />
                                </Form.Item>
                                <Form.Item name="services" label="Үйлчилгээнүүд">
                                    <SelectService name="services" multi={true} />
                                </Form.Item>
                                <Form.Item name="resources" label="Нөөц">
                                    <ResourcesSelect name="resources" values={values} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={12} justify="end">
                            <Col>
                                <Button htmlType='submit'>Хадаглах</Button>
                            </Col>
                            <Col>
                                {pathname == "/services/create" ? "" : <Button icon={<DeleteOutlined />} onClick={onDelete}>Устгах</Button>}
                            </Col>
                        </Row>
                    </Form>}
                </Formik>
                <ToastContainer />
            </Card>
        </>
    )
}

export default memo(ServiceForm)