import request from "../utils/request";

export const list = () => request.get("/v1/api/treatment-times/info/today-times")