import { SaveOutlined } from "@ant-design/icons";
import { Card, Col, Row, Collapse, message } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton, TimePicker, Radio } from "formik-antd";
import React, { memo, useEffect, useState } from "react";
import { anythingAPI } from "../../apis";
import * as yup from "yup";
const { Item } = Form;

const model = {
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
        await anythingAPI.create({
          any: {
            customer_id: id,
            type: "q1",
            ...values,
          },
        });
      } else {
        await anythingAPI.update({
          id: advice?.id,
          any: {
            ...values,
          },
        });
      }

      message.success("Амжилттай");
    } catch (error) {
      message.error("Амжилтгүй");
    }
  };

  const fetchData = async () => {
    const res = await anythingAPI.getQ1(id);
    if (res) {
      setAdvice(res);
      setInitialValues(res.any);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card title="Асуулт" bordered={false}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form layout="vertical">
          <Row gutter={30}>
            <Col span={12}>
              <Item
                label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??"
                name="q1"
              >
                <Radio.Group name="q1">
                  <Radio value="YES">Тийм</Radio>
                  <Radio value="NO">Үгүй</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="2. Эмчилгээнд орж байсан бол хаана орж байсан бэ"
                name="q2"
              >
                <Input placeholder="text" name="q2" />
              </Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={12} lg={24}>
              <Item label="3. Арьсны төрөл " name="q3">
                <Input placeholder="text" name="q3" />
              </Item>
              <Item label="3.1. Арьсны асуудал " name="q3_1">
                <Input placeholder="text" name="q3_1" />
              </Item>
              <Item label="3.2. Чийгшил" name="q3_2">
                <Input placeholder="text" name="q3_2" />
              </Item>
              <Item label="3.3. Тэжээл " name="q3_3">
                <Input placeholder="" name="q3_3" />
              </Item>
              <Item label="3.4. Арьсны зузаан " name="q3_4">
                <Input placeholder="text" name="q3_4" />
              </Item>
              <Item label="3.5. Онцлог " name="q3_5">
                <Input placeholder="text" name="q3_5" />
              </Item>
              <Row>
                <Col span={24}>
                  <Item label="5. Усны хэрэглээ" name="q5">
                    <Radio.Group name="q5">
                      <Radio value="MUTCH">Их (2.5л)</Radio>
                      <Radio value="MEDIUM">Дунд (1.5л)</Radio>
                      <Radio value="LITTLE">Бага (1.5л түүнээс бага)</Radio>
                    </Radio.Group>
                  </Item>
                </Col>
                <Col span={24}>
                  <Item label="6. Өтгөний гаралт: " name="q11">
                    <Radio.Group name="q11">
                      <Radio value="24HOURS">24 цагт 1-2</Radio>
                      <Radio value="48HOURS">48 цагт 1-2</Radio>
                      <Radio value="72HOURS">72 цагт 1-2</Radio>
                      <Radio value="AND_ABOUVE_THAT">Түүнээс дээш</Radio>
                    </Radio.Group>
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={12} lg={24}>
              <div>4. Нойр: Сүүлийн 7 хоног</div>
              <Row gutter={10}>
                <Col span={24}>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Item label="1-дх Утсан цаг" name="q4_day1_start">
                        <TimePicker
                          style={{ width: "100%" }}
                          name="q4_day1_end"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="1-дх сэрсэн цаг" name="q4_day1_end">
                        <TimePicker
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
                      <Item label="2-дх Утсан цаг" name="q4_day2_start">
                        <TimePicker
                          style={{ width: "100%" }}
                          name="q4_day2_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="2-дх сэрсэн цаг" name="q4_day2_end">
                        <TimePicker
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
                      <Item label="3-дх Утсан цаг" name="q4_day3_start">
                        <TimePicker
                          style={{ width: "100%" }}
                          name="q4_day3_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="3-дх сэрсэн цаг" name="q4_day3_end">
                        <TimePicker
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
                      <Item label="4-дх Утсан цаг" name="q4_day4_start">
                        <TimePicker
                          style={{ width: "100%" }}
                          name="q4_day4_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="4-дх сэрсэн цагг" name="q4_day4_end">
                        <TimePicker
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
                      <Item label="5-дх Утсан цаг" name="q4_day5_start">
                        <TimePicker
                          style={{ width: "100%" }}
                          name="q4_day5_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="5-дх сэрсэн цаг" name="q4_day5_end">
                        <TimePicker
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
                      <Item label="6-дх Утсан цаг" name="q4_day6_start">
                        <TimePicker
                          style={{ width: "100%" }}
                          name="q4_day6_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="6-дх сэрсэн цаг" name="q4_day6_end">
                        <TimePicker
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
                      <Item label="7-дх Утсан цагv" name="q4_day7_start">
                        <TimePicker
                          style={{ width: "100%" }}
                          name="q4_day7_start"
                        />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label="7-дх сэрсэн цаг" name="q4_day7_end">
                        <TimePicker
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
              <Item label="7. Хооллолт: Дэглэм бариж байгаа эсэх" name="q6">
                <Radio.Group name="q6">
                  <Radio value="YES">Тийм</Radio>
                  <Radio value="NO">Үгүй</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={12} lg={12} xxl={5}>
              <Item label="8. Цагаан идээний хэрэглээ: " name="q7">
                <Radio.Group name="q7">
                  <Radio value="MUTCH">Их</Radio>
                  <Radio value="MEDIUM">Дунд </Radio>
                  <Radio value="LITTLE">Бага</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={12} xxl={5} lg={12}>
              <Item label="9. Ислэг ихтэй хүнсний хэрэглээ:" name="q8">
                <Radio.Group name="q8">
                  <Radio value="MUTCH">Их</Radio>
                  <Radio value="MEDIUM">Дунд </Radio>
                  <Radio value="LITTLE">Бага</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={12} xxl={5} lg={12}>
              <Item label="10. Цагаан идээний хэрэглээ: " name="q9">
                <Radio.Group name="q9">
                  <Radio value="MUTCH">Их</Radio>
                  <Radio value="MEDIUM">Дунд </Radio>
                  <Radio value="LITTLE">Бага</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={12} xxl={4} lg={24}>
              <Item label="11. Арьс арчилгаа:" name="q10">
                <Radio.Group name="q10">
                  <Radio value="LITTLE">Бага</Radio>
                  <Radio value="MEDIUM">Дунд </Radio>
                  <Radio value="NORMAL">Хэвийн</Radio>
                  <Radio value="MUTCH">Хэт их</Radio>
                </Radio.Group>
              </Item>
            </Col>
          </Row>
          <p>Асуулт.12 Сүүлийн 72 цагт идсэн хоол хүнсээ хэлнэ үү ?</p>
          <Row gutter={30}>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="1.Өглөө" name="q12day1_morning">
                    <Input name="q12day1_morning" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Цаг" name="q12day1_morning_time">
                    <TimePicker name="q12day1_morning_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="1. Өдөр" name="q12day1_day">
                    <Input name="q12day1_day_time" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Цаг" name="q12day1_day_time">
                    <TimePicker name="q12day1_day_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="1. Орой" name="q12day1_evening">
                    <Input name="q12day1_evening" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Цаг" name="q12day1_evening_time">
                    <TimePicker name="q12day1_evening_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="2.Өглөө" name="q12day2_morning">
                    <Input name="q12day2_morning" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Цаг" name="q12day2_morning_time">
                    <TimePicker name="q12day2_morning_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="2. Өдөр" name="q12day2_day">
                    <Input name="q12day2_day" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Цаг" name="q12day2_day_time">
                    <TimePicker name="q12day2_day_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="2. Орой" name="q12day2_evening">
                    <Input name="q12day2_evening" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Цаг" name="q12day1_evening_time">
                    <TimePicker name="q12day1_evening_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="3.Өглөө" name="q12day3_morning">
                    <Input name="q12day3_morning" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Цаг" name="q12day3_morning_time">
                    <TimePicker name="q12day3_morning_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="3. Өдөр" name="q12day3_day">
                    <Input name="q12day3_day" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Цаг" name="q12day3_day_time">
                    <TimePicker name="q12day3_day_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="3. Орой" name="q12day3_evening">
                    <Input name="q12day3_evening" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Цаг" name="q12day3_evening_time">
                    <TimePicker name="q12day3_evening_time" />
                  </Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={9}>
              <Item
                name="q13"
                label="Асуулт.13 Согтууруулах ундааны хэрэглээ (Архи, Пиво, Виски , Коньякь)"
              >
                <Radio.Group name="q13">
                  <Radio value="SEVENDAY1-2">7 хоногт 1-2 удаа</Radio>
                  <Radio value="FOURTEEN1-2">14 хоногт 1-2 удаа</Radio>
                  <Radio value="THIRTY1-2">30 хоногт 1-2 удаа</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={8}>
              <Item
                name="q14"
                label="Асуулт.14 Тамхи болон бусад электрон тамхи хэрэглэдэг эсэх"
              >
                <Radio.Group name="q14">
                  <Radio value="YES">Тийм</Radio>
                  <Radio value="NO">Үгүй</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={7}>
              <Item name="q15" label="Асуулт.15 Ямар нэгэн харшилтай юу ?">
                <Radio.Group name="q15">
                  <Radio value="YES">Тийм</Radio>
                  <Radio value="NO">Үгүй</Radio>
                </Radio.Group>
              </Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={8} lg={24}>
              <Item
                name="q16"
                label="Асуулт.16 Харшилтай бол юуны харшилтай бэ ? "
              >
                <Input name="q16" />
              </Item>
            </Col>
            <Col xl={8} lg={24}>
              <Row>
                <Col span={24}>
                  <Item name="q17" label="Асуулт.17 Харшилдаг эм тариа бий юу">
                    <Row gutter={20}>
                      <Col span={16}>
                        <Input name="q17" />
                      </Col>
                      <Col span={8}>
                        <Radio.Group name="q17">
                          <Radio value="NO">Үгүй</Radio>
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
                label="Асуулт.18 Мэс ажилбарт орсон бол юуны мэс ажилбарт орц байсан бэ ?"
              >
                <Input name="q19" />
              </Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col xl={10} lg={24}>
              <Item
                name="q19"
                label="Асуулт.19 Сүүлийн 24 сард ямар нэгэн хагалгаа болон мэс ажилбарт орсон уу ?"
              >
                <Radio.Group name="q18">
                  <Radio value="YES">Тийм</Radio>
                  <Radio value="NO">Үгүй</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={7} lg={12}>
              <Item name="q20" label="Асуулт.20 B,C вирус байгаа юу ?">
                <Radio.Group name="q20">
                  <Radio value="YES">Тийм</Radio>
                  <Radio value="NO">Үгүй</Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col xl={7} lg={12}>
              <Item name="q21" label="Асуулт.20 Ужиг хууч өвчинтэй юу ?">
                <Radio.Group name="q21">
                  <Radio value="YES">Тийм</Radio>
                  <Radio value="NO">Үгүй</Radio>
                </Radio.Group>
              </Item>
            </Col>
          </Row>
          <Row></Row>
          <SubmitButton block icon={<SaveOutlined />}>
            Хадгалах
          </SubmitButton>
        </Form>
      </Formik>
    </Card>
  );
}

export default memo(Question1);
