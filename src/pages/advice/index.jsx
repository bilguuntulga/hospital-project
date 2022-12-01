import { ArrowLeftOutlined } from '@ant-design/icons'
import { Card, Col, PageHeader, Radio, Row } from 'antd'
import { Formik } from 'formik'
import { Form, Input, TimePicker } from 'formik-antd'
import React from 'react'
import * as yup from "yup"
const { Item } = Form;

const model = {
    q1: "", q2: "",
    q3: "", q3_1: "", q3_1: "", q3_3: "", q3_4: "", q3_5: "",
    q4: "", q4_day1: "", q4_day2: "", q4_day3: "", q4_day4: "", q4_day5: "", q4_day6: "", q4_day7: "",
    q5: "", q6: "", q7: "", q8: "", q9: "", q10: "",
    q11: "", q12: "", q13: "", q14: "", q15: "",
    q16: "", q17: "", q18: "", q19: "", q20: "", q21: "", q22: "",

}
const validationSchema = yup.object().shape({
    q1: yup.string().required("Заавал бөглөнө үү"), q2: yup.string().optional(),
    q3: yup.string().required("Заавал бөглөнө үү"), q3_1: yup.string().required("Заавал бөглөнө үү"), q3_2: yup.string().required("Заавал бөглөнө үү"), q3_3: yup.string().required("Заавал бөглөнө үү"), q3_4: yup.string().required("Заавал бөглөнө үү"), q3_5: yup.string().required("Заавал бөглөнө үү"),
    q4: yup.string().required("Заавал бөглөнө үү"), q4_day1: yup.string().required("Заавал бөглөнө үү"), q4_day2: yup.string().required("Заавал бөглөнө үү"), q4_day3: yup.string().required("Заавал бөглөнө үү"), q4_day4: yup.string().required("Заавал бөглөнө үү"), q4_day5: yup.string().required("Заавал бөглөнө үү"), q4_day6: yup.string().required("Заавал бөглөнө үү"), q4_day7: yup.string().required("Заавал бөглөнө үү"),
    q5: yup.string().required("Заавал бөглөнө үү"), q6: yup.string().required("Заавал бөглөнө үү"),
    q7: yup.string().required("Заавал бөглөнө үү"), q8: yup.string().required("Заавал бөглөнө үү"),
    q9: yup.string().required("Заавал бөглөнө үү"), q10: yup.string().required("Заавал бөглөнө үү"),
    q11: yup.string().required("Заавал бөглөнө үү"), q12: yup.string().required("Заавал бөглөнө үү"),
    q13: yup.string().required("Заавал бөглөнө үү"), q14: yup.string().required("Заавал бөглөнө үү"),
    q15: yup.string().required("Заавал бөглөнө үү"), q16: yup.string().required("Заавал бөглөнө үү"),
    q17: yup.string().required("Заавал бөглөнө үү"), q18: yup.string().required("Заавал бөглөнө үү"),
    q19: yup.string().required("Заавал бөглөнө үү"), q20: yup.string().required("Заавал бөглөнө үү"),
    q21: yup.string().required("Заавал бөглөнө үү"), q22: yup.string().required("Заавал бөглөнө үү"),
})

function AdvicePage() {
    return (
        <>
            <PageHeader title={<ArrowLeftOutlined />} />
            <Card title="Асуулт">
                <Formik>
                    <Form layout='vertical'>
                        <Row>
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
                        <Row>
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
                                <Row gutter={10}>
                                    <Col>
                                        <Item label="Нэг" name="q4_day1">
                                            <TimePicker name='q4_day1' />
                                        </Item>
                                    </Col>
                                    <Col>
                                        <Item label="Хоёр" name="q4_day2">
                                            <TimePicker name='q4_day2' />
                                        </Item>
                                    </Col>
                                    <Col>
                                        <Item label="Гурав" name="q4_day3">
                                            <TimePicker name='q4_day3' />
                                        </Item>
                                    </Col>
                                    <Col>
                                        <Item label="Дөрөв" name="q4_day4">
                                            <TimePicker name='q4_day4' />
                                        </Item>
                                    </Col>
                                    <Col>
                                        <Item label="Тав" name="q4_day5">
                                            <TimePicker name='q4_day5' />
                                        </Item>
                                    </Col>
                                    <Col>
                                        <Item label="Зургай" name="q4_day6">
                                            <TimePicker name='q4_day6' />
                                        </Item>
                                    </Col>
                                    <Col>
                                        <Item label="Долоо" name="q4_day7">
                                            <TimePicker name='q4_day7' />
                                        </Item>
                                    </Col>
                                </Row>
                                <p>4. Нойр: Сүүлийн 7 хоног</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>

                            </Col>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="1. Өмнө нь ижил төрлийн эмчилгээд орж байсан эсэх ??" name="q1">
                                    <Radio.Group name="q1">
                                        <Radio value="YES">Тийм</Radio>
                                        <Radio value="NO">Үгүй</Radio>
                                    </Radio.Group>
                                </Item>
                            </Col>
                        </Row>

                    </Form>
                </Formik>
            </Card>
        </>
    )
}

export default AdvicePage