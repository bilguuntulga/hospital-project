import request from "../utils/request";

export const todayTimesCount = () =>
  request.get("/v1/api/treatment-times/info/today-count");
export const create = (data) => request.post("/v1/api/treatment-times", data);
export const list = () => request.get("/v1/api/treatment-times");
export const get = (id) => request.get(`/v1/api/treatment-times/${id}`);
export const future = () => request.get("/v1/api/treatment-times/type/future");
export const remove = (id) => request.del(`/v1/api/treatment-times/${id}`);
export const update = (data) =>
  request.put(`/v1/api/treatment-times/${data.id}`, data);
export const search = (data) =>
  request.post("/v1/api/treatment-times/search/all", data);
export const notifications = () =>
  request.get("/v1/api/treatment-times/type/notifications");
export const getNotification = (id) =>
  request.get("/v1/api/treatment-times/type/notifications/" + id);
export const weeklyTimes = () =>
  request.get("/v1/api/treatment-times/info/weekly-times");

export const TreatmentTimesErrorConverter = (message) => {
  switch (message) {
    case "DOCTOR_IS_RESTING":
      return "Эмч амарж байна";
    case "PAST_TENSE":
      return "Өнгөрсөн цаг байна";
    default:
      return "Амжилтгүй";
  }
};
