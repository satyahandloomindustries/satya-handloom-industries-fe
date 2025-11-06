import axios from "axios";

class ApiService {
  static client = axios.create({
    baseURL: "/",
    headers: { "Content-Type": "application/json" },
    timeout: 10000,
    withCredentials: true
  });

  static setAuthToken(token) {
    ApiService.client.defaults.headers.Authorization = `Bearer ${token}`;
  }

  static async get(url, params = {}) {
    return ApiService.client.get(url, { params }).then(res => res.data);
  }

  static async post(url, data = {}) {
    return ApiService.client.post(url, data).then(res => res.data);
  }

  static async put(url, data = {}) {
    return ApiService.client.put(url, data).then(res => res.data);
  }

  static async delete(url) {
    return ApiService.client.delete(url).then(res => res.data);
  }
}

export default ApiService;
