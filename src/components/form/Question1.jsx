import { SaveOutlined } from "@ant-design/icons";
import { Card, Col, Row, Collapse, message } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton, TimePicker, Radio } from "formik-antd";
import React, { memo, useEffect, useState } from "react";
import { anythingAPI } from "../../apis";
import * as yup from "yup";
const { Item } = Form;

const model = {
  phone: "",
  q1: "",
  q2: "",
  q3: "",
  q3_1: "",
  q3_1: "",
  q3_3: "",
  q3_4: "",
  q3_5: "",
  q4: "",
  q4_day1_start: "",
  q4_day2_start: "",
  q4_day3_start: "",
  q4_day4_start: "",
  q4_day5_start: "",
  q4_day6_start: "",
  q4_day7_start: "",
  q4_day1_end: "",
  q4_day2_end: "",
  q4_day3_end: "",
  q4_day4_end: "",
  q4_day5_end: "",
  q4_day6_end: "",
  q4_day7_end: "",
  q5: "",
  q6: "",
  q7: "",
  q12day1_morning: "",
  q12day1_day: "",
  q12day1_evening: "",
  q12day1_morning_time: "",
  q12day1_day_time: "",
  q12day1_evening_time: "",
  q12day2_morning: "",
  q12day2_day: "",
  q12day2_evening: "",
  q12day2_morning_time: "",
  q12day2_day_time: "",
  q12day2_evening_time: "",
  q12day3_morning: "",
  q12day3_day: "",
  q12day3_evening: "",
  q12day3_morning_time: "",
  q12day3_day_time: "",
  q12day3_evening_time: "",
  q8: "",
  q9: "",
  q10: "",
  q11: "",
  q12: "",
  q13: "",
  q14: "",
  q15: "",
  q16: "",
  q17: "",
  q18: "",
  q19: "",
  q20: "",
  q21: "",
  q22: "",
};

const validationSchema = yup.object().shape({
  phone: yup.string().optional(),
  q1: yup.string().optional(),
  q2: yup.string().optional(),
  q3: yup.string().optional(),
  q3_1: yup.string().optional(),
  q3_2: yup.string().optional(),
  q3_3: yup.string().optional(),
  q3_4: yup.string().optional(),
  q3_5: yup.string().optional(),
  q4: yup.string().optional(),
  q4_day1_start: yup.string().optional(),
  q4_day2_start: yup.string().optional(),
  q4_day3_start: yup.string().optional(),
  q4_day4_start: yup.string().optional(),
  q4_day5_start: yup.string().optional(),
  q4_day6_start: yup.string().optional(),
  q4_day7_start: yup.string().optional(),
  q4_day1_end: yup.string().optional(),
  q4_day2_end: yup.string().optional(),
  q4_day3_end: yup.string().optional(),
  q4_day4_end: yup.string().optional(),
  q4_day5_end: yup.string().optional(),
  q4_day6_end: yup.string().optional(),
  q4_day7_end: yup.string().optional(),
  q5: yup.string().optional(),
  q6: yup.string().optional(),
  q7: yup.string().optional(),
  q8: yup.string().optional(),
  q12day1_morning: yup.string().optional(),
  q12day1_day: yup.string().optional(),
  q12day1_evening: yup.string().optional(),
  q12day1_morning_time: yup.string().optional(),
  q12day1_day_time: yup.string().optional(),
  q12day1_evening_time: yup.string().optional(),
  q12day2_morning: yup.string().optional(),
  q12day2_day: yup.string().optional(),
  q12day2_evening: yup.string().optional(),
  q12day2_morning_time: yup.string().optional(),
  q12day2_day_time: yup.string().optional(),
  q12day2_evening_time: yup.string().optional(),
  q12day3_morning: yup.string().optional(),
  q12day3_day: yup.string().optional(),
  q12day3_evening: yup.string().optional(),
  q12day3_morning_time: yup.string().optional(),
  q12day3_day_time: yup.string().optional(),
  q12day3_evening_time: yup.string().optional(),

  q9: yup.string().optional(),
  q10: yup.string().optional(),
  q11: yup.string().optional(),
  q12: yup.string().optional(),
  q13: yup.string().optional(),
  q14: yup.string().optional(),
  q15: yup.string().optional(),
  q16: yup.string().optional(),
  q17: yup.string().optional(),
  q18: yup.string().optional(),
  q19: yup.string().optional(),
  q20: yup.string().optional(),
  q21: yup.string().optional(),
  q22: yup.string().optional(),
});
const validationSchemaPhone = yup.object().shape({
  phone: yup.string().required("???????????? ?????????????? ????"),
  q1: yup.string().optional(),
  q2: yup.string().optional(),
  q3: yup.string().optional(),
  q3_1: yup.string().optional(),
  q3_2: yup.string().optional(),
  q3_3: yup.string().optional(),
  q3_4: yup.string().optional(),
  q3_5: yup.string().optional(),
  q4: yup.string().optional(),
  q4_day1_start: yup.string().optional(),
  q4_day2_start: yup.string().optional(),
  q4_day3_start: yup.string().optional(),
  q4_day4_start: yup.string().optional(),
  q4_day5_start: yup.string().optional(),
  q4_day6_start: yup.string().optional(),
  q4_day7_start: yup.string().optional(),
  q4_day1_end: yup.string().optional(),
  q4_day2_end: yup.string().optional(),
  q4_day3_end: yup.string().optional(),
  q4_day4_end: yup.string().optional(),
  q4_day5_end: yup.string().optional(),
  q4_day6_end: yup.string().optional(),
  q4_day7_end: yup.string().optional(),
  q5: yup.string().optional(),
  q6: yup.string().optional(),
  q7: yup.string().optional(),
  q8: yup.string().optional(),
  q12day1_morning: yup.string().optional(),
  q12day1_day: yup.string().optional(),
  q12day1_evening: yup.string().optional(),
  q12day1_morning_time: yup.string().optional(),
  q12day1_day_time: yup.string().optional(),
  q12day1_evening_time: yup.string().optional(),
  q12day2_morning: yup.string().optional(),
  q12day2_day: yup.string().optional(),
  q12day2_evening: yup.string().optional(),
  q12day2_morning_time: yup.string().optional(),
  q12day2_day_time: yup.string().optional(),
  q12day2_evening_time: yup.string().optional(),
  q12day3_morning: yup.string().optional(),
  q12day3_day: yup.string().optional(),
  q12day3_evening: yup.string().optional(),
  q12day3_morning_time: yup.string().optional(),
  q12day3_day_time: yup.string().optional(),
  q12day3_evening_time: yup.string().optional(),

  q9: yup.string().optional(),
  q10: yup.string().optional(),
  q11: yup.string().optional(),
  q12: yup.string().optional(),
  q13: yup.string().optional(),
  q14: yup.string().optional(),
  q15: yup.string().optional(),
  q16: yup.string().optional(),
  q17: yup.string().optional(),
  q18: yup.string().optional(),
  q19: yup.string().optional(),
  q20: yup.string().optional(),
  q21: yup.string().optional(),
  q22: yup.string().optional(),
});

function Question1({ id }) {
  const [initialValues, setInitialValues] = useState(model);
  const [advice, setAdvice] = useState();

  const onSubmit = async (values) => {
    try {
      if (!advice) {
        if (id) {
          await anythingAPI.create({
            any: {
              customer_id: id,
              type: "q1",
              ...values,
            },
          });
        } else {
          await anythingAPI.create({
            any: {
              customer_phone: values?.phone,
              type: "q1",
              ...values,
            },
          });
        }
      } else {
        await anythingAPI.update({
          id: advice?.id,
          any: {
            ...values,
          },
        });
      }

      message.success("??????????????????");
    } catch (error) {
      message.error("??????????????????");
    }
  };

  const fetchData = async () => {
    if (id) var res = await anythingAPI.getQ1(id);

    if (res) {
      setAdvice(res);
      setInitialValues(res.any);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card title="???????????? 1" bordered={false}>
      <Formik
        initialValues={initialValues}
        validationSchema={id ? validationSchema : validationSchemaPhone}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form layout="vertical">
          {id ? null : (
            <Row justify="center">
              <Col span={12}>
                <Card>
                  <Item name="phone" label="????????:">
                    <Input name="phone" placeholder="????????" />
                  </Item>
                </Card>
              </Col>
            </Row>
          )}
          <br />
          <Row gutter={30}>
            <Col span={12}>
              <Item
                label="1. ???????? ???? ???????? ?????????????? ?????????????????? ?????? ???????????? ???????? ?"
                name="q1"
              >
                <Radio.Group name="q1">
                  <Radio value="YES">????????</Radio>
                  <Radio value="NO">????????</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="2. ???????????????????? ?????? ???????????? ?????? ?????????? ?????? ???????????? ????"
                name="q2"
              >
                <Input placeholder="text" name="q2" />
              </Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={12} lg={24}>
              <Item label="3. ???????????? ?????????? " name="q3">
                <Input placeholder="text" name="q3" />
              </Item>
              <Item label="3.1. ???????????? ?????????????? " name="q3_1">
                <Input placeholder="text" name="q3_1" />
              </Item>
              <Item label="3.2. ??????????????" name="q3_2">
                <Input placeholder="text" name="q3_2" />
              </Item>
              <Item label="3.3. ???????????? " name="q3_3">
                <Input placeholder="" name="q3_3" />
              </Item>
              <Item label="3.4. ???????????? ???????????? " name="q3_4">
                <Input placeholder="text" name="q3_4" />
              </Item>
              <Item label="3.5. ???????????? " name="q3_5">
                <Input placeholder="text" name="q3_5" />
              </Item>
              <Row>
                <Col span={24}>
                  <Item label="5. ???????? ????????????????" name="q5">
                    <Radio.Group name="q5">
                      <Radio value="MUTCH">???? (2.5??)</Radio>
                      <Radio value="MEDIUM">???????? (1.5??)</Radio>
                      <Radio value="LITTLE">???????? (1.5?? ?????????????? ????????)</Radio>
                    </Radio.Group>
                  </Item>
                </Col>
                <Col span={24}>
                  <Item label="6. ?????????????? ????????????: " name="q11">
                    <Radio.Group name="q11">
                      <Radio value="24HOURS">24 ???????? 1-2</Radio>
                      <Radio value="48HOURS">48 ???????? 1-2</Radio>
                      <Radio value="72HOURS">72 ???????? 1-2</Radio>
                      <Radio value="AND_ABOUVE_THAT">?????????????? ????????</Radio>
                    </Radio.Group>
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={12} lg={24}>
              <div>4. ????????: ?????????????? 7 ??????????</div>
              <Row gutter={10}>
                <Col span={24}>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Item label="1-???? ????????????  ??????" name="q4_day1_start">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day1_end"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="1-???? ???????????? ??????" name="q4_day1_end">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day2_end"
                        />
                      </Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Item label="2-???? ????????????  ??????" name="q4_day2_start">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day2_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="2-???? ???????????? ??????" name="q4_day2_end">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day2_end"
                        />
                      </Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Item label="3-???? ????????????  ??????" name="q4_day3_start">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day3_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="3-???? ???????????? ??????" name="q4_day3_end">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day3_end"
                        />
                      </Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Item label="4-???? ????????????  ??????" name="q4_day4_start">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day4_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="4-???? ???????????? ????????" name="q4_day4_end">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day4_end"
                        />
                      </Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Item label="5-???? ????????????  ??????" name="q4_day5_start">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day5_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="5-???? ???????????? ??????" name="q4_day5_end">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day5_end"
                        />
                      </Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Item label="6-???? ????????????  ??????" name="q4_day6_start">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day6_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="6-???? ???????????? ??????" name="q4_day6_end">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day6_end"
                        />
                      </Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Item label="7-???? ????????????  ??????v" name="q4_day7_start">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day7_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="7-???? ???????????? ??????" name="q4_day7_end">
                        <TimePicker
                        format="HH"
                          style={{ width: "100%" }}
                          name="q4_day7_end"
                        />
                      </Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={12} xxl={5} lg={12}>
              <Item label="7. ????????????????: ???????????? ?????????? ???????????? ????????" name="q6">
                <Radio.Group name="q6">
                  <Radio value="YES">????????</Radio>
                  <Radio value="NO">????????</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={12} lg={12} xxl={5}>
              <Item label="8. ???????????? ?????????????? ????????????????: " name="q7">
                <Radio.Group name="q7">
                  <Radio value="MUTCH">????</Radio>
                  <Radio value="MEDIUM">???????? </Radio>
                  <Radio value="LITTLE">????????</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={12} xxl={5} lg={12}>
              <Item label="9. ?????????? ?????????? ?????????????? ????????????????:" name="q8">
                <Radio.Group name="q8">
                  <Radio value="MUTCH">????</Radio>
                  <Radio value="MEDIUM">???????? </Radio>
                  <Radio value="LITTLE">????????</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={12} xxl={5} lg={12}>
              <Item label="10. ???????????? ?????????????? ????????????????: " name="q9">
                <Radio.Group name="q9">
                  <Radio value="MUTCH">????</Radio>
                  <Radio value="MEDIUM">???????? </Radio>
                  <Radio value="LITTLE">????????</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={12} xxl={4} lg={24}>
              <Item label="11. ???????? ????????????????:" name="q10">
                <Radio.Group name="q10">
                  <Radio value="LITTLE">????????</Radio>
                  <Radio value="MEDIUM">???????? </Radio>
                  <Radio value="NORMAL">????????????</Radio>
                  <Radio value="MUTCH">?????? ????</Radio>
                </Radio.Group>
              </Item>
            </Col>
          </Row>
          <p>???????????? 12 ?????????????? 72 ???????? ?????????? ???????? ???????????? ?????????? ???? ?</p>
          <Row gutter={30}>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="1.??????????" name="q12day1_morning">
                    <Input name="q12day1_morning" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="??????" name="q12day1_morning_time">
                    <TimePicker format="HH" name="q12day1_morning_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="1. ????????" name="q12day1_day">
                    <Input name="q12day1_day_time" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="??????" name="q12day1_day_time">
                    <TimePicker format="HH" name="q12day1_day_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="1. ????????" name="q12day1_evening">
                    <Input name="q12day1_evening" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="??????" name="q12day1_evening_time">
                    <TimePicker format="HH" name="q12day1_evening_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="2.??????????" name="q12day2_morning">
                    <Input name="q12day2_morning" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="??????" name="q12day2_morning_time">
                    <TimePicker format="HH" name="q12day2_morning_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="2. ????????" name="q12day2_day">
                    <Input name="q12day2_day" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="??????" name="q12day2_day_time">
                    <TimePicker format="HH" name="q12day2_day_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="2. ????????" name="q12day2_evening">
                    <Input name="q12day2_evening" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="??????" name="q12day1_evening_time">
                    <TimePicker format="HH" name="q12day1_evening_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="3.??????????" name="q12day3_morning">
                    <Input name="q12day3_morning" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="??????" name="q12day3_morning_time">
                    <TimePicker format="HH" name="q12day3_morning_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="3. ????????" name="q12day3_day">
                    <Input name="q12day3_day" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="??????" name="q12day3_day_time">
                    <TimePicker format="HH" name="q12day3_day_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="3. ????????" name="q12day3_evening">
                    <Input name="q12day3_evening" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="??????" name="q12day3_evening_time">
                    <TimePicker format="HH" name="q12day3_evening_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={9}>
              <Item
                name="q13"
                label="???????????? 13 ???????????????????????? ?????????????? ???????????????? (????????, ????????, ?????????? , ??????????????)"
              >
                <Radio.Group name="q13">
                  <Radio value="SEVENDAY1-2">7 ???????????? 1-2 ????????</Radio>
                  <Radio value="FOURTEEN1-2">14 ???????????? 1-2 ????????</Radio>
                  <Radio value="THIRTY1-2">30 ???????????? 1-2 ????????</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={8}>
              <Item
                name="q14"
                label="???????????? 14 ?????????? ?????????? ?????????? ???????????????? ?????????? ???????????????????? ????????"
              >
                <Radio.Group name="q14">
                  <Radio value="YES">????????</Radio>
                  <Radio value="NO">????????</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={7}>
              <Item name="q15" label="???????????? 15 ???????? ?????????? ?????????????????? ???? ?">
                <Radio.Group name="q15">
                  <Radio value="YES">????????</Radio>
                  <Radio value="NO">????????</Radio>
                </Radio.Group>
              </Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={8} lg={24}>
              <Item
                name="q16"
                label="???????????? 16 ?????????????????? ?????? ???????? ?????????????????? ???? ? "
              >
                <Input name="q16" />
              </Item>
            </Col>
            <Col xl={8} lg={24}>
              <Row>
                <Col span={24}>
                  <Item name="q17" label="???????????? 17 ?????????????????? ???? ?????????? ?????? ????">
                    <Row gutter={20}>
                      <Col span={16}>
                        <Input name="q17" />
                      </Col>
                      <Col span={8}>
                        <Radio.Group name="q17">
                          <Radio value="NO">????????</Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Item
                name="q18"
                label="???????????? 18 ?????? ???????????????? ?????????? ?????? ???????? ?????? ???????????????? ?????? ???????????? ???? ?"
              >
                <Input name="q19" />
              </Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={10} lg={24}>
              <Item
                name="q19"
                label="???????????? 19 ?????????????? 24 ???????? ???????? ?????????? ???????????????? ?????????? ?????? ???????????????? ?????????? ???? ?"
              >
                <Radio.Group name="q18">
                  <Radio value="YES">????????</Radio>
                  <Radio value="NO">????????</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={7} lg={12}>
              <Item name="q20" label="???????????? 20 B,C ?????????? ???????????? ???? ?">
                <Radio.Group name="q20">
                  <Radio value="YES">????????</Radio>
                  <Radio value="NO">????????</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={7} lg={12}>
              <Item name="q21" label="???????????? 20 ???????? ???????? ???????????????? ???? ?">
                <Radio.Group name="q21">
                  <Radio value="YES">????????</Radio>
                  <Radio value="NO">????????</Radio>
                </Radio.Group>
              </Item>
            </Col>
          </Row>
          <Row></Row>
          <SubmitButton block icon={<SaveOutlined />}>
            ????????????????
          </SubmitButton>
        </Form>
      </Formik>
    </Card>
  );
}

export default memo(Question1);
