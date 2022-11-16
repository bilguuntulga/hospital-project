import React, { useRef } from "react";
import { useState } from "react";
import AWS from "aws-sdk";
import { Image, message } from "antd";
import { Field } from "formik";
import { DeleteOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";

AWS.config.update({
  accessKeyId: "AKIAQ6ZTXJPAL5SFEXEU",
  secretAccessKey: "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",
});

const bucket = new AWS.S3({
  params: { Bucket: "skin-hospital" },
  region: "ap-northeast-3",
});

function UploadImage({ name, mode = "single" }) {
  const [selectedFile, setSelectedFile] = useState();
  const fileInputRef = useRef();

  const uploadFile = async (file, setFieldValue) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: "skin-hospital",
      Key: file.name,
    };

    bucket
      .putObject(params)
      .on("success", (res) => {
        setFieldValue(
          name,
          res["request"]["httpRequest"]["stream"]["responseURL"]
        );
      })
      .send((err) => {
        if (err) {
          message.error("Амжилттгүй");
        }
      });
  };

  const changeHandler = async (e, setFieldValue) => {
    toast.promise(
      async () => await uploadFile(e.target.files[0], setFieldValue),
      {
        pending: "Илгээж байна",
        success: "Амжилттай",
        error: "Амжилтгүй",
      }
    );
  };

  return (
    <Field name={name}>
      {({ field: { value }, meta, form: { setFieldValue } }) => (
        <>
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => changeHandler(e, setFieldValue)}
            style={{ display: "none" }}
          />
          {mode == "single" && value ? (
            <Image
              height={100}
              src={value}
              preview={{
                mask: (
                  <DeleteOutlined
                    color="red"
                    onClick={() => setFieldValue(name, "")}
                  />
                ),
              }}
            />
          ) : null}
          {!value ? (
            <button onClick={() => fileInputRef.current.click()}>Зураг</button>
          ) : null}
          <p style={{ color: "red" }}>{meta.error}</p>
          <ToastContainer />
        </>
      )}
    </Field>
  );
}

export default UploadImage;
