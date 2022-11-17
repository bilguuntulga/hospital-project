import React from 'react'
import { Image } from 'antd'

const Services = ({ image, name, desc,price }) => {
    return (
        <div style={{ display: "grid", placeItems: "center" }}>
            <Image.PreviewGroup>
                <Image src={image} alt="" width="50px" />
                <Image style={{ display: "none" }} width="50px" src={image} alt="" />
                <Image style={{ display: "none" }} width="50px" src={image} alt="" />
            </Image.PreviewGroup>
            <hr />
            <p>{price}</p>
            <p>{name}</p>
            <hr />
            <p>{desc}</p>
        </div>
    )
}

export default Services