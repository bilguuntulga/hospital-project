import request from "../utils/request";
export const list = (data) => request.get('/v1/api/customers/info/pagination', data)