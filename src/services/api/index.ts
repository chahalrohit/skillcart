import axios from "axios";

const api = axios.create({
  baseURL: "https://mocki.io/v1/",
});

api.interceptors.request.use(
  (config) => {
    // Example: For demo, add headers or log, if needed
    // config.headers['Authorization'] = 'Bearer token';
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // You can manipulate the response here if needed before returning
    return response;
  },
  (error) => {
    // Handle errors globally here, like logging or transforming error messages
    return Promise.reject(error);
  }
);

export default api;
