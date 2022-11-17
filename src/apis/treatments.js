import request from "../utils/request";

export const list = (id) => request.get(`/v1/api/treatments/customer/${id}`)