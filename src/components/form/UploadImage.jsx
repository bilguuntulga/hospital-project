import React, { memo, useRef } from "react";
import { Image, Space } from "antd";
import { Field } from "formik";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import Carousel from "react-multi-carousel";
import { deleteMedia, uploadImage } from "../../utils/upload";

function UploadImage({ name, mode = "single", width = 500, height = "auto" }) {
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
    if (mode == "single") {
      const url = await uploadImage(file);
      if (value) await deleteMedia(value);
      setFieldValue(name, url);
    } else {
      const url = await uploadImage(file);
      setFieldValue(name, [...value, url]);
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
    await deleteMedia(fileUrl);
    setFieldValue(name, removed);
  };

  return (
    <div className="upload_image_wrapper">
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
                height={height}
                width={width}
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
              <div style={{ width: width }}>
                <Carousel responsive={responsive} arrows={true}>
                  {(value || [])?.map((e, i) => (
                    <Image
                      key={e + i}
                      src={e}
                      preview={{
                        visible: false,
                        mask: (
                          <Space>
                            <FileAddOutlined
                              onClick={() => fileInputRef.current.click()}
                            />
                            <DeleteOutlined
                              onClick={() =>
                                deleteFile(e, setFieldValue, value)
                              }
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
              <div
                className="upload_button"
                onClick={() => fileInputRef.current.click()}
              >
                {mode == "single" ? "Зураг оруулах" : "Зургууд оруулах"}
              </div>
            ) : null}
            <ToastContainer />
          </>
        )}
      </Field>
    </div>
  );
}

export default memo(UploadImage);
