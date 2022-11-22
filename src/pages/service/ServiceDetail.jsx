import React, { memo, useEffect, useState } from 'react'
import { useParams, useLocation } from "react-router-dom"
import { servicesAPI } from '../../apis';
import PageLoading from '../../components/PageLoading';
import * as yup from "yup"
import { Formik } from 'formik';
import { Form, Input, Select, SubmitButton } from 'formik-antd';
import { Button, Col, Image, Row } from 'antd';
import UploadImage from "../../components/form/UploadImage";
import ServiceForm from "./form";


const model = {
  name: "",
  desc: "",
  type: "",
  price: 0,
  services: [],
  images: [],
}


function ServiceDetail() {
  return (
    <div className='service__detail'>
      <ServiceForm create={false} />
    </div>

  )
}

export default memo(ServiceDetail)