import React from 'react'

const Service = ({ name, image, type, price }) => {
    return (
        <>
            <div className="service__card__wrapper">
                <img className="doctor_card_wrapper_image" src={image} alt={name} />
                <div className="doctor_card_wrapper_info_wrapper">
                    <div className="doctor_card_wrapper_info_wrapper_name">{price}</div>
                    <div className="doctor_card_wrapper_info_wrapper_role">{type}</div>
                </div>
            </div>
        </>
    )
}

export default Service