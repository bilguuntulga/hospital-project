import request from "../utils/request";

export const list = () => request.get("/v1/api/bonus");
export const get = (id) => request.get(`/v1/api/bonus/${id}`);
export const create = (data) => request.post("/v1/api/bonus", data);
export const update = (data) => request.put(`/v1/api/bonus/${data.id}`, data);
export const remove = (id) => request.del(`/v1/api/bonus/${id}`);
export const findCustomers = (id) =>
  request.get(`/v1/api/bonus/${id}/customers`);
