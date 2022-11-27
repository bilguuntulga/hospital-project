import request from "../utils/request";

export const getGenderDonut = () =>
  request.get("/v1/api/customers/info/gender-donut");

export const list = () => request.get("/v1/api/customers");
export const get = (id) => request.get(`/v1/api/customers/${id}`);
export const remove = (id) => request.del(`/v1/api/customers/${id}`);
export const update = (data) =>
  request.put(`/v1/api/customers/${data.id}`, data);
export const create = (data) => request.post(`/v1/api/customers`, data);
export const search = (data) =>
  request.get("/v1/api/customers/info/search", data);
export const count = () => request.get("/v1/api/customers/info/count");
export const adviceCount = () =>
  request.get("/v1/api/customers/info/advice-count");
export const registeredCount = () =>
  request.get("/v1/api/customers/info/registered-count");
export const advice = () => request.get("/v1/api/customers/type/advice");
export const registered = () =>
  request.get("/v1/api/customers/type/registered");
export const weeklyGrowth = () =>
  request.get("/v1/api/customers/info/weekly-customer-growth");
export const monthlyGrowth = () =>
  request.get("/v1/api/customers/info/monthly-customer-growth");
export const yearGrowth = () =>
  request.get("/v1/api/customers/info/year-customer-growth");
