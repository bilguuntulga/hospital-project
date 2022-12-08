import request from "../utils/request";

export const create = (data) => request.post("/v1/api/questions", data);
export const list = () => request.get("/v1/api/questions");
export const get = (id) => request.get(`/v1/api/questions/${id}`);
export const update = (data) =>
  request.put(`/v1/api/questions/${data?.id}`, data);
export const remove = (id) => request.del(`/v1/api/questions/${id}`);
