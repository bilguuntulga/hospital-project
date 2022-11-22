import React, { memo } from 'react'
import ServiceForm from "./form";

function ServiceDetail() {
  return (
    <div className='service__detail'>
      <ServiceForm create={false} />
    </div>

  )
}

export default memo(ServiceDetail)