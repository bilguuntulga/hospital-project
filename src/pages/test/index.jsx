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
          profile_img:
            "data:image/png;base64,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",
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
