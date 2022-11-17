import React, { memo, useRef } from "react";
import AWS from "aws-sdk";
import { Image, message, Space } from "antd";
import { Field } from "formik";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import Carousel from "react-multi-carousel";
import "./style.css";

AWS.config.update({
  accessKeyId: "AKIAQ6ZTXJPADGUT3RJE",
  secretAccessKey: "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",
});

const bucket = new AWS.S3({
  params: { Bucket: "skin-hospital" },
  region: "ap-northeast-3",
});

function UploadImage({ name, mode = "single" }) {
  const fileInputRef = useRef();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const uploadFile = async (file, setFieldValue, value) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: "skin-hospital",
      Key: file.name,
    };

    if (mode == "single") {
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
            toast("Амжилтгүй");
          }
        });
    } else {
      bucket
        .putObject(params)
        .on("success", (res) => {
          const url = res["request"]["httpRequest"]["stream"]["responseURL"];
          setFieldValue(name, [...value, url]);
          console.log(value);
        })
        .send((err) => {
          throw err;
        });
    }
  };

  const changeHandler = async (e, setFieldValue, value) => {
    toast.promise(
      async () => await uploadFile(e.target.files[0], setFieldValue, value),
      {
        pending: "Илгээж байна",
        success: "Амжилттай",
        error: "Амжилтгүй",
      }
    );
  };

  const deleteFile = async (fileUrl, setFieldValue, value) => {
    const removed = value?.filter((e) => e != fileUrl);
    setFieldValue(name, removed);
  };

  return (
    <Field name={name}>
      {({ field: { value }, meta, form: { setFieldValue } }) => (
        <>
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => changeHandler(e, setFieldValue, value)}
            style={{ display: "none" }}
          />
          {mode == "single" && value ? (
            <Image
              height={100}
              src={value}
              preview={{
                visible: false,
                mask: (
                  <Space>
                    <EditOutlined
                      onClick={() => fileInputRef.current.click()}
                    />
                    <DeleteOutlined
                      color="red"
                      onClick={() => setFieldValue(name, "")}
                    />
                  </Space>
                ),
              }}
            />
          ) : (
            <div style={{ maxWidth: "250px" }}>
              <Carousel responsive={responsive} arrows={true}>
                {(value || [])?.map((e, i) => (
                  <Image
                    key={i}
                    src={e}
                    width={250}
                    preview={{
                      visible: false,
                      mask: (
                        <Space>
                          <FileAddOutlined
                            onClick={() => fileInputRef.current.click()}
                          />
                          <DeleteOutlined
                            onClick={() => deleteFile(e, setFieldValue, value)}
                          />
                        </Space>
                      ),
                    }}
                  />
                ))}
              </Carousel>
            </div>
          )}
          {value == "" || value == [] ? (
            <button
              className="upload-button"
              onClick={() => fileInputRef.current.click()}
            >
              {mode == "single" ? "Зураг оруулах" : "Зургууд оруулах"}
            </button>
          ) : null}
          <p style={{ color: "red" }}>{meta.error}</p>
          <ToastContainer />
        </>
      )}
    </Field>
  );
}

export default memo(UploadImage);