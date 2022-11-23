import request from "../utils/request";

export const todayTimesCount = () =>
  request.get("/v1/api/treatment-times/info/today-count");
export const create = (data) => request.post("/v1/api/treatment-times", data);
export const future = () => request.get("/v1/api/treatment-times/type/future");
