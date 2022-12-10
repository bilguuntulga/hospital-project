import request from "../utils/request";

export const get = (id) => request.get(`/v1/api/planned-treatments/${id}`);
export const list = (id) =>
  request.get(`/v1/api/planned-treatments/customer/${id}`);
export const create = (data) =>
  request.post(`/v1/api/planned-treatments`, data);
export const update = (data) =>
  request.put(`/v1/api/planned-treatments/${data.id}`, data);
export const remove = (id) => request.del(`/v1/api/planned-treatments/${id}`);
