import { ArrowLeftOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import QuestionsForm from "../../components/questions/QuestionsForm";

function CreateQuestions() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title={<ArrowLeftOutlined onClick={() => navigate(-1)} />}
        subTitle="Асуулт нэмэх"
      />
      <QuestionsForm />
    </div>
  );
}

export default memo(CreateQuestions);
