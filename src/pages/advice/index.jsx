import { ArrowLeftOutlined } from '@ant-design/icons'
import { Card, Col, PageHeader, Radio, Row, Collapse } from 'antd'
import { Formik } from 'formik'
import { Form, Input, TimePicker } from 'formik-antd'
import React, { memo } from 'react'
import * as yup from "yup"
const { Item } = Form;

const model = {
    q1: "", q2: "",
    q3: "", q3_1: "", q3_1: "", q3_3: "", q3_4: "", q3_5: "",
    q4: "", q4_day1_start: "", q4_day2_start: "", q4_day3_start: "", q4_day4_start: "", q4_day5_start: "", q4_day6_start: "", q4_day7_start: "",
    q4_day1_end: "", q4_day2_end: "", q4_day3_end: "", q4_day4_end: "", q4_day5_end: "", q4_day6_end: "", q4_day7_end: "",
    q5: "", q6: "", q7: "",
    q12day1_morning: "", q12day1_day: "", q12day1_evening: "",
    q12day1_morning_time: "", q12day1_day_time: "", q12day1_evening_time: "",
    q12day2_morning: "", q12day2_day: "", q12day2_evening: "",
    q12day2_morning_time: "", q12day2_day_time: "", q12day2_evening_time: "",
    q12day3_morning: "", q12day3_day: "", q12day3_evening: "",
    q12day3_morning_time: "", q12day3_day_time: "", q12day3_evening_time: "",
    q8: "", q9: "", q10: "",
    q11: "", q12: "", q13: "", q14: "", q15: "",
    q16: "", q17: "", q18: "", q19: "", q20: "", q21: "", q22: "",

}
const validationSchema = yup.object().shape({
    q1: yup.string().required("Заавал бөглөнө үү"), q2: yup.string().optional(),
    q3: yup.string().required("Заавал бөглөнө үү"), q3_1: yup.string().required("Заавал бөглөнө үү"), q3_2: yup.string().required("Заавал бөглөнө үү"), q3_3: yup.string().required("Заавал бөглөнө үү"), q3_4: yup.string().required("Заавал бөглөнө үү"), q3_5: yup.string().required("Заавал бөглөнө үү"),
    q4: yup.string().required("Заавал бөглөнө үү"),
    q4_day1_start: yup.string().required("Заавал бөглөнө үү"), q4_day2_start: yup.string().required("Заавал бөглөнө үү"), q4_day3_start: yup.string().required("Заавал бөглөнө үү"), q4_day4_start: yup.string().required("Заавал бөглөнө үү"), q4_day5_start: yup.string().required("Заавал бөглөнө үү"), q4_day6_start: yup.string().required("Заавал бөглөнө үү"), q4_day7_start: yup.string().required("Заавал бөглөнө үү"),
    q4_day1_end: yup.string().required("Заавал бөглөнө үү"), q4_day2_end: yup.string().required("Заавал бөглөнө үү"), q4_day3_end: yup.string().required("Заавал бөглөнө үү"), q4_day4_end: yup.string().required("Заавал бөглөнө үү"), q4_day5_end: yup.string().required("Заавал бөглөнө үү"), q4_day6_end: yup.string().required("Заавал бөглөнө үү"), q4_day7_end: yup.string().required("Заавал бөглөнө үү"),
    q5: yup.string().required("Заавал бөглөнө үү"), q6: yup.string().required("Заавал бөглөнө үү"),
    q7: yup.string().required("Заавал бөглөнө үү"), q8: yup.string().required("Заавал бөглөнө үү"),
    q12day1_morning: yup.string().required("Заавал бөглөнө үү"), q12day1_day: yup.string().required("Заавал бөглөнө үү"), q12day1_evening: yup.string().required("Заавал бөглөнө үү"),
    q12day1_morning_time: yup.string().required("Заавал бөглөнө үү"), q12day1_day_time: yup.string().required("Заавал бөглөнө үү"), q12day1_evening_time: yup.string().required("Заавал бөглөнө үү"),
    q12day2_morning: yup.string().required("Заавал бөглөнө үү"), q12day2_day: yup.string().required("Заавал бөглөнө үү"), q12day2_evening: yup.string().required("Заавал бөглөнө үү"),
    q12day2_morning_time: yup.string().required("Заавал бөглөнө үү"), q12day2_day_time: yup.string().required("Заавал бөглөнө үү"), q12day2_evening_time: yup.string().required("Заавал бөглөнө үү"),
    q12day3_morning: yup.string().required("Заавал бөглөнө үү"), q12day3_day: yup.string().required("Заавал бөглөнө үү"), q12day3_evening: yup.string().required("Заавал бөглөнө үү"),
    q12day3_morning_time: yup.string().required("Заавал бөглөнө үү"), q12day3_day_time: yup.string().required("Заавал бөглөнө үү"), q12day3_evening_time: yup.string().required("Заавал бөглөнө үү"),

    q9: yup.string().required("Заавал бөглөнө үү"), q10: yup.string().required("Заавал бөглөнө үү"),
    q11: yup.string().required("Заавал бөглөнө үү"), q12: yup.string().required("Заавал бөглөнө үү"),
    q13: yup.string().required("Заавал бөглөнө үү"), q14: yup.string().required("Заавал бөглөнө үү"),
    q15: yup.string().required("Заавал бөглөнө үү"), q16: yup.string().required("Заавал бөглөнө үү"),
    q17: yup.string().required("Заавал бөглөнө үү"), q18: yup.string().required("Заавал бөглөнө үү"),
    q19: yup.string().required("Заавал бөглөнө үү"), q20: yup.string().required("Заавал бөглөнө үү"),
    q21: yup.string().required("Заавал бөглөнө үү"), q22: yup.string().required("Заавал бөглөнө үү"),
})

function AdvicePage({ id }) {
    return (
        <>
            <br />
            <Collapse >
                <Collapse.Panel header="1-р Асуултууд" key="1">
                    <Card title="Асуулт" bordered={false}>
                        <Formik initialValues={model}>
                            <Form layout='vertical'>
                                <Row gutter={30}>
                                    <Col span={12}>
                                        <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                            <Radio.Group name="q1">
                                                <Radio value="YES">Тийм</Radio>
                                                <Radio value="NO">Үгүй</Radio>
                                            </Radio.Group>
                                        </Item>
                                    </Col>
                                    <Col span={12}>
                                        <Item label="2. Эмчилгээнд орж байсан бол хаана орж байсан бэ" name="q2">
                                            <Input placeholder='text' name='q2' />
                                        </Item>
                                    </Col>
                                </Row>
                                <Row gutter={30}>
                                    <Col span={12}>
                                        <Item label="3. Арьсны төрөл " name="q3">
                                            <Input placeholder='text' name='q3' />
                                        </Item>
                                        <Item label="3.1. Арьсны асуудал " name="q3_1">
                                            <Input placeholder='text' name='q3' />
                                        </Item>
                                        <Item label="3.2. Чийгшил" name="q3_2">
                                            <Input placeholder='text' name='q3_2' />
                                        </Item>
                                        <Item label="3.3. Тэжээл " name="q3_3">
                                            <Input placeholder='' name='q3_3' />
                                        </Item>
                                        <Item label="3.4. Арьсны зузаан " name="q3_4">
                                            <Input placeholder='text' name='q3_4' />
                                        </Item>
                                        <Item label="3.5. Онцлог " name="q3_5">
                                            <Input placeholder='text' name='q3_5' />
                                        </Item>
                                    </Col>
                                    <Col span={12}>
                                        <div>4. Нойр: Сүүлийн 7 хоног</div>
                                        <Row gutter={10} >
                                            <Col>
                                                <Col>
                                                    <Item label="1-дх Утсан цаг" name="q4_day1_start">
                                                        <TimePicker name='q4_day1_end' />
                                                    </Item>
                                                </Col>
                                                <Col>
                                                    <Item label="1-дх Өглөө сэрсэн цаг" name="q4_day1_end">
                                                        <TimePicker name='q4_day2_end' />
                                                    </Item>
                                                </Col>
                                            </Col>
                                            <Col>
                                                <Col>
                                                    <Item label="2-дх Утсан цаг" name="q4_day2_start">
                                                        <TimePicker name='q4_day2_start' />
                                                    </Item>
                                                </Col>
                                                <Col>
                                                    <Item label="2-дх Өглөө сэрсэн цаг" name="q4_day2_end">
                                                        <TimePicker name='q4_day2_end' />
                                                    </Item>
                                                </Col>
                                            </Col>
                                            <Col>
                                                <Col>
                                                    <Item label="3-дх Утсан цаг" name="q4_day3_start">
                                                        <TimePicker name='q4_day3_start' />
                                                    </Item>
                                                </Col>
                                                <Col>
                                                    <Item label="3-дх Өглөө сэрсэн цаг" name="q4_day3_end">
                                                        <TimePicker name='q4_day3_end' />
                                                    </Item>
                                                </Col>
                                            </Col>
                                            <Col>
                                                <Col>
                                                    <Item label="4-дх Утсан цаг" name="q4_day4_start">
                                                        <TimePicker name='q4_day4_start' />
                                                    </Item>
                                                </Col>
                                                <Col>
                                                    <Item label="4-дх Өглөө сэрсэн цагг" name="q4_day4_end">
                                                        <TimePicker name='q4_day4_end' />
                                                    </Item>
                                                </Col>
                                            </Col>
                                            <Col>
                                                <Col>
                                                    <Item label="5-дх Утсан цаг" name="q4_day5_start">
                                                        <TimePicker name='q4_day5_start' />
                                                    </Item>
                                                </Col>
                                                <Col>
                                                    <Item label="5-дх Өглөө сэрсэн цаг" name="q4_day5_end">
                                                        <TimePicker name='q4_day5_end' />
                                                    </Item>
                                                </Col>
                                            </Col>
                                            <Col>
                                                <Col>
                                                    <Item label="6-дх Утсан цаг" name="q4_day6_start">
                                                        <TimePicker name='q4_day6_start' />
                                                    </Item>
                                                </Col>
                                                <Col>
                                                    <Item label="6-дх Өглөө сэрсэн цаг" name="q4_day6_end">
                                                        <TimePicker name='q4_day6_end' />
                                                    </Item>
                                                </Col>
                                            </Col>
                                            <Col>
                                                <Col>
                                                    <Item label="7-дх Утсан цагv" name="q4_day7_start">
                                                        <TimePicker name='q4_day7_start' />
                                                    </Item>
                                                </Col>
                                                <Col>
                                                    <Item label="7-дх Өглөө сэрсэн цаг" name="q4_day7_end">
                                                        <TimePicker name='q4_day7_end' />
                                                    </Item>
                                                </Col>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col span={12}>
                                                <Item label="5. Усны хэрэглээ " name="q5">
                                                    <Radio.Group name="q5">
                                                        <Radio value="MUTCH">Их (2.5л)</Radio>
                                                        <Radio value="MEDIUM">Дунд (1.5л)</Radio>
                                                        <Radio value="LITTLE">Бага (1.5л түүнээс бага)</Radio>
                                                    </Radio.Group>
                                                </Item>
                                            </Col>
                                            <Col span={12}>
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
                                </Row>
                                <Row >
                                    <Col span={4}>
                                        <Item label="7. Хооллолт: Дэглэм бариж байгаа эсэх" name="q6">
                                            <Radio.Group name="q6">
                                                <Radio value="YES">Тийм</Radio>
                                                <Radio value="NO">Үгүй</Radio>
                                            </Radio.Group>
                                        </Item>
                                    </Col>
                                    <Col span={4}>
                                        <Item label="8. Цагаан идээний хэрэглээ: " name="q7">
                                            <Radio.Group name="q7">
                                                <Radio value="MUTCH">Их</Radio>
                                                <Radio value="MEDIUM">Дунд </Radio>
                                                <Radio value="LITTLE">Бага</Radio>
                                            </Radio.Group>
                                        </Item>
                                    </Col>
                                    <Col span={4}>
                                        <Item label="9. Ислэг ихтэй хүнсний хэрэглээ:" name="q8">
                                            <Radio.Group name="q8">
                                                <Radio value="MUTCH">Их</Radio>
                                                <Radio value="MEDIUM">Дунд </Radio>
                                                <Radio value="LITTLE">Бага</Radio>
                                            </Radio.Group>
                                        </Item>
                                    </Col>
                                    <Col span={4}>
                                        <Item label="10. Цагаан идээний хэрэглээ: " name="q9">
                                            <Radio.Group name="q9">
                                                <Radio value="MUTCH">Их</Radio>
                                                <Radio value="MEDIUM">Дунд </Radio>
                                                <Radio value="LITTLE">Бага</Radio>
                                            </Radio.Group>
                                        </Item>
                                    </Col>
                                    <Col span={4}>
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
                                <Row>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <Item label="1. Өглөө" name="q12day1_morning">
                                                    <Input name="q12day1_morning" />
                                                </Item>
                                            </Col>
                                            <Col span={12}>
                                                <Item label="Цаг" name='q12day1_morning_time'>
                                                    <TimePicker name='q12day1_morning_time' />
                                                </Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <Item label="1. Өдөр" name="q12day1_day">
                                                    <Input name="q12day1_day_time" />
                                                </Item>
                                            </Col>
                                            <Col span={12}>
                                                <Item label="Цаг" name='q12day1_day_time'>
                                                    <TimePicker name='q12day1_day_time' />
                                                </Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <Item label="1. Орой" name="q12day1_evening">
                                                    <Input name="q12day1_evening" />
                                                </Item>
                                            </Col>
                                            <Col span={12}>
                                                <Item label="Цаг" name='q12day1_evening_time'>
                                                    <TimePicker name='q12day1_evening_time' />
                                                </Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <Item label="2. Өглөө" name="q12day2_morning">
                                                    <Input name="q12day2_morning" />
                                                </Item>
                                            </Col>
                                            <Col span={12}>
                                                <Item label="Цаг" name='q12day2_morning_time'>
                                                    <TimePicker name='q12day2_morning_time' />
                                                </Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <Item label="2. Өдөр" name="q12day2_day">
                                                    <Input name="q12day2_day" />
                                                </Item>
                                            </Col>
                                            <Col span={12}>
                                                <Item label="Цаг" name='q12day2_day_time'>
                                                    <TimePicker name='q12day2_day_time' />
                                                </Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <Item label="2. Орой" name="q12day2_evening">
                                                    <Input name="q12day2_evening" />
                                                </Item>
                                            </Col>
                                            <Col span={12}>
                                                <Item label="Цаг" name='q12day1_evening_time'>
                                                    <TimePicker name='q12day1_evening_time' />
                                                </Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <Item label="3. Өглөө" name="q12day3_morning">
                                                    <Input name="q12day3_morning" />
                                                </Item>
                                            </Col>
                                            <Col span={12}>
                                                <Item label="Цаг" name='q12day3_morning_time'>
                                                    <TimePicker name='q12day3_morning_time' />
                                                </Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <Item label="3. Өдөр" name="q12day3_day">
                                                    <Input name="q12day3_day" />
                                                </Item>
                                            </Col>
                                            <Col span={12}>
                                                <Item label="Цаг" name='q12day3_day_time'>
                                                    <TimePicker name='q12day3_day_time' />
                                                </Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <Item label="3. Орой" name="q12day3_evening">
                                                    <Input name="q12day3_evening" />
                                                </Item>
                                            </Col>
                                            <Col span={12}>
                                                <Item label="Цаг" name='q12day3_evening_time'>
                                                    <TimePicker name='q12day3_evening_time' />
                                                </Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Item name="q13" label="Асуулт.13 Согтууруулах ундааны хэрэглээ (Архи, Пиво, Виски , Коньякь)">
                                            <Radio.Group name="q13">
                                                <Radio value="SEVENDAY1-2">7 хоногт 1-2 удаа</Radio>
                                                <Radio value="FOURTEEN1-2">14 хоногт 1-2 удаа</Radio>
                                                <Radio value="THIRTY1-2">30 хоногт 1-2 удаа</Radio>
                                            </Radio.Group>
                                        </Item>
                                    </Col>
                                    <Col span={8}>
                                        <Item name="q14" label="Асуулт.14 Тамхи болон бусад электрон тамхи хэрэглэдэг эсэх">
                                            <Radio.Group name="q14">
                                                <Radio value="YES">Тийм</Radio>
                                                <Radio value="NO">Үгүй</Radio>
                                            </Radio.Group>
                                        </Item>
                                    </Col>
                                    <Col span={8}>
                                        <Item name="q15" label="Асуулт.15 Ямар нэгэн харшилтай юу ?">
                                            <Radio.Group name="q15">
                                                <Radio value="YES">Тийм</Radio>
                                                <Radio value="NO">Үгүй</Radio>
                                            </Radio.Group>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row gutter={220}>
                                    <Col >
                                        <Item name='q16' label="Асуулт.16 Харшилтай бол юуны харшилтай бэ ? ">
                                            <Input name='q16' />
                                        </Item>
                                    </Col>
                                    <Col >
                                        <Item name='q17' label="Асуулт.17 Харшилдаг эм тариа бий юу">
                                            <Row gutter={20}>
                                                <Col>
                                                    <Input name='q17' />
                                                </Col>
                                                <Col>
                                                    <Radio.Group name="q17">
                                                        <Radio value="NO">Үгүй</Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                        </Item>
                                    </Col>
                                    <Col >
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Item name="q18" label="Асуулт.18 Сүүлийн 24 сард ямар нэгэн хагалгаа болон мэс ажилбарт орсон уу ?">
                                            <Radio.Group name="q18">
                                                <Radio value="YES">Тийм</Radio>
                                                <Radio value="NO">Үгүй</Radio>
                                            </Radio.Group>
                                        </Item>
                                    </Col>
                                    <Col span={12}>
                                        <Item name="q19" label="Асуулт.19 Мэс ажилбарт орсон бол юуны мэс ажилбарт орц байсан бэ ?">
                                            <Input name='q19' />
                                        </Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Item name="q19" label="Асуулт.19 B,C вирус байгаа юу ?">
                                            <Radio.Group name="q19">
                                                <Radio value="YES">Тийм</Radio>
                                                <Radio value="NO">Үгүй</Radio>
                                            </Radio.Group>
                                        </Item>
                                    </Col>
                                    <Col span={8}>
                                        <Item name="q20" label="Асуулт.20 Ужиг хууч өвчинтэй юу ?">
                                            <Radio.Group name="q20">
                                                <Radio value="YES">Тийм</Radio>
                                                <Radio value="NO">Үгүй</Radio>
                                            </Radio.Group>
                                        </Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Formik>
                    </Card>
                </Collapse.Panel>
                <Collapse.Panel header="2-р асуултууд">
                </Collapse.Panel>
            </Collapse>
        </>
    )
}

export default memo(AdvicePage)