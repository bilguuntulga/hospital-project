import request from "../utils/request";

export const todayTimesCount = () =>
  request.get("/v1/api/treatment-times/info/today-count");
