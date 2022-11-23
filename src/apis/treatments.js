import request from "../utils/request";

export const list = (id) => request.get(`/v1/api/treatments/customer/${id}`)
export const get = (id) => request.get(`/v1/api/treatments/${id}`)
export const create = (data) => request.post("/v1/api/treatments", data)
export const update = (data) => request.post(`/v1/api/treatments/${data.id}`, data)
export const remove = (id) => request.del(`/v1/api/treatments/${id}`)