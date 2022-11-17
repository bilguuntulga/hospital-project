import request from "../utils/request";

export const getGenderDonut = () =>
  request.get("/v1/api/customers/info/gender-donut");

export const count = () => request.get("/v1/api/customers/info/count");
export const adviceCount = () =>
  request.get("/v1/api/customers/info/advice-count");
export const registeredCount = () =>
  request.get("/v1/api/customers/info/registered-count");
