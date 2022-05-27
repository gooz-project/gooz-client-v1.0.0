import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create();

api.interceptors.response.use(
  (response) => response,
  (err) => {
    toast.error(err.message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      draggable: false,
      pauseOnHover: true,
      closeOnClick: false,
    });
    return Promise.reject(err);
  }
);
