import { Col, Image, Row } from "antd";
import { Form, Radio } from "formik-antd";
import React, { memo } from "react";

function QuestionCard({ name, image, button1, button2, button3, button4 }) {
  return (
    <Form.Item name={name}>
      <div className="question__container">
        <div className="image__container">
          <Image src={image} height="300px" width="350px" />
          <p>Энэ дүрс юутай адилхан бэ ?</p>
        </div>
        <Radio.Group name={name} buttonStyle="solid">
          <Row gutter={15}>
            <Col span={12}>
              <Radio.Button className="_button" value={button1}>
                {button1}
              </Radio.Button>
            </Col>
            <Col span={12}>
              <Radio.Button className="_button" value={button2}>
                {button2}
              </Radio.Button>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Radio.Button className="_button" value={button3}>
                {button3}
              </Radio.Button>
            </Col>
            <Col span={12}>
              <Radio.Button className="_button" value={button4}>
                {button4}
              </Radio.Button>
            </Col>
          </Row>
        </Radio.Group>
      </div>
    </Form.Item>
  );
}

export default memo(QuestionCard);
