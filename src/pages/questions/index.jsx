import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, message, PageHeader, Space, Table, Modal } from "antd";
import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { questionsAPI } from "../../apis";
const { confirm } = Modal;

function QuestionsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await questionsAPI.list();
    setQuestions(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id) => {
    confirm({
      title: "Асуулт устгах",
      content: "Та энэ асуултыг устгах даа итгэлтэй байна уу?",
      okText: "Тийм",
      cancelText: "Үгүй",
      onOk: async () => {
        try {
          await questionsAPI.remove(id);
          message.success("Амжилттай");
        } catch (error) {
          message.error("Амжилтгүй");
        }
        fetchData();
      },
    });
  };

  const columns = [
    {
      title: "Гарчиг",
      dataIndex: "title",
    },
    {
      title: "Асуулт",
      render: (_, row) => row?.questions?.length,
    },
    {
      title: "Үйлдэл",
      render: (_, row) => (
        <Space>
          <Link to={row?.id}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            className="delete__button"
            onClick={() => onDelete(row?.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="questions_page">
      <PageHeader
        title={<ArrowLeftOutlined onClick={() => navigate(-1)} />}
        subTitle="Асуулт"
        extra={
          <Link to="create">
            <Button icon={<PlusOutlined />}>Нэмэх</Button>
          </Link>
        }
      />
      <Table
        dataSource={questions}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </div>
  );
}

export default memo(QuestionsPage);
