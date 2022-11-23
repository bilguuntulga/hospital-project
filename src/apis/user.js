import { date } from "yup/lib/locale";
import request from "../utils/request";
export const list = () => request.get("/v1/api/users")
export const get = (id) => request.get(`/v1/api/users/${id}`)
export const create = (data) => request.post(`/v1/api/users`, data)
export const update = (data) => request.put(`/v1/api/users/${data.id}`, data)
export const remove = (id) => request.del(`/v1/api/users/${id}`)