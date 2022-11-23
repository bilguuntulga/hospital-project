import request from "../utils/request";
export const list = () => request.get("/v1/api/resources")
export const get = (id) => request.get(`/v1/api/resources/${id}`)
export const create = (data) => request.post(`/v1/api/resources`, data)
export const update = (data) => request.put(`/v1/api/resources/${data.id}`, data)
export const remove = (id) => request.del(`/v1/api/resources/${id}`)