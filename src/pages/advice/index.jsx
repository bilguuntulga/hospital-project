import React, { memo } from "react";
import Question1 from "../../components/form/Question1";
import Question2 from "../../components/form/Question2";
import { Card, PageHeader, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import { questionsAPI } from "../../apis";
import PageLoading from "../../components/PageLoading";
import QuestionsBuilder from "../../components/questions/QuestionsBuilder";

function AdvicePage() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await questionsAPI.list();
      setQuestions(res);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <PageLoading />;

  return (
    <>
      <PageHeader title={<ArrowLeftOutlined onClick={() => navigate(-1)} />} />
      <Tabs>
        {questions?.map((question) => (
          <Tabs.TabPane tab={question?.title} key={question?.id}>
            <Card title={question?.title}>
              <QuestionsBuilder id={question?.id} />
            </Card>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  );
}

export default memo(AdvicePage);
