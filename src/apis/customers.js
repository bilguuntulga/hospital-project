import request from "../utils/request";

export const getGenderDonut = () =>
  request.get("/v1/api/customers/info/gender-donut");

export const list = () => request.get("/v1/api/customers");
export const get = (id) => request.get(`/v1/api/customers/${id}`);
export const search = (data) => request.get("/v1/api/customers/info/search", data);
export const count = () => request.get("/v1/api/customers/info/count");