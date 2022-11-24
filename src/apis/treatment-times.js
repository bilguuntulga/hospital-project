import request from "../utils/request";

export const todayTimesCount = () =>
  request.get("/v1/api/treatment-times/info/today-count");
export const create = (data) => request.post("/v1/api/treatment-times", data);
export const get = (id) => request.get(`/v1/api/treatment-times/${id}`);
export const future = () => request.get("/v1/api/treatment-times/type/future");
export const remove = (id) => request.del(`/v1/api/treatment-times/${id}`);
export const update = (data) =>
  request.put(`/v1/api/treatment-times/${data.id}`, data);
export const search = (data) =>
  request.get("/v1/api/treatment-times/search/all", data);
