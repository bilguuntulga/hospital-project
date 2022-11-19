import React from 'react'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { Link, useLocation } from 'react-router-dom';
import * as yup from "yup";
import { authAPI } from "../../apis";
import { Button, Col, Row, Input as Ant__input, Space } from 'antd';

function LoginPage() {
    const pathname = useLocation();


    const modal = {
        username: "",
        password: ""
    }

    const validationSchema = yup.object().shape({
        username: yup.string().min(2).required(),
        password: yup.string().min(8).required()
    })

    const onLogin = async (values) => {
        const res = await authAPI.login(values);
        localStorage.setItem("token", res.access_token);
        window.location = "/";
    }

    return (
        <div className="login__contaienr">

            <div className='login__page'>
                {pathname.pathname == "/login" ? <Row>
                    <Col span={12}>
                        <img src="loginPageImage.svg" width="400px" height="400px" alt="" />
                    </Col>
                    <Col span={12}>
                        <div className='image__container'>
                            <img src="LoginPageLogo.svg" width="100px" height="100px" alt="" />
                        </div>
                        <Formik initialValues={modal} onSubmit={onLogin} validationSchema={validationSchema}>
                            <Form>
                                <Form.Item name='username' >
                                    <Input name='username' placeholder='Нэвтрэх нэр' />
                                </Form.Item>
                                <Form.Item name='password'>
                                    <Input.Password name='password' placeholder='Нууц үг' />
                                </Form.Item>
                                <Link to="/forget_passowrd">Нууц үг сэргээх</Link>
                                <SubmitButton style={{ width: "100%" }}>Нэвтрэх</SubmitButton>
                            </Form>
                        </Formik>
                    </Col>
                </Row> :
                    <Row>
                        <Col span={12}>
                            <img src="loginPageImage.svg" width="400px" height="400px" alt="" />
                        </Col>
                        <Col span={12}>
                            <div className='image__container'>
                                <img src="LoginPageLogo.svg" width="100px" height="100px" alt="" />
                            </div>
                            <Space direction='vertical' style={{width:"100%"}}>
                                <Ant__input type='number' name='phone' placeholder='Утасны дугаар' />
                                <Link to="/login">
                                    <Button style={{ width: "100%" }}>Илгээх</Button>
                                </Link>
                            </Space>
                        </Col>
                    </Row>}

            </div>
        </div>
    )
}

export default LoginPage