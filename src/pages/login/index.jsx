import React from 'react'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import * as yup from "yup";
import { authAPI } from "../../apis";
import "./style.css"

function LoginPage() {

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
        <div className='login_page'>
            <img src="ninja.png" alt="" />
            <Formik initialValues={modal} onSubmit={onLogin} validationSchema={validationSchema}>
                <Form>
                    <Form.Item name='username' >
                        <Input name='username' placeholder='Нэвтрэх нэр' />
                    </Form.Item>
                    <Form.Item name='password'>
                        <Input.Password name='password' placeholder='Нууц үг' />
                    </Form.Item>
                    <SubmitButton style={{ width: "100%" }}>Нэвтрэх</SubmitButton>
                </Form>
            </Formik>
        </div>
    )
}

export default LoginPage