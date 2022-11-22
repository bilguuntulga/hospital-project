import React from 'react'

const Service = ({ name, image, type, price }) => {
    return (
        <>
            <div className="service__card__wrapper">
                <img className="doctor_card_wrapper_image" src={image} alt={name} />
                <div className="doctor_card_wrapper_info_wrapper">
                    <div className="doctor_card_wrapper_info_wrapper_name">{name}</div>
                    <div className="doctor_card_wrapper_info_wrapper_role">{serviceTypeTranslater(type)}</div>
                </div>
            </div>
        </>
    )
}

export const serviceTypeTranslater = (type) => {
    switch (type) {
        case "PACKAGE":
            return "Багц"
        case "BASIC":
            return "Үндсэн";
        case "ADDITIONAL":
            return "Нэмэлт"
        default:
            return "TYPE_NOT_FOUND_404"
    }
}

export default Service