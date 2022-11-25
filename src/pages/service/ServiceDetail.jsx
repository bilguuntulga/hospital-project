import React, { memo } from 'react'
import ServiceForm from "./form";

function ServiceDetail() {
  return (
    <div>
      <ServiceForm create={false} />
    </div>

  )
}

export default memo(ServiceDetail)