import request from "../utils/request";

export const login = (data) => request.post("/v1/api/auth/login", data);
export const profile = () => request.get("/v1/api/auth/profile");
export const update = (data) => request.put("/v1/api/auth/profile", data);
export const resetPassword = (data) =>
  request.post("/v1/api/auth/reset-password", data);
