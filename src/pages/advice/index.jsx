import React from "react";
import Question1 from "../../components/form/Question1";
import Question2 from "../../components/form/Question2";
import { Card, PageHeader, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

function AdvicePage() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title={<ArrowLeftOutlined onClick={() => navigate(-1)} />} />
      <Tabs>
        <Tabs.TabPane tab="Асуулт.1" key={1}>
          <Question1 />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Асуулт.2" key={2}>
          <Card title="Асуулт.2">
            <Question2 />
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default AdvicePage;
