import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Card, Row, Col, Modal, Form, Input, Select, TimePicker, Button, Tooltip, Alert, DatePicker, Space } from 'antd';
import CalendarData from './CalendarData.jsx';
import moment from 'moment';
import { CalendarOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import * as yup from "yup"
import { SubmitButton } from 'formik-antd';
import "./style.css"

const { RangePicker } = DatePicker;
const { Option } = Select;

const badgeColors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
];

const initialFormValues = {
    title: '',
    start: moment('00:00:00', 'HH:mm:ss'),
    end: moment('00:00:00', 'HH:mm:ss'),
    bullet: badgeColors[0]
}

const dateFormat = 'DD MMMM'

const AgendaList = props => {
    const { list, onDelete } = props
    return (
        list.map(list => (
            <div key={list.date} className="calendar-list">
                <h4>
                    <span className="ml-2">{list.date}:Захиалагууд</span>
                </h4>
                {
                    list.event.map((eventItem, i) => (
                        <div key={`${eventItem.title}-${i}`} className="calendar-list-item">
                            <Row justify="space-between">
                                <Col>
                                    <div className="d-flex">
                                        <div>
                                            <h5 className="mb-1">{eventItem.title}</h5>
                                            <span className="text-muted">{eventItem.start} - {eventItem.end}</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="calendar-list-item-delete">
                                        <Tooltip title="Delete event">
                                            <Space size={10}>
                                                <EditOutlined style={{ fontSize: "20px" }} onClick={() => onDelete(list.date, i)} />
                                                <DeleteOutlined style={{ color: "red", fontSize: "20px" }} onClick={() => onDelete(list.date, i)} />
                                            </Space>
                                        </Tooltip>
                                    </div>
                                </Col>
                            </Row>
                            <hr style={{ color: "rgba(216, 210, 252, 0.64)" }} />
                        </div>
                    ))
                }
            </div>
        ))
    )
}
const model = {
    name: "",
    phone: "",
    order_type: "",
    data: [],
    desc: ""
}
const validationSchema = yup.object().shape({
    name: yup.string().min(5).required("Заавал бөглөнө үү"),
    order_type: yup.string().min(5).required("Заавал бөглөнө үү"),
    phone: yup.number().min(8).required("Заавал бөглөнө үү"),
    date: yup.array().min(5).required("Заавал бөглөнө үү"),
    desc: yup.string().min(5).optional(),
})
const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}


const EventModal = ({ visible, addEvent, cancel }) => {
    const [form] = Form.useForm();
    const onSubmit = values => {
        addEvent(values)
    }

    useEffect(() => {
        form.setFieldsValue(initialFormValues);
    });

    return (
        <Modal
            title="Цаг захиалах"
            visible={visible}
            footer={null}
            destroyOnClose={true}
            onCancel={cancel}
        >
            <Formik initialValues={model} validationSchema={validationSchema}>

                <Form
                    layout='vertical'
                >
                    <Form.Item name="name" label="Нэр">
                        <Input autoComplete="off" placeholder='Нэр' name='name' />
                    </Form.Item>
                    <Form.Item label="Цаг">
                        <RangePicker renderExtraFooter={() => 'extra footer'} showTime style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name="order_type" label="Эмчилгээний төрөл">
                        <Select name="order_type" options={options} mode="tags" />
                    </Form.Item>
                    <Form.Item name="contor_name" label="Эмчийн нэр">
                        <Select name="doctor_name">
                            <Option>
                                baldam dorj🇯🇵
                            </Option>
                            <Option>
                                sugar🇺🇸
                            </Option>
                            <Option>
                                dulmaa
                            </Option>
                            <Option>
                                bat 🇨
                            </Option>
                            <Option>
                                suhee 🇨🇳
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="text-right mb-0">
                        <SubmitButton className='save_button'>Хадгалах</SubmitButton>
                    </Form.Item>
                </Form>
            </Formik>
        </Modal>
    )
}

const CalendarApp = () => {
    const [calendarList, setCalendarList] = useState(CalendarData);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const cellRender = value => {
        const listData = getListData(value.format((dateFormat)));
        return (
            <ul className="calendar-event">
                {listData.map((item, i) => (
                    <li key={`${item.title}-${i}`}>
                        <Badge color={item.bullet} text={item.title} />
                    </li>
                ))}
            </ul>
        );
    }

    const getListData = (value) => {
        let listData = [];
        calendarList.forEach(elm => {
            if (elm.date === value) {
                listData = elm.event
            }
        })
        return listData;
    }

    const onSelect = value => {
        console.log(value);
        const selectedDate = value.format((dateFormat))
        setModalVisible(true);
        setSelectedDate(selectedDate)
    }

    const onDeleteEvent = (date, index) => {
        const data = calendarList.map(calendarList => {
            if (calendarList.date === date) {
                calendarList.event = calendarList.event.filter((_, i) => i !== index)
            }
            return calendarList
        }).filter(elm => elm.event.length !== 0)
        setCalendarList(data)
    }

    const onAddEvent = values => {
        const data = [{
            title: values.title ? values.title : 'Untitled Event',
            bullet: values.bullet,
            start: values.start.format(('HH:mm A')),
            end: values.end.format(('HH:mm A')),
        }]
        const newCalendarArr = calendarList
        const isExistingDate = newCalendarArr.find(x => x.date === selectedDate)
        if (isExistingDate) {
            for (let elm of newCalendarArr) {
                if (elm.date === selectedDate) {
                    elm.event = [...elm.event, ...data]
                }
            }
        } else {
            newCalendarArr.push({ date: selectedDate, event: data })
        }
        const sortedNewCalendarArr = newCalendarArr.sort((a, b) => moment(a.date) - moment(b.date))
        setModalVisible(false)
        setCalendarList(sortedNewCalendarArr)
    }

    const onAddEventCancel = () => {
        setModalVisible(false)
    }

    return (
        <>
            <p style={{ fontSize: "20px" }}><b>Registration</b></p>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={9} lg={6}>
                    <Card className="calendar mb-0" style={{ borderRadius: "15px" }}>
                        <h2 className="mb-4">Захиалгатай цагууд</h2>
                        <AgendaList
                            list={calendarList}
                            onDelete={onDeleteEvent}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={15} lg={18}>
                    <Card style={{ borderRadius: "15px" }}>
                        {/* <Alert message={`You selected date: ${moment(new Date).format("YYYY.MM.DD")}`} /> */}
                        <Calendar
                            onSelect={val => onSelect(val)}
                            dateCellRender={cellRender}
                        />
                    </Card>
                </Col>
            </Row>
            <EventModal
                visible={modalVisible}
                addEvent={onAddEvent}
                cancel={onAddEventCancel}
            />
        </>
    )
}

export default CalendarApp
