import { DeleteOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { Image, Space } from "antd";
import { Field } from "formik";
import React, { memo, useRef } from "react";
import { uploadImage } from "../../utils/upload";

const ListImages = ({ name, height = 100, onChange }) => {
  const fileInputRef = useRef();

  const removeImage = (image, value, setFieldValue) => {
    const filtered = value?.filter((e) => e != image);
    setFieldValue(name, filtered);
  };

  const onFileInputChange = async (e, setFieldValue, value) => {
    const uploaded = [];
    for (let i = 0; i < e?.target?.files?.length; i++) {
      let url = await uploadImage(e?.target?.files[i]);
      uploaded.push(url);
      setFieldValue(name, [...value, ...uploaded]);
    }
  };

  return (
    <Field name={name} onChange={onChange}>
      {({ field: { value }, form: { setFieldValue } }) => (
        <div className="list_images_wrapper">
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => onFileInputChange(e, setFieldValue, value)}
            style={{ display: "none" }}
            multiple
          />
          <Image.PreviewGroup>
            {value?.map((image, i) => (
              <Image
                key={image + i}
                src={image}
                alt={image}
                height={height}
                preview={{
                  mask: (
                    <Space>
                      <EyeOutlined />
                      <DeleteOutlined
                        onClick={() => removeImage(image, value, setFieldValue)}
                      />
                    </Space>
                  ),
                }}
              />
            ))}
          </Image.PreviewGroup>
          <div
            className="list_images_wrapper_upload_button"
            style={{ height: height }}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadOutlined />
          </div>
        </div>
      )}
    </Field>
  );
};
export default memo(ListImages);
