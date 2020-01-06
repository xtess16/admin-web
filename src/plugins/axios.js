import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export function getJWTBodyData(data) {
  return `email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`;
}

export default axios;
