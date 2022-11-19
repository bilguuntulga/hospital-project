import { Button } from "antd";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import React from "react";
import ProfileImageUpload from "../../components/form/ProfileImageUpload";
import UploadImage from "../../components/form/UploadImage";

function TestPage() {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="test_page">
      <h1 className="hello_text">Hello World</h1>
      <Formik
        initialValues={{
          name: "",
          image: "",
          profile_img: "",
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <Form.Item name="name">
            <Input name="name" />
          </Form.Item>
          <Form.Item name={"image"}>
            <UploadImage name={"image"} mode="multi" />
          </Form.Item>
          <Form.Item name="profile_img">
            <ProfileImageUpload name="profile_img" />
          </Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
}

export default TestPage;
