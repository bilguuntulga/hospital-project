import React from 'react'

const doctors = ({ image, name, type }) => {
  return (
    <>
      <div style={{ width: "300px", height: "479px", backgroundColor: "white", display: "grid", placeItems: "center" ,paddingTop:"20px"}}>
        <img src={image} alt="" width="250px" height="250px" />
        <div style={{textAlign:"center"}}>
          <b><p style={{ fontSize: "26px" }}>{name}</p></b>
          <p style={{ fontSize: "20px", color: "gray" }}>{type}</p>
        </div>
      </div>
    </>
  )
}

export default doctors