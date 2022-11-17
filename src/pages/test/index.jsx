import { Button } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import React, { useState } from "react";
import UploadImage from "../../components/form/UploadImage";

function TestPage() {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Formik initialValues={{ name: "", image: "" }} onSubmit={onSubmit}>
        <Form>
          <Form.Item name="name">
            <Input name="name" />
          </Form.Item>
          <Form.Item name={"image"}>
            <UploadImage name={"image"} mode="multi" />
          </Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
}

export default TestPage;
