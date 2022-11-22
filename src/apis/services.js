import request from "../utils/request"
export const list = () => request.get("/v1/api/services")
export const oneGet = (id) => request.get(`/v1/api/services/${id}`)
export const create = (data) => request.post(`/v1/api/services`, data)
export const update = (data) => request.put(`/v1/api/services/${data.id}`, data);
export const remove = (id) => request.del(`/v1/api/services/${id}`);