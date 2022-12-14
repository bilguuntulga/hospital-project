import qs from "qs";

const statusHandler = async (response) => {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }

  const error = new Error(response.statusText);
  error.status = response.status;
  error.response = response;

  throw error;
};

const errorHandler = async (error) => {
  if (error.response.status === 401 || error.response.status === 403) {
    window.location = "/login";
    return {
      type: "Error",
      payload: "Must enter as a user",
    };
  }

  try {
    const json = await error?.response?.json();

    return json?.error ? json?.error : json;
  } catch (error) {
    return error;
  }
};

const _request = async (url, data, options) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
    ...options,
  };

  let queryString = "";

  if (options.method === "GET" && data) {
    delete defaultOptions.body;

    queryString = `?${qs.stringify(data)}`;
  }

  const token = localStorage.getItem("token");

  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST + url}${queryString}`,
      defaultOptions
    );

    await statusHandler(res);

    const json = await res.json();

    return json;
  } catch (err) {
    throw await errorHandler(err);
  }
};

const httpMethod = (signal) => ({
  get: (url, data, options) => {
    if (signal) options.signal = signal;

    return _request(url, data, { ...options, method: "GET" });
  },
  post: (url, data, options) => {
    if (signal) options.signal = signal;

    return _request(url, data, { ...options, method: "POST" });
  },
  put: (url, data, options) => {
    if (signal) options.signal = signal;

    return _request(url, data, { ...options, method: "PUT" });
  },
  del: (url, data, options) => {
    if (signal) options.signal = signal;

    return _request(url, data, { ...options, method: "DELETE" });
  },
});
const request = {
  ...httpMethod(),
  signal: (signal) => httpMethod(signal),
}
export default request;
