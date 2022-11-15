import React from 'react'

const doctors = ({ image, name, type }) => {
  return (
    <>
      <div style={{ width: "394px", height: "479px", backgroundColor: "white", display: "grid", placeItems: "center" ,paddingTop:"20px"}}>
        <img src={image} alt="" width="233px" height="319px" />
        <div style={{textAlign:"center"}}>
          <b><p style={{ fontSize: "26px" }}>{name}</p></b>
          <p style={{ fontSize: "20px", color: "gray" }}>{type}</p>
        </div>
      </div>
    </>
  )
}

export default doctors