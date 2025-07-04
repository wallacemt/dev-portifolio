import axios from "axios";
// import Cookies from "js-cookie";

export const API = axios.create({
  baseURL: process.env.API_URL,
});
export interface SimpleResponse {
  message: string;
}

// export const handleToken = (apiInstance: any) => {
//   const token = Cookies.get("jwtToken");
//   if (token) {
//     return (apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`);
//   }
//   return;
// };
