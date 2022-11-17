import React from 'react'
import { Image } from 'antd'

const Services = ({ images, name, price }) => {
    return (
        <div style={{ display: "grid", placeItems: "center" }}>
            <Image.PreviewGroup>
                {images?.map((e, i) => <Image src={e} style={{ display: i == 0 ? "block" : "none" }} alt="" width="100px" />)}
            </Image.PreviewGroup>
            <hr />
            <p>{name}</p>
            <hr />
            <p>{price}</p>
        </div>
    )
}

export default Services