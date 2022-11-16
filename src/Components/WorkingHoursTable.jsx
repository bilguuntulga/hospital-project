import { Button, Descriptions, Form, Modal, Select, Switch, Table, TimePicker } from 'antd'
import { Field } from 'formik'
import React, { useState } from 'react'
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import { doctorAPI } from '../apis';

function WorkingHoursTable({ id, workingHours }) {
    const [showModal, setShowModal] = useState(false);
    const [isRest, setIsRest] = useState(false);

    const columns = [
        {
            title: "Өдөр",
            render: (_, record) => `${dayTranslater(record?.day)}`
        },
        {
            title: "Эхлэх цаг",
            render: (_, record) => `${record?.start_time ?? "-"}`
        },
        {
            title: "Дуусах цаг",
            render: (_, record) => `${record?.end_time ?? "-"}`
        }
    ];

    const onFinish = (values) => {
        if (values.rest) {
            workingHours?.forEach(e => {
                if (values.day.some(x => x == e.id)) {
                    e.start_time = null;
                    e.end_time = null;
                }
            });
        } else {
            const start_time = moment(values.time[0]).format("hh:mm:ss");
            const end_time = moment(values.time[1]).format("hh:mm:ss");
            workingHours?.forEach(e => {
                if (values.day.some(x => x == e.id)) {
                    e.start_time = start_time;
                    e.end_time = end_time;
                }
            });
        }

        toast.promise(
            doctorAPI.update({
                id,
                working_hours: workingHours                                                                                                                                                                                                                                                         
            }),
            {
                pending: "Илгээж байна",
                success: "Амжилттай",
                error: "Амжилтгүй"
            }
        );
    }

    return (
        <>
            <Button onClick={() => setShowModal(true)}>Засах</Button>
            <Table columns={columns} dataSource={workingHours} pagination={false} />
            <ToastContainer />
            <Modal open={showModal} onCancel={() => setShowModal(false)} footer={null} title="Ажлын хувиар засах">
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item name="day" label="Өдөр сонгох" rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}>
                        <Select mode='multiple'>
                            {
                                workingHours?.map((e, i) => <Select.Option key={i} value={e.id}>
                                    {dayTranslater(e.day)}
                                </Select.Option>)
                            }
                        </Select>
                    </Form.Item >
                    <Form.Item name="rest" label="Амралтын өдөр">
                        <Switch name="rest" onClick={() => setIsRest(!isRest)} />
                    </Form.Item>
                    {
                        !isRest ?
                            <Form.Item name={"time"} label="Цаг сонгох" rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}>
                                <TimePicker.RangePicker name={"time"} format="hh:mm" />
                            </Form.Item> : null
                    }
                    <Button htmlType='submit'>Хадаглах</Button>
                </Form>
            </Modal>
        </>

    )
}

const dayTranslater = (day) => ({
    monday: "Даваа",
    tuesday: "Мягмар",
    wednesday: "Лхавга",
    thursday: "Пүрэв",
    friday: "Баасан",
    saturday: "Бямба",
    sunday: "Ням"
}[`${day}`])

export default WorkingHoursTable