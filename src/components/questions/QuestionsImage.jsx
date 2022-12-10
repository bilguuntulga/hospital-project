import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, message, Space } from "antd";
import { useRef } from "react";
import { uploadImage } from "../../utils/upload";

export default function QuestionsImage({ name, value, setFieldValue }) {
  const inputRef = useRef();

  const inputOnChange = async (e) => {
    try {
      const url = await uploadImage(e.target.files[0]);
      setFieldValue(name, {
        ...value,
        data: url,
      });
      message.success("Амжилттай");
    } catch (error) {
      message.success("Амжилтгүй");
    }
  };

  return (
    <div style={{ paddingTop: "1rem" }}>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        onChange={inputOnChange}
      />
      <Space direction="vertical">
        {value?.data ? (
          <Image src={value?.data} alt={value?.data} height={100} />
        ) : null}
        <Button
          icon={<PlusOutlined />}
          onClick={() => inputRef.current.click()}
        >
          {!value?.data ? "Зураг оруулах" : "Зураг Солих"}
        </Button>
      </Space>
    </div>
  );
}
