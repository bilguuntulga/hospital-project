import request from "../utils/request";

export const getGenderDonut = () =>
  request.get("/v1/api/customers/info/gender-donut");
