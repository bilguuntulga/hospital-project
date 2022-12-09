import { ArrowLeftOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionsForm from "../../components/questions/QuestionsForm";

function UpdateQuestions() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <PageHeader
        title={<ArrowLeftOutlined onClick={() => navigate(-1)} />}
        subTitle="Асуулт засах"
      />
      <QuestionsForm id={id} />
    </div>
  );
}

export default UpdateQuestions;
