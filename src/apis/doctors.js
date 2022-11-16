import request from "../utils/request";

export const get = () => request.get("/v1/api/doctors")
export const detail = (id) => request.get(`/v1/api/doctors/${id}`)
export const update = (data) => request.put(`/v1/api/doctors/${data.id}`, data);