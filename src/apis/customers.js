import request from "../utils/request";

export const getGenderDonut = () =>
  request.get("/v1/api/customers/info/gender-donut");

export const list = () => request.get("/v1/api/customers");
export const get = (id) => request.get(`/v1/api/customers/${id}`);
export const update = (data) => request.put(`/v1/api/customers/${data.id}`, data);
export const search = (data) => request.get("/v1/api/customers/info/search", data);
export const count = () => request.get("/v1/api/customers/info/count");
export const adviceCount = () =>
  request.get("/v1/api/customers/info/advice-count");
export const registeredCount = () =>
  request.get("/v1/api/customers/info/registered-count");
