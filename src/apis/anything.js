import request from "../utils/request";

export const create = (data) => request.post("/v1/api/anything", data);
export const update = (data) =>
  request.put(`/v1/api/anything/${data?.id}`, data);
export const getQ1 = (id) => request.get(`/v1/api/anything/customers/${id}/q1`);
export const getQ2 = (id) => request.get(`/v1/api/anything/customers/${id}/q2`);
export const findCustomerQuestions = (question_id, customer_id) =>
  request.get(
    `/v1/api/anything/questions/${question_id}/customer/${customer_id}`
  );
